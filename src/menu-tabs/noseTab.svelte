<script>
    import { userState } from "../state.svelte.js";
    import Nose1 from "../noses/nose-1.svelte";
    import Nose2 from "../noses/nose-2.svelte";
    let avatarOptions = [Nose1, Nose2];
</script>

{#each avatarOptions as NoseItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={NoseItem == userState.charNose}
        onclick={() => {
            userState.charNose = NoseItem;
        }}
    >
        <div class="nose-option">
            <NoseItem></NoseItem>
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

    .nose-option {
        display: flex;
        width: 55rem;
        margin-top: -350%;
        margin-left: -260%;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
