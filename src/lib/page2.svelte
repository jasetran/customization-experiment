<script>
    import { parameters, randomizeOptions } from "../helperFunctions.js";
    import { avatarOptions } from "../customizeOptions.js";
    let { scene = $bindable() } = $props();
    let charName = $state("Enter your character's name");
    let charHead = $state("head-1.png");
    let error = $state("");
</script>

<div>
    <input
        id="char-entry-text"
        type="text"
        class:is-invalid={error.length}
        placeholder={charName}
        bind:value={charName}
    />
    <button
        id="std-button"
        type="button"
        style="top: 10%; left: 37%;"
        onclick={() => {
            charName = randomizeOptions(parameters.randomizationNames);
        }}
        ><img
            src="/assets/buttons/randomize-button.png"
            width="160"
            height="80"
            alt="randomize"
        /></button
    >
    <button
        id="std-button"
        type="button"
        onclick={() => {
            scene = scene - 1;
        }}
        ><img
            src="/assets/buttons/back-button.png"
            width="100"
            height="100"
            alt="backwards"
        /></button
    >
    <button
        id="std-button"
        type="button"
        style="left: 95%"
        onclick={() => {
            if (charName !== "Enter your character's name" && charName !== "") {
                scene = scene + 1;
            } else {
                error = "Please enter your character's name";
            }
        }}
        ><img
            src="/assets/buttons/forward-button.png"
            width="100"
            height="100"
            alt="forwards"
        /></button
    >
</div>

<div id="menu-box" style="top: 20%; left: 12%;">
    {#each avatarOptions.head as item}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            class="option"
            class:is-active={item == charHead}
            style="background-image: url('assets/char/{item}')"
            onclick={() => {
                charHead = item;
            }}
        ></button>
    {/each}
</div>

<div class="char-preview">
    <div
        class="head-preview"
        style="background-image: url('assets/char/{charHead}')"
    ></div>
</div>

<style>
    .char-preview {
        position: absolute;
        left: 60%;
        top: 20%;
    }

    .head-preview {
        background-repeat: no-repeat;
    }

    #char-entry-text {
        position: absolute;
        width: 400px;
        top: 10%;
        left: 16%;
        transform: translateX(-50%) translateY(-50%);
        padding: 12px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 150%;
    }

    #std-button {
        position: absolute;
        border: 0;
        background: transparent;
        top: 90%;
        left: 5%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 150%;
        padding: 10px;
    }

    #menu-box {
        display: block;
        position: absolute;
        padding: 30px 20px;
        background-color: rgb(255, 221, 158);
        border-color: rgb(255, 139, 14);
        border-style: solid;
        border-width: 10px;
        border-radius: 15px;
        display: grid;
        grid-template-columns: 125px 125px 125px 125px 125px;
        grid-gap: 10px;
        height: 400px;
    }

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

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }

    .is-active {
        border-color: rgb(255, 56, 56);
    }
</style>
