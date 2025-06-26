<script>
    // imports
    import Tabs from "../menu-tabs/customizationTabs.svelte";
    import headTab from "../menu-tabs/headTab.svelte";
    import hairTab from "../menu-tabs/hairTab.svelte";
    import eyesTab from "../menu-tabs/eyesTab.svelte";
    import noseTab from "../menu-tabs/noseTab.svelte";
    import clothesTab from "../menu-tabs/clothesTab.svelte";
    import accessoryTab from "../menu-tabs/accessoryTab.svelte";
    import { parameters, randomizeOptions } from "../helperFunctions.js";
    import { userState } from "../state.svelte.js";
    import Head1 from "../heads/head-1.svelte";
    import Hair1Front from "../hairs/hair-1-front.svelte";
    import Hair1Back from "../hairs/hair-1-back.svelte";
    import Eyes1 from "../eyes/eyes-2.svelte";
    import Nose1 from "../noses/nose-1.svelte";
    import MouthSmile from "../mouths/mouth-smile.svelte";
    import EyebrowsNeutral from "../eyebrows/eyebrows-neutral.svelte";
    import ArmsNeutralShort from "../arms/arms-neutral-short.svelte";
    import Clothes1 from "../clothes/clothes-1.svelte";
    import Accessory1 from "../accessories/accessory-1.svelte";

    let { scene = $bindable() } = $props();

    // pre-defined error message
    let error = $state("");

    userState.charHead = Head1;
    userState.charHair = { front: Hair1Front, back: Hair1Back };
    userState.charEyes = Eyes1;
    userState.charNose = Nose1;
    userState.charMouth = MouthSmile;
    userState.charEyebrows = EyebrowsNeutral;
    userState.charArms = ArmsNeutralShort;
    userState.charClothes = Clothes1;
    userState.charAccessories = Accessory1;

    // tab items
    let menuItems = [
        {
            label: "head",
            value: 1,
            icon: "fluent-emoji-high-contrast:bust-in-silhouette",
            color: "headColor",
            shadowColor: undefined,
            component: headTab,
        },
        {
            label: "hair",
            value: 2,
            icon: "fluent-emoji-high-contrast:hair-pick",
            color: "hairColor",
            shadowColor: undefined,
            component: hairTab,
        },
        {
            label: "eyes",
            value: 3,
            icon: "emojione-monotone:eye",
            color: "eyesColor",
            shadowColor: undefined,
            component: eyesTab,
        },
        {
            label: "nose",
            value: 4,
            icon: "fluent-emoji-high-contrast:nose",
            color: undefined,
            shadowColor: undefined,
            component: noseTab,
        },
        {
            label: "clothes",
            value: 5,
            icon: "emojione-monotone:t-shirt",
            color: "clothesColor",
            shadowColor: "clothesShadow",
            component: clothesTab,
        },
        {
            label: "accessory",
            value: 6,
            icon: "emojione-monotone:glasses",
            color: "accessoriesColor",
            shadowColor: undefined,
            component: accessoryTab,
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
        placeholder="Enter your character name"
        bind:value={userState.charName}
    />
    <button
        class="randomize-button"
        type="button"
        style="top: 10%; left: 48%; "
        onclick={() => {
            userState.charName = randomizeOptions(parameters.randomNames);
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
        style="left: 3%; bottom: 3%"
        onclick={() => {
            scene = scene - 1;
        }}
        ><img
            src="/assets/buttons/back-button.png"
            style="width: 9rem"
            alt="backwards"
        /></button
    >
    <button
        class="std-button"
        type="button"
        style="right: 3%; bottom: 3%"
        onclick={() => {
            if (userState.charName !== undefined) {
                scene = scene + 1;
            } else {
                error = "Please enter your character's name";
            }
        }}
        ><img
            src="/assets/buttons/forward-button.png"
            style="width: 9rem"
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
        <userState.charArms></userState.charArms>
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
        <userState.charClothes></userState.charClothes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charHair.front></userState.charHair.front>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charAccessories></userState.charAccessories>
    </div>
</div>

<style>
    .char {
        position: absolute;
        left: 58%;
        top: 35%;
        transform: translateY(-50%);
        width: 50rem;
        height: 30rem;
        user-select: none;
        pointer-events: none;
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

    .randomize-button {
        position: absolute;
        border: 0;
        background: transparent;
        top: 53rem;
        left: 8%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 150%;
        padding: 0.5rem;
        z-index: 999;
    }

    .std-button {
        position: absolute;
        border: 0;
        background: transparent;
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
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
