<script>
    import { parameters, randomizeOptions } from "../helperFunctions.js";

    let { scene = $bindable() } = $props();
    let charName = $state("Enter your character's name");
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
        style="top: 10%; left: 36%; font-size: 170%;"
        onclick={() => {
            charName = randomizeOptions(parameters.randomizationNames);
        }}>Randomize</button
    >
    <button
        id="std-button"
        type="button"
        onclick={() => {
            scene = scene - 1;
        }}>Back</button
    >
    <button
        id="std-button"
        type="button"
        style="left: 92%"
        onclick={() => {
            if (charName !== "Enter your character's name" && charName !== "") {
                scene = scene + 1;
            } else {
                error = "Please enter your character's name";
            }
        }}>Continue</button
    >
</div>

<div id="menu-box">
    <div id="options-icon"></div>
</div>

<style>
    #char-entry-text {
        position: absolute;
        width: 400px;
        top: 10%;
        left: 16%;
        transform: translateX(-50%) translateY(-50%);
        padding: 8px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 175%;
    }

    #std-button {
        position: absolute;
        top: 92%;
        left: 5%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 200%;
        padding: 10px;
    }

    #menu-box {
        display: block;
        position: relative;
        padding: 30px 20px;
        background-color: orange;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
