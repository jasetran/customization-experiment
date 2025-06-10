<script>
    import { userState } from "../state.svelte.js";

    const modules = import.meta.glob("../noses/nose-*.svelte", {
        eager: true,
    });

    // extract the numbers from module paths and finding the maximum
    // so i don't have to hard code it
    const moduleNumbers = Object.keys(modules)
        .map((path) => {
            const match = path.match(/nose-(\d+)\.svelte$/);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter((num) => num > 0);

    const maxNumber = Math.max(...moduleNumbers);

    const avatarOptions = [];

    for (let i = 1; i <= maxNumber; i++) {
        const path = `../noses/nose-${i}.svelte`;

        avatarOptions.push(modules[path]?.default);
    }
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
