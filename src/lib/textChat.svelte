<script lang="ts">
    let { scene = $bindable(), condition = $bindable() } = $props();
    import { systemPrompts } from "../helperFunctions.js";
    import RealtimeChat from "./realtimeChat.svelte";
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

    function handleConversationEnd(conversationEnded) {
        if (conversationEnded) {
            setTimeout(() => {
                scene++;
            }, 2000);
        }
    }
</script>

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
