<script>
    import { userState } from "../state.svelte.js";
    import avatarComponents from "$lib/avatarComponents.ts";

    let avatarOptions = [];
    let HeadItem = userState.charHead;

    $: avatarOptions = Object.values(avatarComponents.hairs ?? []);
</script>

{#each avatarOptions as HairItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        class="option"
        class:is-active={HairItem.front == userState.charHair.front}
        onclick={() => {
            userState.charHair = HairItem;
        }}
    >
        <div style="display: flex; margin-bottom: -114.4%">
            <HairItem.back></HairItem.back>
        </div>
        <div style="display: flex; margin-bottom: -114.4%">
            <HeadItem></HeadItem>
        </div>
        <div>
            <HairItem.front></HairItem.front>
        </div>
    </button>
{/each}

<style>
    .option {
        display: flex;
        flex-direction: column;
        border: 0;
        border-radius: 2rem;
        padding: 1rem;
        background-color: white;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        aspect-ratio: 1;
        box-sizing: border-box;
        overflow: hidden;
        padding-top: 0rem;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
