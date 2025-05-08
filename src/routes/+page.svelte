<script>
    // imports
    import {
        parameters,
        randomizeOptions,
        setBackground,
    } from "../helperFunctions.js";
    import { page } from "$app/stores";
    import Page0 from "$lib/fullscreenPage.svelte";
    import Page1 from "$lib/page1.svelte";
    import Page2 from "$lib/page2.svelte";
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

<div id="screen-size" style="background-image: url({setBackground(scene)})">
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

<style>
    :global(:root) {
        font-size: calc(1vw);
    }

    #screen-size {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        width: 100%;
        height: 100vh;
        display: flex;
        overflow: hidden;
        background-size: cover;
    }

    #screen {
        position: relative;
        margin: auto;
        width: 100%;
        aspect-ratio: 16 / 9;
    }
</style>
