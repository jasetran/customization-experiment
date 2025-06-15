<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { RealtimeItem } from "../types.js";

    const {
        onError = () => {},
        systemPrompt = "You are a friendly conversational agent designed to chat with children. Keep responses appropriate, educational, and engaging. Be patient and encouraging.",
        items = $bindable<RealtimeItem[]>([]),
    } = $props();

    let isConnected = $state(false);
    let peerConnection: RTCPeerConnection | null = null;
    let dataChannel: RTCDataChannel | null = null;
    let audioElement: HTMLAudioElement | null = null;

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

            // Add local audio track for microphone input in the browser
            const ms = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            pc.addTrack(ms.getTracks()[0]);

            // Set up data channel for sending and receiving events
            const dc = pc.createDataChannel("oai-events");
            dataChannel = dc;

            // Start the session using the Session Description Protocol (SDP)
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const baseUrl = "https://api.openai.com/v1/realtime";
            const model = "gpt-4o-realtime-preview-2024-12-17";
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

                console.log(event);

                // Handle different event types
                switch (event.type) {
                    case "conversation.item.input_audio_transcription.delta":
                    case "response.audio_transcript.delta": {
                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        const part = item.content[event.content_index];
                        part.transcript = (part.transcript ?? "") + event.delta;
                        break;
                    }
                    case "response.content_part.added": {
                        const item = items.find((item) => item.id === event.item_id)!; // prettier-ignore
                        item.content[event.content_index] = event.part;
                    }
                    case "conversation.item.created": {
                        const item = {
                            id: event.item.id,
                            content: event.item.content,
                            role: event.item.role,
                        };
                        items.push(item);

                        if (item.role === "user") {
                        }
                    }
                    case "error":
                        onError(event.error?.message || "Unknown error");
                        break;
                }
            });

            // Set session active when the data channel is opened
            dc.addEventListener("open", () => {
                isConnected = true;
                console.log("Connected to OpenAI Realtime API via WebRTC");

                // Automatically send "Hello" message to start the conversation
                setTimeout(() => {
                    sendTextMessage("Hello");
                }, 500);
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

    // Send a client event to the model
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

    // Send a text message to the model
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

    // Stop current session, clean up peer connection and data channel
    function stopSession() {
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

        isConnected = false;
        dataChannel = null;
        peerConnection = null;

        if (audioElement) {
            audioElement.srcObject = null;
        }
    }

    onMount(async () => {
        await startRealtimeSession();
    });

    onDestroy(() => {
        stopSession();
    });
</script>

<slot {isConnected} {items}>
    <div class="connection-status">
        {#if isConnected}
            <span>🟢 Connected - Listening...</span>
        {:else}
            <span>🔴 Connecting...</span>
        {/if}
    </div>
</slot>
