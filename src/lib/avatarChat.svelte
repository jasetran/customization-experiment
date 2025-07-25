<script lang="ts">
    let { scene = $bindable() } = $props();
    import html2canvas from "html2canvas";
    import { onMount } from "svelte";
    import { userState } from "../state.svelte.js";
    import {
        randomizedDefinedAvatar,
        avatarPresets,
        systemPrompts,
    } from "../helperFunctions.js";
    import avatarComponents from "./avatarComponents.js";
    import RealtimeChat from "./realtimeChat.svelte";
    import type { RealtimeItem } from "../types.js";

    let screenshotBlob = undefined; // empty screenshot blob
    let items = $state<RealtimeItem[]>([]);
    let systemPrompt = $derived(
        scene == 4
            ? systemPrompts.practice.replace(
                  "[CHARACTER_NAME]",
                  userState.charName || "Jasmine",
              ) // replace with updated character name value
            : systemPrompts.discussion.replace(
                  "[CHARACTER_NAME]",
                  userState.charName || "Jasmine",
              ),
    );

    let endTrigger = $derived(
        scene == 4
            ? "watch a fun video about water and ice"
            : "thank you for talking to me",
    );
    const interactionPhase = scene == 4 ? "practice" : "discussion";

    function handleConversationEnd(
        conversationEnded,
        recordedChunks,
        onUploadComplete,
    ) {
        if (interactionPhase === "practice") {
            // for practice phase: save data but don't show upload screen
            saveDataToUserState(recordedChunks, null);
            if (conversationEnded) {
                setTimeout(() => {
                    scene++;
                }, 2000);
            }
        } else if (interactionPhase === "discussion") {
            // for discussion phase: save data and show upload screen
            saveDataToUserState(recordedChunks, onUploadComplete);
          
    // Function to handle screenshot capture when start button is clicked
    async function handleConversationStart() {
        if (
            (userState.condition === "random" ||
                userState.condition === "customize") &&
            interactionPhase === "practice"
        ) {
            try {
                // Wait for the DOM to update and button to be removed
                // Use requestAnimationFrame to ensure the next paint cycle completes
                await new Promise<void>((resolve) => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            resolve();
                        });
                    });
                });
                // additional small delay to ensure button is fully gone
                await new Promise((resolve) => setTimeout(resolve, 100));

                screenshotBlob = await captureScreenshot();
                console.log("Screenshot captured successfully");
            } catch (error) {
                console.error("Failed to capture screenshot:", error);
            }
        }
    }

    // capturing screenshot of character
    async function captureScreenshot() {
        try {
            const canvas = await html2canvas(document.body, {
                backgroundColor: "#ffffff",
                scale: window.devicePixelRatio || 1, // accounting for ipad screen sizes
                x: window.innerWidth / 2,
                y: 0,
                width: window.innerWidth / 2,
                height: window.innerHeight,
                useCORS: true,
                allowTaint: true,
            });

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, "image/png");
            });
        } catch (error) {
            console.error("Error capturing screenshot:", error);
            return null;
        }
    }

    // saving the userdata to S3 bucket
    async function saveDataToUserState(
        recordedChunks: Blob[],
        onUploadComplete?: () => void,
    ) {
        if (recordedChunks.length === 0) {
            // If no chunks but callback exists, still call it
            if (onUploadComplete) onUploadComplete();
            return;
        }

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const videoFilename = `${userState.pid}-${userState.condition}-${interactionPhase}-recording-${timestamp}.webm`;

        // add the transcripts to the appropriate phase array
        if (interactionPhase === "practice") {
            userState.interactionSession.practice_log = JSON.parse(
                JSON.stringify(items),
            );
        } else if (interactionPhase === "discussion") {
            userState.interactionSession.discussion_log = JSON.parse(
                JSON.stringify(items),
            );
        }

        recordedChunks = [];

        try {
            // Upload video file
            const videoResponse = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: videoFilename,
                    contentType: "video/webm",
                    userId: userState.pid,
                }),
            });

            const videoUploadData = await videoResponse.json();

            const videoUploadResponse = await fetch(videoUploadData.uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "video/webm",
                },
                body: blob,
            });

            console.log(
                `${interactionPhase} video upload response:`,
                videoUploadResponse.status,
            );

            // capture and upload screenshot during practice phase
            if (interactionPhase === "practice") {
                if (screenshotBlob) {
                    const screenshotFilename = `${userState.pid}-${userState.condition}-ca-${userState.charName}-${timestamp}.png`;

                    const screenshotResponse = await fetch("/api/upload", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fileName: screenshotFilename,
                            contentType: "image/png",
                            userId: userState.pid,
                        }),
                    });

                    const screenshotUploadData =
                        await screenshotResponse.json();

                    const screenshotUploadResponse = await fetch(
                        screenshotUploadData.uploadUrl,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "image/png",
                            },
                            body: screenshotBlob as Blob,
                        },
                    );

                    console.log(
                        "Screenshot upload response:",
                        screenshotUploadResponse.status,
                    );
                }
            }

            // upload userState if this is the discussion phase
            if (interactionPhase === "discussion") {
                await uploadUserState(timestamp);
            }

            // Call the upload complete callback after all uploads succeed
            if (onUploadComplete) {
                onUploadComplete();
                // Now increment the scene after callback
                setTimeout(() => {
                    scene++;
                }, 300); // Short delay to let upload screen hide gracefully
            }
        } catch (error) {
            console.error(`Error during ${interactionPhase} upload:`, error);
            if (onUploadComplete) {
                onUploadComplete(); // show error instead
            }
        }
    }

    async function uploadUserState(timestamp?: string) {
        const ts = timestamp || new Date().toISOString().replace(/[:.]/g, "-");
        const userStateFilename = `${userState.pid}-${userState.condition}-userState-transcript-logs-${ts}.json`;

        try {
            const userStateResponse = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: userStateFilename,
                    contentType: "application/json",
                    userId: userState.pid,
                }),
            });

            const userStateUploadData = await userStateResponse.json();

            // Convert userState to JSON blob
            const userStateBlob = new Blob(
                [JSON.stringify(userState, null, 2)],
                {
                    type: "application/json",
                },
            );

            const userStateUploadResponse = await fetch(
                userStateUploadData.uploadUrl,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: userStateBlob,
                },
            );

            console.log(
                "UserState upload response:",
                userStateUploadResponse.status,
            );
        } catch (error) {
            console.error("Error during userState upload:", error);
        }
    }

    // Remove the old onMount screenshot capture
    // No longer needed since we're capturing on button click

    // only run this function during the practice portion so it only randomizes once
    if (userState.condition === "random" && scene == 4) {
        randomizedDefinedAvatar(userState, avatarComponents, avatarPresets);
    }
