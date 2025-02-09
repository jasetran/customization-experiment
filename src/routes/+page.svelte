<script>
    import { page } from "$app/stores";
    import Page1 from "$lib/page1.svelte";
    import Page2 from "$lib/page2.svelte";
    import Page3 from "$lib/page3.svelte";

    // RCT options (randomly assigns participants to condition)
    const conditionOptions = ["text", "random", "customize"];

    // function to randomly select an option
    function choose(conditionOptions) {
        var index = Math.floor(Math.random() * conditionOptions.length);
        return conditionOptions[index];
    }

    const url = $page.url;
    let condition = $state(
        url.searchParams.get("condition") || choose(conditionOptions),
    );
    let scene = $state(1);
    let name = $state("");
</script>

<div id="screen-size">
    {#if scene === 1}
        <Page1 bind:scene bind:name bind:condition></Page1>
    {:else if scene === 2 && condition === "customize"}
        <Page2 bind:scene></Page2>
    {:else if scene === 3}
        <Page3 bind:scene></Page3>
    {/if}
</div>

<style>
    #screen-size {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-image: url("./background.svg");
        background-size: cover;
    }
</style>
