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
        <NoseItem></NoseItem>
    </button>
{/each}

<style>
    .option {
        border-radius: 20px;
        border-style: solid;
        border-width: 10px;
        border-color: white;
        padding: 30px;
        background-color: white;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        aspect-ratio: 1;
        box-sizing: border-box;
    }

    .is-active {
        border-color: rgb(255, 56, 56);
    }
</style>
