<script>
    let { scene = $bindable() } = $props();
</script>

<h1>THIS IS PAGE 3!!!! You should see the beginning of the experiment now.</h1>
<div id="button-entry">
    <button
        id="std-button"
        type="button"
        onclick={() => {
            scene = scene - 1;
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
