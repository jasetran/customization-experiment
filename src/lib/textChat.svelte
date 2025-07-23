<script lang="ts">
    let { scene = $bindable(), condition = $bindable() } = $props();
    import { systemPrompts } from "../helperFunctions.js";
    import RealtimeChat from "./realtimeChat.svelte";
    import { userState } from "../state.svelte.js";
    import type { RealtimeItem } from "../types.js";

    let items = $state<RealtimeItem[]>([]);
    let systemPrompt = $derived(
        scene == 4
            ? systemPrompts.practice.replace("[CHARACTER_NAME]", "AI friend") // this is for the text condition
            : systemPrompts.discussion.replace("[CHARACTER_NAME]", "AI friend"), // where children don't get to choose the name
    );
    let endTrigger = $derived(
        scene == 4
            ? "watch a fun video about water and ice"
            : "thank you for talking to me",
    );

    function handleConversationStart() {
        // no screenshot needed for text condition
        console.log("Text chat conversation starting - no screenshot needed");
    }

    function handleConversationEnd(conversationEnded, recordedChunks) {
        saveDataToUserState(recordedChunks);
        if (conversationEnded) {
            setTimeout(() => {
                scene++;
            }, 2000);
        }
    }

    // saving the userdata to S3 bucket
    async function saveDataToUserState(recordedChunks: Blob[]) {
        if (recordedChunks.length === 0) return;

        const interactionPhase = scene == 4 ? "practice" : "discussion";
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const videoFilename = `${userState.pid}-${condition}-${interactionPhase}-recording-${timestamp}.webm`;

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
            // upload video file
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
                videoUploadResponse,
            );

            // Upload userState if this is the discussion phase
            if (interactionPhase === "discussion") {
                await uploadUserState(timestamp);
            }
        } catch (error) {
            console.error(`Error during ${interactionPhase} upload:`, error);
        }
    }

    async function uploadUserState(timestamp?: string) {
        const ts = timestamp || new Date().toISOString().replace(/[:.]/g, "-");
        const userStateFilename = `${userState.pid}-${condition}-user-transcript-logs-${ts}.json`;

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

            console.log("UserState upload response:", userStateUploadResponse);
        } catch (error) {
            console.error("Error during userState upload:", error);
        }
    }
</script>

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
    .chat-messages {
        position: absolute;
        top: 10rem;
        left: 2rem;
        right: 2rem;
        bottom: 1rem;
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
        font-size: 2.1rem;
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
