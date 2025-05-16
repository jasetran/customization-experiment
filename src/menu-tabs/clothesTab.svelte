<script>
    import { userState } from "../state.svelte.js";
    import Clothes1 from "../clothes/clothes-1.svelte";
    import Clothes2 from "../clothes/clothes-2.svelte";
    import Clothes3 from "../clothes/clothes-3.svelte";
    import Clothes4 from "../clothes/clothes-4.svelte";
    let avatarOptions = [Clothes1, Clothes2, Clothes3, Clothes4];
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
        <ClothesItem></ClothesItem>
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
