<script>
    import { userState } from "../state.svelte.js";
    import avatarComponents from "$lib/avatarComponents.ts";

    let avatarOptions = [];

    $: avatarOptions = Object.values(avatarComponents.eyes ?? []);
</script>

{#each avatarOptions as EyesItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={EyesItem == userState.charEyes}
        onclick={() => {
            userState.charEyes = EyesItem;
        }}
    >
        <div class="eye-option">
            <EyesItem></EyesItem>
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

    .eye-option {
        display: flex;
        width: 20rem;
        margin-top: -68%;
        margin-left: -63%;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
