<script>
    // imports
    import Tabs from "../menu-tabs/customizationTabs.svelte";
    import headTab from "../menu-tabs/headTab.svelte";
    import hairTab from "../menu-tabs/hairTab.svelte";
    import eyesTab from "../menu-tabs/eyesTab.svelte";
    import noseTab from "../menu-tabs/noseTab.svelte";
    import clothesTab from "../menu-tabs/clothesTab.svelte";
    import { parameters, randomizeOptions } from "../helperFunctions.js";
    import { userState } from "../state.svelte.js";

    let { scene = $bindable() } = $props();

    // pre-defined error message
    let error = $state("");

    // tab items
    let menuItems = [
        {
            label: "head",
            value: 1,
            icon: "fluent-emoji-high-contrast:bust-in-silhouette",
            component: headTab,
        },
        {
            label: "hair",
            value: 2,
            icon: "fluent-emoji-high-contrast:hair-pick",
            component: hairTab,
        },
        {
            label: "eyes",
            value: 3,
            icon: "emojione-monotone:eye",
            component: eyesTab,
        },
        {
            label: "nose",
            value: 4,
            icon: "fluent-emoji-high-contrast:nose",
            component: noseTab,
        },
        {
            label: "clothes",
            value: 5,
            icon: "emojione-monotone:t-shirt",
            component: clothesTab,
        },
    ];

    let activeItem = "head";
</script>

<div>
    <input
        id="char-entry-text"
        type="text"
        class:is-invalid={error.length}
        placeholder={userState.charName}
        bind:value={userState.charName}
    />
    <button
        id="std-button"
        type="button"
        style="top: 10%; left: 39%;"
        onclick={() => {
            userState.charName = randomizeOptions(
                parameters.randomizationNames,
            );
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
            if (
                userState.charName !== "Enter your character's name" &&
                userState.charName !== ""
            ) {
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

<div id="menu-box" style="top: 18%; left: 14%;">
    <Tabs {menuItems} {activeItem}></Tabs>
</div>

.
<div class="char-preview">
    <div class="char">
        <div
            class="char-head"
            style="background-image: url('assets/char/head-1.png')"
        ></div>
    </div>
</div>

<style>
    .char-preview {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .char {
        position: relative;
        padding-right: 200px;
        width: 350px;
        height: 500px;
    }

    .char-head {
        height: 100%;
        background-repeat: no-repeat;
    }

    #char-entry-text {
        position: absolute;
        width: 400px;
        top: 10%;
        left: 18%;
        transform: translateX(-50%) translateY(-50%);
        padding: 12px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 150%;
        border-color: rgb(94, 94, 94);
        border-style: solid;
        border-radius: 10px;
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
        position: absolute;
        display: block;
        padding: 30px 20px;
        background-color: rgb(255, 221, 158);
        border-color: rgb(255, 139, 14);
        border-style: solid;
        border-width: 10px;
        border-radius: 15px;
        display: grid;
        grid-template-columns: 125px 125px 125px 125px;
        grid-gap: 10px;
        height: 400px;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
