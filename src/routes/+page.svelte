<script>
    // imports
    import {
        parameters,
        randomizeOptions,
        setBackground,
    } from "../helperFunctions.js";
    import { page } from "$app/stores";
    import Page0 from "$lib/fullscreenPage.svelte";
    import Page1 from "$lib/introductionPage.svelte";
    import Page2 from "$lib/customizedScreen.svelte";
    import CustomizedChat from "$lib/customizedChat.svelte";
    import RandomizedChat from "$lib/randomizedChat.svelte";
    import TextChat from "$lib/textChat.svelte";

    const url = $page.url;
    let condition = $state(
        url.searchParams.get("condition") ||
            randomizeOptions(parameters.conditions),
    );
    let scene = $state(0);
    let pid = $state(url.searchParams.get("pid") || "");
</script>

<div id="screen-size" style={setBackground(scene)}>
    <div id="screen-blur">
        <div id="screen">
            {#if scene === 0}
                <Page0 bind:scene></Page0>
            {:else if scene === 1}
                <Page1 bind:scene bind:pid bind:condition></Page1>
            {:else if scene === 2 && condition === "customize"}
                <Page2 bind:scene></Page2>
            {:else if scene === 3 && condition === "customize"}
                <CustomizedChat bind:scene></CustomizedChat>
            {:else if scene === 3 && condition === "random"}
                <RandomizedChat bind:scene></RandomizedChat>
            {:else if scene === 3 && condition === "text"}
                <TextChat bind:scene></TextChat>
            {/if}
        </div>
    </div>
</div>

<style>
    :global(:root) {
        font-size: calc(1vw);
    }

    #screen-size {
        z-index: 1;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        width: 100%;
        height: 100vh;
        display: flex;
        overflow: hidden;
        background-size: cover;
        background-image: var(--background-image);
        --blur-amount: 0px;
        --background-image: white;
    }

    #screen-blur {
        width: 100%;
        height: 100vh;
        display: flex;
        backdrop-filter: blur(var(--blur-amount));
    }

    #screen {
        position: relative;
        margin: auto;
        width: 100%;
        max-height: 100vh;
        aspect-ratio: 16 / 9;
    }
</style>
