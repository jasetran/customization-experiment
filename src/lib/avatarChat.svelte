<script lang="ts">
    let { scene = $bindable(), condition = $bindable() } = $props();
    import { userState } from "../state.svelte.js";
    import {
        randomizedDefinedAvatar,
        avatarPresets,
        systemPrompts,
    } from "../helperFunctions.js";
    import avatarComponents from "./avatarComponents.js";
    import RealtimeChat from "./realtimeChat.svelte";
    import type { RealtimeItem } from "../types.js";

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

    function handleConversationEnd(conversationEnded, recordedChunks) {
        saveDataToUserState(recordedChunks);
        if (conversationEnded) {
            setTimeout(() => {
                scene++;
            }, 2000);
        }
    }

    function saveDataToUserState(recordedChunks: Blob[]) {
        if (recordedChunks.length === 0) return;

        const interactionPhase = scene == 4 ? "practice" : "discussion";
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `${userState.pid}-${interactionPhase}-${timestamp}.webm`;

        const recording = {
            filename: filename,
            blob: blob,
            timestamp: timestamp,
            size: blob.size,
        };

        // add the recording to the appropriate phase array
        if (interactionPhase === "practice") {
            userState.interactionSession.practice_recording.push(recording);
            userState.interactionSession.practice_log = JSON.parse(
                JSON.stringify(items),
            );
        } else if (interactionPhase === "discussion") {
            userState.interactionSession.discussion_recording.push(recording);
            userState.interactionSession.discussion_log = JSON.parse(
                JSON.stringify(items),
            );
        }
        recordedChunks = [];
        console.log("Recording saved");
    }

    if (condition === "random") {
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
        left: 46%;
        top: 15%;
        transform: translateY(-50%);
        width: 60rem;
        height: 30rem;
    }

    .chat-messages {
        position: absolute;
        top: 6rem;
        left: 2rem;
        right: 54rem;
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
