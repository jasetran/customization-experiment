<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { RealtimeItem } from "../types.js";
    import { userState } from "../state.svelte.js";
    import avatarComponents from "./avatarComponents.js";
    import { setEmotion, analyzeEmotion } from "../helperFunctions.js";

    const {
        onError = () => {},
        onConversationEnd = () => {}, // new callback for when conversation ends
        endTrigger = "",
        systemPrompt = "",
        items = $bindable<RealtimeItem[]>([]),
        children,
    } = $props();

    const interactionPhase = $derived(
        endTrigger == "watch a fun video about water and ice"
            ? "practice"
            : "discussion",
    );

    // conversational agent related variables
    let conversationEnded = $state(false);
    let isConnected = $state(false);
    let isAssistantSpeaking = $state(false); // variables related to the conversational flow
    let endTriggerFound = $state(false);
    let loadingVideo = $state(false);
    let currentEmotion = $state("neutral"); // log what current emotion is
    let processedEmotions = new Set(); // track which items have already had their emotions processed
    let peerConnection: RTCPeerConnection | null = null;
    let dataChannel: RTCDataChannel | null = null;
    let audioElement: HTMLAudioElement | null = null;
    let microphoneTrack: MediaStreamTrack | null = null;
    let audioSender: RTCRtpSender | null = null;

    // Audio context and gain node for controlling audio to OpenAI
    let audioContext: AudioContext | null = null;
    let gainNode: GainNode | null = null;
    let microphoneSource: MediaStreamAudioSourceNode | null = null;
    let processedAudioStream: MediaStream | null = null;

    // Audio mixing for recording both user and assistant
    let assistantAudioSource: MediaStreamAudioSourceNode | null = null;
    let mixerDestination: MediaStreamDestination | null = null;
    let mixedAudioStream: MediaStream | null = null;

    // recording related variables
    let mediaRecorder: MediaRecorder | null = null;
    let recordedChunks: Blob[] = [];
    let videoStream: MediaStream | null = null;
    let combinedStream: MediaStream | null = null;

    // Exposed methods for parent components
    export async function endConversation() {
        if (!conversationEnded) {
            conversationEnded = true;
            loadingVideo = true;

            stopRecording();
            await new Promise((resolve) => (mediaRecorder.onstop = resolve));

            console.log("endConversation", recordedChunks);
            onConversationEnd(conversationEnded, [...recordedChunks]);
            stopSession();
        }
    }

    // Helper function to check if getUserMedia is available
    function checkMediaDevicesSupport() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            // Fallback for older browsers or restricted environments
            if (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia
            ) {
                console.warn("Using legacy getUserMedia API");
                return true;
            }
            return false;
        }
        return true;
    }

    // Enhanced getUserMedia with fallbacks
    async function getMediaStream(
        constraints: MediaStreamConstraints,
    ): Promise<MediaStream> {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return await navigator.mediaDevices.getUserMedia(constraints);
        }

        // Fallback for older browsers
        const legacyGetUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (legacyGetUserMedia) {
            return new Promise((resolve, reject) => {
                legacyGetUserMedia.call(
                    navigator,
                    constraints,
                    resolve,
                    reject,
                );
            });
        }

        throw new Error("getUserMedia is not supported on this device");
    }

    // functions for recording video and audio

    async function setupRecording() {
        try {
            if (!checkMediaDevicesSupport()) {
                throw new Error("Media devices not supported on this device");
            }

            // Get video stream (reuse if available)
            if (!videoStream) {
                const videoConstraints = {
                    video: {
                        width: { ideal: 320, max: 640 },
                        height: { ideal: 180, max: 480 },
                        facingMode: "user",
                    },
                    audio: false,
                };
                videoStream = await getMediaStream(videoConstraints);
            }

            // ALWAYS create a new combined stream for each recording session
            combinedStream = new MediaStream();

            // Add video track
            videoStream.getVideoTracks().forEach((track) => {
                combinedStream.addTrack(track);
            });

            // Add mixed audio track (this gets recreated in setupAudioProcessing)
            if (mixedAudioStream) {
                const mixedAudioTrack = mixedAudioStream.getAudioTracks()[0];
                combinedStream.addTrack(mixedAudioTrack);
            }

            console.log("Recording setup complete");
        } catch (error) {
            console.error("Failed to setup recording:", error);
            onError(`Failed to setup video recording: ${error.message}`);
        }
    }

    async function setupAudioProcessing() {
        try {
            if (!checkMediaDevicesSupport()) {
                throw new Error("Media devices not supported on this device");
            }

            // Create or reuse audio context
            if (!audioContext) {
                const AudioContextClass =
                    window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) {
                    throw new Error("Web Audio API not supported");
                }
                audioContext = new AudioContextClass();
            }

            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }

            // Get microphone stream (reuse if available)
            if (!microphoneTrack) {
                const audioConstraints = {
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                        sampleRate: 44100,
                    },
                };
                const micStream = await getMediaStream(audioConstraints);
                microphoneTrack = micStream.getTracks()[0];
            }

            // ALWAYS recreate audio nodes for each session
            const micStream = new MediaStream([microphoneTrack]);
            microphoneSource = audioContext.createMediaStreamSource(micStream);

            // Create gain node to control volume to OpenAI
            gainNode = audioContext.createGain();
            gainNode.gain.value = 1;

            // Connect microphone to gain node
            microphoneSource.connect(gainNode);

            // Create destination for processed audio (to OpenAI)
            const openAIDestination =
                audioContext.createMediaStreamDestination();
            gainNode.connect(openAIDestination);
            processedAudioStream = openAIDestination.stream;

            // ALWAYS create new mixer destination for recording
            mixerDestination = audioContext.createMediaStreamDestination();

            // Connect microphone directly to mixer
            microphoneSource.connect(mixerDestination);

            // Get the mixed audio stream for recording
            mixedAudioStream = mixerDestination.stream;

            console.log("Audio processing setup complete");
        } catch (error) {
            console.error("Failed to setup audio processing:", error);
            onError(`Failed to setup audio processing: ${error.message}`);
        }
    }

    function startRecording() {
        if (!combinedStream) {
            console.error("No combined stream available for recording");
            return;
        }

        // Make sure we have a clean MediaRecorder
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }

        // Reset recorded chunks for new session
        recordedChunks = [];

        try {
            // Use iPad-compatible MIME types
            let mimeType = "video/mp4;codecs=vp9,opus";

            if (!MediaRecorder.isTypeSupported(mimeType)) {
                const fallbackTypes = [
                    "video/mp4;codecs=h264,aac",
                    "video/mp4;codecs=avc1,mp4a",
                    "video/mp4",
                    "video/webm;codecs=vp8,opus",
                    "video/webm",
                ];

                mimeType =
                    fallbackTypes.find((type) =>
                        MediaRecorder.isTypeSupported(type),
                    ) || "";
            }

            const options = mimeType ? { mimeType } : {};
            mediaRecorder = new MediaRecorder(combinedStream, options);

            mediaRecorder.ondataavailable = (event) => {
                console.log("ondataavailable");
                if (event.data.size > 0) {
                    console.log("push");
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.start();
            console.log(
                "Recording started with MIME type:",
                mimeType || "default",
            );
        } catch (error) {
            console.error("Failed to start recording:", error);
            onError(`Failed to start recording: ${error.message}`);
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            console.log("Recording stopped");
        }
    }
    // setting up the OpenAI conversational session

    async function startRealtimeSession() {
        // timeout variables
        let responseTimeoutId = null;
        const RESPONSE_TIMEOUT_MS = 20000; // 20 seconds for child to respond

        // Function to reset the timeout
        function resetResponseTimeout() {
            if (responseTimeoutId) {
                clearTimeout(responseTimeoutId);
            }
            responseTimeoutId = setTimeout(() => {
                console.log("No user response detected after 20 seconds");
                sendTextMessage("..."); // send blank message to prompt assistant if they don't respond
            }, RESPONSE_TIMEOUT_MS);
        }

        // Function to clear the timeout (when assistant responds)
        function clearResponseTimeout() {
            if (responseTimeoutId) {
                clearTimeout(responseTimeoutId);
                responseTimeoutId = null;
            }
        }

        try {
            // setup audio processing first
            await setupAudioProcessing();

            // setup recording after we have the microphone track
            await setupRecording();

            // get a session token for OpenAI Realtime API
            const tokenResponse = await fetch("/api/realtime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemPrompt,
                }),
            });

            if (!tokenResponse.ok) {
                throw new Error(`HTTP error! status: ${tokenResponse.status}`);
            }

            const data = await tokenResponse.json();
            const EPHEMERAL_KEY = data.client_secret;

            // Create a peer connection
            const pc = new RTCPeerConnection();

            // Set up to play remote audio from the model AND capture it for recording
            audioElement = document.createElement("audio");
            audioElement.autoplay = true;
            pc.ontrack = (e) => {
                if (audioElement) {
                    audioElement.srcObject = e.streams[0];

                    // Also capture the assistant's audio for recording
                    if (audioContext && mixerDestination) {
                        assistantAudioSource =
                            audioContext.createMediaStreamSource(e.streams[0]);
                        assistantAudioSource.connect(mixerDestination);
                        console.log("Assistant audio connected to mixer");
                    }
                }
            };

            // Add the PROCESSED audio stream to peer connection (not the original)
            if (processedAudioStream) {
                const processedTrack = processedAudioStream.getAudioTracks()[0];
                audioSender = pc.addTrack(processedTrack);
            }

            // initially mute the processed audio going to OpenAI
            muteMicrophoneToOpenAI();

            // set up data channel for sending and receiving events
            const dc = pc.createDataChannel("oai-events");
            dataChannel = dc;

            // start the session using the Session Description Protocol (SDP)
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const baseUrl = "https://api.openai.com/v1/realtime";
            const model = "gpt-4o-realtime-preview-2025-06-03";
            const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
                method: "POST",
                body: offer.sdp,
                headers: {
                    Authorization: `Bearer ${EPHEMERAL_KEY}`,
                    "Content-Type": "application/sdp",
                },
            });

            if (!sdpResponse.ok) {
                throw new Error(`SDP request failed: ${sdpResponse.status}`);
            }

            const answer = {
                type: "answer" as RTCSdpType,
                sdp: await sdpResponse.text(),
            };
            await pc.setRemoteDescription(answer);

            peerConnection = pc;

            // Append new server events to the list
            dc.addEventListener("message", (e) => {
                const event = JSON.parse(e.data);
                if (!event.timestamp) {
                    event.timestamp = new Date().toLocaleTimeString();
                }

                // handle different conversation event types
                switch (event.type) {
                    case "conversation.item.input_audio_transcription.delta":
                    case "response.audio_transcript.delta": {
                        // clear timeout when we receive assistant response
                        clearResponseTimeout();

                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        const part = item.content[event.content_index];
                        const newTranscript =
                            (part.transcript ?? "") + event.delta;
                        part.transcript = newTranscript;

                        // check for emotion immediately from assistant response
                        // prettier-ignore
                        if (item.role === "assistant" && !processedEmotions.has(item.id)) {
                        const detectedEmotion = analyzeEmotion(newTranscript);
                         // only trigger when have enough content
                         if (newTranscript.length > 20) {
                            if (detectedEmotion !== currentEmotion) {
                                currentEmotion = detectedEmotion;
                                setEmotion(detectedEmotion, userState, avatarComponents);
                                processedEmotions.add(item.id); // mark this item as having been evaluated
                            }
                        }
                        
                    }

                        // check for completion trigger in transcript
                        // prettier-ignore
                        if (newTranscript.toLowerCase().includes(endTrigger)) {
                        console.log("End trigger found:", endTrigger);
                        muteMicrophoneToOpenAI();
                        endTriggerFound = true;
                    }
                        break;
                    }
                    case "response.content_part.added": {
                        // clear timeout when we receive assistant response
                        clearResponseTimeout();

                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        item.content[event.content_index] = event.part;
                        break;
                    }
                    case "conversation.item.created": {
                        const item = {
                            id: event.item.id,
                            content: event.item.content,
                            role: event.item.role,
                        };
                        items.push(item);
                        // this prevents the user from cutting off the agent
                        if (item.role === "assistant") {
                            isAssistantSpeaking = true;
                            muteMicrophoneToOpenAI();
                            // clear timeout when assistant starts speaking
                            clearResponseTimeout();
                        } else if (item.role === "user") {
                            // clear timeout when user responds
                            clearResponseTimeout();
                        }
                        break;
                    }
                    case "output_audio_buffer.stopped": {
                        if (endTriggerFound) {
                            // waiting for the audio buffer before ending conversation
                            muteMicrophoneToOpenAI();
                            endConversation();
                            return; // Don't start timeout if conversation is ending
                        }

                        isAssistantSpeaking = false;
                        unmuteMicrophoneToOpenAI(); // re-enable the microphone once agent is done talking

                        // Start timeout when assistant finishes speaking - wait for user response
                        resetResponseTimeout();
                        break;
                    }
                    case "error":
                        onError(event.error?.message || "Unknown error");
                        isAssistantSpeaking = false;
                        unmuteMicrophoneToOpenAI();
                        // Clear timeout on error
                        clearResponseTimeout();
                        break;
                }
            });

            // set session active when the data channel is opened
            dc.addEventListener("open", () => {
                isConnected = true;
                console.log("Connected to OpenAI Realtime API via WebRTC");

                // automatically send a starting message to start the conversation
                // will change depending on the conversation sequence
                if (interactionPhase == "practice") {
                    sendTextMessage("Hello.");
                } else {
                    sendTextMessage("The video is done.");
                }

                // Start the initial timeout after sending the first message
                resetResponseTimeout();
            });

            dc.addEventListener("close", () => {
                isConnected = false;
                console.log("Disconnected from OpenAI Realtime API");
                // Clear timeout when connection closes
                clearResponseTimeout();
            });
        } catch (error) {
            console.error("Failed to start realtime session:", error);
            onError(`Failed to start conversation: ${error.message}`);
            // Clear timeout on error
            clearResponseTimeout();
        }
    }

    // enabling the microphone input to OpenAI (using gain node)
    function unmuteMicrophoneToOpenAI() {
        if (gainNode && audioContext) {
            gainNode.gain.setValueAtTime(1, audioContext.currentTime);
            console.log("Microphone unmuted to OpenAI");
        }
    }

    // disabling the microphone input to OpenAI (using gain node)
    function muteMicrophoneToOpenAI() {
        if (gainNode && audioContext) {
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            console.log("Microphone muted to OpenAI");
        }
    }

    // send a client event to the OpenAI model
    function sendClientEvent(message: any) {
        if (dataChannel && dataChannel.readyState === "open") {
            message.event_id = message.event_id || crypto.randomUUID();
            console.debug(message);
            dataChannel.send(JSON.stringify(message));
        } else {
            console.error(
                "Failed to send message - no data channel available",
                message,
            );
        }
    }

    // send a the text message to the model
    function sendTextMessage(message: string) {
        const event = {
            type: "conversation.item.create",
            item: {
                type: "message",
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: message,
                    },
                ],
            },
        };

        sendClientEvent(event);
        sendClientEvent({ type: "response.create" });
    }

    // stop the current session, clean up peer connection and data channel
    function stopSession(preserveBaseStreams = false) {
        // Always stop recording-specific streams
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }

        // Always clean up combined stream for recording
        if (combinedStream) {
            combinedStream.getTracks().forEach((track) => track.stop());
            combinedStream = null;
        }

        // Always clean up processed audio stream (gets recreated anyway)
        if (processedAudioStream) {
            processedAudioStream.getTracks().forEach((track) => track.stop());
            processedAudioStream = null;
        }

        // Always clean up mixed audio stream (gets recreated anyway)
        if (mixedAudioStream) {
            mixedAudioStream.getTracks().forEach((track) => track.stop());
            mixedAudioStream = null;
        }

        // Only preserve the BASE microphone and video tracks
        if (microphoneTrack && !preserveBaseStreams) {
            microphoneTrack.stop();
            microphoneTrack = null;
        }

        if (videoStream && !preserveBaseStreams) {
            videoStream.getTracks().forEach((track) => track.stop());
            videoStream = null;
        }

        // Audio context can be preserved
        if (
            audioContext &&
            audioContext.state !== "closed" &&
            !preserveBaseStreams
        ) {
            audioContext.close();
            audioContext = null;
        }

        // Clean up WebRTC connections
        if (dataChannel) {
            dataChannel.close();
        }

        if (peerConnection) {
            peerConnection.getSenders().forEach((sender) => {
                if (sender.track) {
                    sender.track.stop();
                }
            });
            peerConnection.close();
        }

        // Reset variables
        isConnected = false;
        isAssistantSpeaking = false;
        dataChannel = null;
        peerConnection = null;
        audioSender = null;
        mediaRecorder = null;
        recordedChunks = []; // Reset for new recording

        // Only reset audio nodes if not preserving
        if (!preserveBaseStreams) {
            gainNode = null;
            microphoneSource = null;
            assistantAudioSource = null;
            mixerDestination = null;
        }

        if (audioElement) {
            audioElement.srcObject = null;
        }
    }

    onMount(async () => {
        // await a bit longer after the video
        if (interactionPhase == "discussion") {
            console.log("interaction phase is discussion");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        await startRealtimeSession();
        startRecording();
    });

    onDestroy(() => {
        stopSession();
    });
</script>

{#if children}
    {@render children({ isConnected, items })}
    <div
        class="assistant-status"
        class:checking={!isConnected && !loadingVideo}
        class:loading={loadingVideo}
        class:speaking={isAssistantSpeaking && !loadingVideo && isConnected}
        class:listening={!isAssistantSpeaking && isConnected && !loadingVideo}
    >
        {#if !isConnected && !loadingVideo}
            <span> 🎤 📷 Checking microphone & camera </span>
        {:else if isAssistantSpeaking}
            <span class="pulse"> 🗣️ Speaking... </span>
        {:else if loadingVideo}
            <span class="pulse"> 🎥 Loading video </span>
        {:else}
            <span class="pulse"> 👂 Listening... </span>
        {/if}
    </div>
{/if}

<style>
    .assistant-status {
        display: block;
        margin-top: 4rem;
        margin-left: 6rem;
        max-width: 30rem;
        text-align: center;
        font-size: 2rem;
        color: white;
        padding: 0.8rem 6rem;
        border-radius: 2rem;
        transition: background 0.3s ease;
    }

    .assistant-status.checking {
        background: linear-gradient(135deg, #ffad2a 0%, #ddc000 100%);
        padding: 1.2rem 6rem;
        font-size: 1.6rem;
        margin-left: 3rem;
    }

    .assistant-status.speaking {
        background: linear-gradient(135deg, #ff0015 0%, #d07a00 100%);
        padding: 0.8rem 3rem;
        margin-left: 6rem;
    }

    .assistant-status.listening {
        background: linear-gradient(135deg, #006f64 0%, #00cf94 100%);
        padding: 0.8rem 3rem;
        margin-left: 6rem;
    }

    .assistant-status.loading {
        background: linear-gradient(135deg, #1530ff 0%, #489aff 100%);
        padding: 0.8rem 3rem;
        margin-left: 6rem;
    }

    .pulse {
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
