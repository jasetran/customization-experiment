<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { RealtimeItem } from "../types.js";
    import { userState } from "../state.svelte.js";
    import avatarComponents from "./avatarComponents.ts";
    import {
        setEmotion,
        analyzeEmotion,
        cleanText,
    } from "../helperFunctions.js";

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
    let isAssistantSpeaking = $state(false);
    let endTriggerFound = $state(false);
    let loadingVideo = $state(false);
    let currentEmotion = $state("neutral");
    let processedEmotions = new Set<string>(); // track which items have already had their emotions processed
    let peerConnection: RTCPeerConnection | null = null;
    let dataChannel: RTCDataChannel | null = null;
    let audioElement: HTMLAudioElement | null = null;
    let microphoneTrack: MediaStreamTrack | null = null;
    let audioSender: RTCRtpSender | null = null;

    // recording related variables
    let mediaRecorder: MediaRecorder | null = null;
    let recordedChunks: Blob[] = [];
    let videoStream: MediaStream | null = null;
    let combinedStream: MediaStream | null = null;
    let isRecording = $state(false);
    let recordingCount = 0;

    // Exposed methods for parent components
    export function endConversation() {
        // end the conversation
        if (!conversationEnded) {
            conversationEnded = true;
            loadingVideo = true;

            // stop any ongoing recording
            if (isRecording) {
                stopRecording();
                downloadRecording();
            }

            onConversationEnd(conversationEnded);
            stopSession();
        }
    }

    // functions for recording video and audio

    async function setupRecording() {
        try {
            // Get video stream from camera
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 360 },
                audio: false, // We'll use the existing microphone track
            });

            // Create combined stream with video and audio
            combinedStream = new MediaStream();

            // add video track
            videoStream.getVideoTracks().forEach((track) => {
                combinedStream!.addTrack(track);
            });

            // add audio track (the same one used for WebRTC)
            if (microphoneTrack) {
                combinedStream.addTrack(microphoneTrack);
            }

            console.log("Recording setup complete");
        } catch (error) {
            console.error("Failed to setup recording:", error);
            onError("Failed to setup video recording");
        }
    }

    function startRecording() {
        if (!combinedStream || isRecording) return;

        try {
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: "video/mp4;codecs=vp9,opus",
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                if (recordedChunks.length > 0) {
                    downloadRecording();
                }
            };

            mediaRecorder.start();
            isRecording = true;
            console.log("Recording started");
        } catch (error) {
            console.error("Failed to start recording:", error);
            onError("Failed to start recording");
        }
    }

    function stopRecording() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
            console.log("Recording stopped");
        }
    }

    function downloadRecording() {
        if (recordedChunks.length === 0) return;

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        recordingCount++;
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        a.href = url;
        a.download = `${userState.pid}-${interactionPhase}-${timestamp}.webm`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        recordedChunks = [];
    }

    // setting up the OpenAI conversational session

    async function startRealtimeSession() {
        try {
            // Get a session token for OpenAI Realtime API
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

            // Set up to play remote audio from the model
            audioElement = document.createElement("audio");
            audioElement.autoplay = true;
            pc.ontrack = (e) => {
                if (audioElement) {
                    audioElement.srcObject = e.streams[0];
                }
            };

            const ms = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            microphoneTrack = ms.getTracks()[0];

            // setup recording after we have the microphone track
            await setupRecording();

            // adding microphone to peer connection
            audioSender = pc.addTrack(microphoneTrack);

            // initially disable the microphone track
            microphoneTrack.enabled = false;

            // set up data channel for sending and receiving events
            const dc = pc.createDataChannel("oai-events");
            dataChannel = dc;

            // start the session using the Session Description Protocol (SDP)
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const baseUrl = "https://api.openai.com/v1/realtime";
            const model = "gpt-4o-mini-realtime-preview-2024-12-17";
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
                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        const part = item.content[event.content_index];
                        const newTranscript =
                            (part.transcript ?? "") + event.delta;
                        part.transcript = newTranscript;

                        // If this is an assistant response, check for emotion immediately
                        if (
                            item.role === "assistant" &&
                            !processedEmotions.has(item.id)
                        ) {
                            const detectedEmotion =
                                analyzeEmotion(newTranscript);
                            // Only trigger if we found an explicit emotion tag or have enough content
                            const hasEmotionTag =
                                /\[(neutral|unsure|thoughtful|happy|greeting|surprised|excited)\]/i.test(
                                    newTranscript,
                                );

                            if (hasEmotionTag || newTranscript.length > 50) {
                                if (detectedEmotion !== currentEmotion) {
                                    currentEmotion = detectedEmotion;
                                    setEmotion(
                                        detectedEmotion,
                                        userState,
                                        avatarComponents,
                                    );
                                }
                                // mark this item as processed to avoid repeated calls
                                if (hasEmotionTag) {
                                    processedEmotions.add(item.id);
                                }
                            }
                        }

                        // clean the transcript for display (remove emotion tags)
                        part.transcript = cleanText(newTranscript);

                        // check for completion trigger in mode
                        // prettier-ignore
                        if (newTranscript.toLowerCase().includes(endTrigger)) {
                            console.log("End trigger found:", endTrigger);
                            endTriggerFound = true;
                        }
                        break;
                    }
                    case "response.content_part.added": {
                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        item.content[event.content_index] = event.part;
                    }
                    case "conversation.item.created": {
                        console.log("TEXT:", event.item.content.text);
                        console.log("event:", event);
                        const item = {
                            id: event.item.id,
                            content: event.item.content,
                            role: event.item.role,
                        };
                        items.push(item);
                        // this prevents the user from cutting off the agent
                        if (item.role === "assistant") {
                            isAssistantSpeaking = true;
                            disableMicrophone();
                        }
                        break;
                    }
                    case "output_audio_buffer.stopped": {
                        if (endTriggerFound) {
                            // waiting for the audio buffer before ending conversation
                            disableMicrophone();
                            endConversation();
                        }

                        isAssistantSpeaking = false;
                        enableMicrophone(); // re-enable the microphone once agent is done talking
                        break;
                    }
                    case "error":
                        onError(event.error?.message || "Unknown error");
                        isAssistantSpeaking = false;
                        enableMicrophone();
                        if (isRecording) {
                            stopRecording();
                        }
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
            });

            dc.addEventListener("close", () => {
                isConnected = false;
                console.log("Disconnected from OpenAI Realtime API");
            });
        } catch (error) {
            console.error("Failed to start realtime session:", error);
            onError("Failed to start conversation");
        }
    }

    // enabling the microphone input
    function enableMicrophone() {
        if (microphoneTrack) {
            microphoneTrack.enabled = true;
            console.log("Microphone enabled");
        }
    }

    // disabling the microphone input
    function disableMicrophone() {
        if (microphoneTrack) {
            microphoneTrack.enabled = false;
            console.log("Microphone disabled");
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
    function stopSession() {
        if (microphoneTrack) {
            microphoneTrack.stop();
            microphoneTrack = null;
        }
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

        if (isRecording) {
            stopRecording();
        }

        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            videoStream = null;
        }

        isRecording = false;
        isConnected = false;
        isAssistantSpeaking = false;
        dataChannel = null;
        peerConnection = null;
        audioSender = null;

        if (audioElement) {
            audioElement.srcObject = null;
        }
    }

    onMount(async () => {
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
        margin-top: 1rem;
        margin-left: 4rem;
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
