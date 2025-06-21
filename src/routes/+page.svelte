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
    import LearningVideo from "$lib/learningVideo.svelte";
    import AvatarChat from "$lib/avatarChat.svelte";
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
            {:else if scene === 3 && condition !== "text"}
                <AvatarChat bind:scene bind:condition></AvatarChat>
            {:else if scene === 3 && condition === "text"}
                <TextChat bind:scene bind:condition></TextChat>
            {:else if scene === 4}
                <LearningVideo bind:scene></LearningVideo>
            {:else if scene === 5 && condition !== "text"}
                <AvatarChat bind:scene bind:condition></AvatarChat>
            {:else if scene === 5 && condition === "text"}
                <TextChat bind:scene bind:condition></TextChat>
            {/if}
        </div>
    </div>
</div>

<style>
    :global(:root) {
        font-size: calc(min(1vw, 1.77vh));
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
        display: flex;
        width: 100%;
        height: 100vh;
        backdrop-filter: blur(var(--blur-amount));
    }

    #screen {
        position: relative;
        margin: auto;
        width: min(100vw, 177vh);
        aspect-ratio: 16 / 9;
    }
</style>
