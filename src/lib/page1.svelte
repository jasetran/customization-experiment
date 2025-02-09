<script>
    let {
        scene = $bindable(),
        name = $bindable(),
        condition = $bindable(),
    } = $props();

    let error = $state("");
</script>

<div id="menu-page" style="top: 40%">
    <h1>Welcome to Science Learning Activity!</h1>
</div>
<div id="menu-page">
    <input
        id="pid-entry-text"
        type="text"
        class:is-invalid={error.length}
        placeholder="Participant ID"
        bind:value={name}
    />
    <button
        id="start-button"
        type="button"
        onclick={() => {
            if (name !== "") {
                if (condition !== "customize") {
                    scene = 3;
                } else {
                    scene++;
                }
            } else {
                error = "Poop";
            }
        }}>Start</button
    >
</div>

<style>
    #pid-entry-text {
        padding: 8px;
        font-size: 150%;
    }

    #menu-page {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
    }

    #start-button {
        height: 47.5px;
        margin-left: 20px;
        padding-right: 20px;
        padding-left: 20px;
        font-size: 150%;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
