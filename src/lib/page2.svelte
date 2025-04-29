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
    import Head1 from "../head-1.svelte";
    import Hair1Front from "../hair-1-front.svelte";
    import Hair1Back from "../hair-1-back.svelte";

    let { scene = $bindable() } = $props();

    // pre-defined error message
    let error = $state("");

    userState.charHead = Head1;
    userState.charHair = { front: Hair1Front, back: Hair1Back };

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
        class="std-button"
        type="button"
        style="top: 8%; left: 45%; "
        onclick={() => {
            userState.charName = randomizeOptions(
                parameters.randomizationNames,
            );
        }}
        ><img
            style="width: 10rem"
            src="/assets/buttons/randomize-button.png"
            alt="randomize"
        /></button
    >
    <button
        class="std-button"
        type="button"
        onclick={() => {
            scene = scene - 1;
        }}
        ><img
            src="/assets/buttons/back-button.png"
            style="width: 8rem"
            alt="backwards"
        /></button
    >
    <button
        class="std-button"
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
            style="width: 8rem"
            alt="forwards"
        /></button
    >
</div>

<div id="menu-box" style="top: 15%; left: 14%;">
    <Tabs {menuItems} {activeItem}></Tabs>
</div>

<div class="char">
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHair.back></userState.charHair.back>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHead></userState.charHead>
    </div>
    <div>
        <userState.charHair.front></userState.charHair.front>
    </div>
</div>

<style>
    .char {
        position: absolute;
        right: -3%;
        top: 30%;
        transform: translateY(-50%);
        width: 45rem;
        height: 30rem;
    }

    #char-entry-text {
        position: absolute;
        width: 25rem;
        top: 8%;
        left: 25%;
        transform: translateX(-50%) translateY(-50%);
        padding: 0.8rem;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 175%;
        border-color: rgb(94, 94, 94);
        border-style: solid;
        border-radius: 0.5rem;
    }

    .std-button {
        position: absolute;
        border: 0;
        background: transparent;
        top: 80%;
        left: 5%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 150%;
        padding: 0.5rem;
        z-index: 999;
    }

    #menu-box {
        position: absolute;
        display: block;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
