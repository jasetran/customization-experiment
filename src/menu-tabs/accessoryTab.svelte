<script>
    import { userState } from "../state.svelte.js";
    import avatarComponents from "$lib/avatarComponents.ts";

    let avatarOptions = [];
    let HeadItem = userState.charHead;

    $: avatarOptions = Object.values(avatarComponents.accessories ?? []);
</script>

{#each avatarOptions as AccessoriesItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={AccessoriesItem == userState.charAccessories}
        onclick={() => {
            userState.charAccessories = AccessoriesItem;
        }}
    >
        <div class="head-option">
            <HeadItem></HeadItem>
        </div>
        <div class="accessory-option">
            <AccessoriesItem></AccessoriesItem>
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

    .accessory-option {
        width: 15rem;
        margin-top: -214.5%;
        margin-left: -37.95%;
    }

    .head-option {
        display: flex;
        width: 15rem;
        margin-top: -30%;
        margin-left: -40%;
    }

    .is-active {
        outline-style: solid;
        outline-width: 1rem;
        outline-color: rgb(255, 56, 56);
        outline-offset: calc(-1rem + 2px);
    }
</style>
