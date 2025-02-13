<script>
    let { scene = $bindable() } = $props();
</script>

<h1>THIS IS PAGE 3!!!! You should see the beginning of the experiment now.</h1>
<div id="button-entry">
    <button
        id="start-button"
        type="button"
        onclick={() => {
            scene = 1;
        }}>Back</button
    >
</div>

<style>
    #pid-entry-text {
        padding: 8px;
        font-size: 150%;
    }

    #button-entry {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
    }

    #start-button {
        height: 47.5px;
        margin-left: 20px;
    }
</style>
