<script>
    let {
        scene = $bindable(),
        pid = $bindable(),
        condition = $bindable(),
    } = $props();

    let error = $state("");
</script>

<div id="menu-page" style="top: 40%">
    <div id="text-box">
        <h1>Welcome to Science Learning Activity!</h1>
    </div>
</div>
<div id="menu-page">
    <input
        id="pid-entry-text"
        type="text"
        class:is-invalid={error.length}
        placeholder="Participant ID"
        bind:value={pid}
    />
    <button
        id="start-button"
        type="button"
        onclick={() => {
            if (pid !== "") {
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
    #text-box {
        border-style: solid;
        border-radius: 10px;
        border-width: 5px;
        border-color: rgb(44, 110, 172);
        background-color: rgb(180, 216, 255);
        padding: 50px;
    }

    #pid-entry-text {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
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
