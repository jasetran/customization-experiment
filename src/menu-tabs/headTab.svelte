<script>
    import { userState } from "../state.svelte.js";
    import Head1 from "../heads/head-1.svelte";
    import Head2 from "../heads/head-2.svelte";
    import Head3 from "../heads/head-3.svelte";
    import Head4 from "../heads/head-4.svelte";
    import Head5 from "../heads/head-5.svelte";
    import Head6 from "../heads/head-6.svelte";
    import Head7 from "../heads/head-7.svelte";
    import Head8 from "../heads/head-8.svelte";
    let avatarOptions = [
        Head1,
        Head2,
        Head3,
        Head4,
        Head5,
        Head6,
        Head7,
        Head8,
    ];
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
