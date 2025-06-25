<script>
    import Fullscreen from "svelte-fullscreen";
    let { scene = $bindable() } = $props();
</script>

<div id="fullscreen-page">
    <h1 style="font-size: 2.5rem; margin-bottom: 3rem;">
        The experiment must be played in fullscreen mode. Press the button to
        continue.
    </h1>

    <Fullscreen let:onRequest>
        <!-- svelte-ignore event_directive_deprecated -->
        <button
            on:click={() => {
                onRequest();
                scene++;
            }}
        >
            Enter Fullscreen
        </button>
    </Fullscreen>
</div>

<style>
    #fullscreen-page {
        width: 60rem;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;
    }

    button {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 2.5rem;
        padding: 1rem;
        background-color: rgb(109, 179, 236);
        border-style: solid;
        border-width: 0.4rem;
        border-radius: 0.5rem;
        border-color: rgb(26, 104, 168);
    }

    button:hover {
        background: rgb(26, 104, 168);
    }
</style>