</script>

<div id="char-chat">
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHair.back></userState.charHair.back>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charArms></userState.charArms>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHead></userState.charHead>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charNose></userState.charNose>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charMouth></userState.charMouth>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charEyes></userState.charEyes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charEyebrows></userState.charEyebrows>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charClothes></userState.charClothes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHair.front></userState.charHair.front>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charAccessories></userState.charAccessories>
    </div>
</div>

<RealtimeChat
    bind:items
    onConversationStart={handleConversationStart}
    onConversationEnd={handleConversationEnd}
    {systemPrompt}
    {endTrigger}
>
    <div class="chat-messages">
        {#each items.filter((item) => !item.content.some((part) => part.type === "input_text")) as item (item.id)}
            <div class="message {item.role}">
                <div class="message-content">
                    {item.content
                        .map((part) =>
                            "transcript" in part ? part.transcript : "",
                        )
                        .join("\n") || "..."}
                </div>
            </div>
        {/each}
    </div>
</RealtimeChat>

<style>
    #char-chat {
        position: absolute;
        left: 50%;
        top: 18%;
        transform: translateY(-50%);
        width: 60rem;
        height: 30rem;
    }

    .chat-messages {
        position: absolute;
        top: 18%;
        left: 2%;
        right: 50%;
        bottom: 4%;
        overflow: hidden;
        padding: 0rem 2rem 2rem 2rem;
        background: rgba(98, 98, 98, 0.7);
        border-radius: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .message {
        max-width: 100%;
        display: flex;
        align-items: flex-end;
        gap: 0.75rem;
        position: relative;
        margin-bottom: 1.5rem;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .message.user {
        display: flex;
        justify-content: flex-end;
    }

    .message.assistant {
        display: flex;
        justify-content: flex-start;
    }

    .message-content {
        padding: 1rem 1.25rem;
        border-radius: 1.25rem;
        font-size: 1.5rem;
        line-height: 1.5;
        position: relative;
        word-wrap: break-word;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .message.user .message-content {
        background: #003f77;
        color: white;
        border-bottom-right-radius: 0.25rem;
    }

    .message.assistant .message-content {
        background: rgba(255, 255, 255, 0.9);
        color: #1f2937;
        border-bottom-left-radius: 0.25rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
</style>
