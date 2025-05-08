<script>
    let { scene = $bindable(), condition = $bindable() } = $props();
</script>

<h1>This is the page for the randomized condition chat.</h1>
<div id="button-entry">
    <button
        id="std-button"
        type="button"
        onclick={() => {
            scene = 1;
        }}>Back</button
    >
</div>

<style>
    #button-entry {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
    }

    #std-button {
        height: 47.5px;
        margin-left: 20px;
    }
</style>
