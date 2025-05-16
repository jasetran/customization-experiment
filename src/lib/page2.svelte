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
    import Head1 from "../heads/head-1.svelte";
    import Hair1Front from "../hairs/hair-1-front.svelte";
    import Hair1Back from "../hairs/hair-1-back.svelte";
    import Eyes1 from "../eyes/eyes-1.svelte";
    import Nose1 from "../noses/nose-1.svelte";
    import MouthSmile from "../mouths/mouth-smile.svelte";
    import EyebrowsNeutral from "../eyebrows/eyebrows-neutral.svelte";
    import Clothes1 from "../clothes/clothes-1.svelte";

    let { scene = $bindable() } = $props();

    // pre-defined error message
    let error = $state("");

    userState.charHead = Head1;
    userState.charHair = { front: Hair1Front, back: Hair1Back };
    userState.charEyes = Eyes1;
    userState.charNose = Nose1;
    userState.charMouth = MouthSmile;
    userState.charEyebrows = EyebrowsNeutral;
    userState.charClothes = Clothes1;

    // tab items
    let menuItems = [
        {
            label: "head",
            value: 1,
            icon: "fluent-emoji-high-contrast:bust-in-silhouette",
            color: "headColor",
            component: headTab,
        },
        {
            label: "hair",
            value: 2,
            icon: "fluent-emoji-high-contrast:hair-pick",
            color: "hairColor",
            component: hairTab,
        },
        {
            label: "eyes",
            value: 3,
            icon: "emojione-monotone:eye",
            color: "eyesColor",
            component: eyesTab,
        },
        {
            label: "nose",
            value: 4,
            icon: "fluent-emoji-high-contrast:nose",
            color: undefined,
            component: noseTab,
        },
        {
            label: "clothes",
            value: 5,
            icon: "emojione-monotone:t-shirt",
            color: "clothesColor",
            component: clothesTab,
        },
    ];

    let activeItem = "head";
    let activeColor = "headColor";
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
        style="top: 10%; left: 48%; "
        onclick={() => {
            userState.charName = randomizeOptions(
                parameters.randomizationNames,
            );
        }}
        ><img
            style="width: 11rem"
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
            style="width: 10rem"
            alt="backwards"
        /></button
    >
    <button
        class="std-button"
        type="button"
        style="left: 92%"
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
            style="width: 10rem"
            alt="forwards"
        /></button
    >
</div>

<div id="menu-box" style="top: 18%; left: 14%;">
    <Tabs {menuItems} {activeItem} {activeColor}></Tabs>
</div>

<div class="char">
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHair.back></userState.charHair.back>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHead></userState.charHead>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charNose></userState.charNose>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charMouth></userState.charMouth>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charEyes></userState.charEyes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charEyebrows></userState.charEyebrows>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHair.front></userState.charHair.front>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charClothes></userState.charClothes>
    </div>
</div>

<style>
    .char {
        position: absolute;
        left: 56%;
        top: 35%;
        transform: translateY(-50%);
        width: 50rem;
        height: 30rem;
    }

    #char-entry-text {
        position: absolute;
        width: 30rem;
        top: 10%;
        left: 25%;
        transform: translateX(-50%) translateY(-50%);
        padding: 0.8rem;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 200%;
        border-color: rgb(94, 94, 94);
        border-style: solid;
        border-radius: 0.5rem;
    }

    .std-button {
        position: absolute;
        border: 0;
        background: transparent;
        top: 95%;
        left: 8%;
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
