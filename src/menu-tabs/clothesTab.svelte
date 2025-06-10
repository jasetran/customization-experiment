<script>
    import { userState } from "../state.svelte.js";

    const modules = import.meta.glob("../clothes/clothes-*.svelte", {
        eager: true,
    });

    const avatarOptions = [];

    for (let i = 1; i <= 15; i++) {
        const path = `../clothes/clothes-${i}.svelte`;

        avatarOptions.push(modules[path]?.default);
    }

    let HeadItem = userState.charHead;
</script>

{#each avatarOptions as ClothesItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={ClothesItem == userState.charClothes}
        onclick={() => {
            userState.charClothes = ClothesItem;
        }}
    >
        <div class="head-option">
            <HeadItem></HeadItem>
        </div>
        <div class="clothes-option">
            <ClothesItem></ClothesItem>
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

    .clothes-option {
        width: 15rem;
        margin-top: -214.5%;
        margin-left: -39.5%;
    }

    .head-option {
        display: flex;
        width: 15rem;
        margin-top: -90%;
        margin-left: -40%;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
