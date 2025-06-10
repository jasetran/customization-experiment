<script>
    import { userState } from "../state.svelte.js";

    const modules = import.meta.glob("../heads/head-*.svelte", {
        eager: true,
    });

    const avatarOptions = [];

    for (let i = 1; i <= 8; i++) {
        const path = `../heads/head-${i}.svelte`;

        avatarOptions.push(modules[path]?.default);
    }
</script>

{#each avatarOptions as HeadItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={HeadItem == userState.charHead}
        onclick={() => {
            userState.charHead = HeadItem;
        }}
    >
        <HeadItem></HeadItem>
    </button>
{/each}

<style>
    .option {
        border: 0;
        border-radius: 2rem;
        padding: 0.1rem;
        background-color: white;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        aspect-ratio: 1;
        box-sizing: border-box;
        overflow: hidden;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
