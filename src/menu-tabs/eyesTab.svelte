<script>
    import { userState } from "../state.svelte.js";

    const modules = import.meta.glob("../eyes/eyes-*.svelte", {
        eager: true,
    });

    const avatarOptions = [];

    for (let i = 1; i <= 3; i++) {
        const path = `../eyes/eyes-${i}.svelte`;

        avatarOptions.push(modules[path]?.default);
    }
</script>

{#each avatarOptions as EyesItem}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        style="position: relative"
        class="option"
        class:is-active={EyesItem == userState.charEyes}
        onclick={() => {
            userState.charEyes = EyesItem;
        }}
    >
        <EyesItem></EyesItem>
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
