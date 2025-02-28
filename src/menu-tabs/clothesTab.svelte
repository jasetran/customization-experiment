<script>
    import { avatarOptions } from "../customizeOptions.js";
    let charClothes = $state("clothes-1.png");
</script>

{#each avatarOptions.clothes as item}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        class="option"
        class:is-active={item == charClothes}
        style="background-image: url('assets/char/{item}')"
        onclick={() => {
            charClothes = item;
        }}
    ></button>
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
