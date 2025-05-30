<script>
    import { userState } from "../state.svelte.js";
    import Hair1Front from "../hairs/hair-1-front.svelte";
    import Hair1Back from "../hairs/hair-1-back.svelte";
    import Hair2Front from "../hairs/hair-2-front.svelte";
    import Hair2Back from "../hairs/hair-2-back.svelte";
    import Hair3Front from "../hairs/hair-3-front.svelte";
    import Hair3Back from "../hairs/hair-3-back.svelte";
    import Hair4Front from "../hairs/hair-4-front.svelte";
    import Hair4Back from "../hairs/hair-4-back.svelte";
    import Hair5Front from "../hairs/hair-5-front.svelte";
    import Hair5Back from "../hairs/hair-5-back.svelte";
    import Hair6Front from "../hairs/hair-6-front.svelte";
    import Hair6Back from "../hairs/hair-6-back.svelte";
    let avatarOptions = [
        { front: Hair1Front, back: Hair1Back },
        { front: Hair2Front, back: Hair2Back },
        { front: Hair3Front, back: Hair3Back },
        { front: Hair4Front, back: Hair4Back },
        { front: Hair5Front, back: Hair5Back },
        { front: Hair6Front, back: Hair6Back },
    ];
    let HeadItem = userState.charHead;
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
