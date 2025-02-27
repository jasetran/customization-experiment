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
        id="circle-button"
        type="button"
        onclick={() => {
            if (pid !== "") {
                if (condition !== "customize") {
                    scene = 3;
                } else {
                    scene++;
                }
            } else {
                error = "Please enter the participant ID";
            }
        }}
        ><img
            src="/assets/buttons/confirm-button.png"
            width="90"
            height="90"
            alt="confirm"
        /></button
    >
</div>

<style>
    #text-box {
        border-style: solid;
        border-radius: 10px;
        border-width: 5px;
        border-color: rgb(111, 158, 132);
        background-color: rgb(191, 223, 205);
        padding: 50px;
    }

    #pid-entry-text {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        margin-top: 35px;
        border-color: rgb(94, 94, 94);
        border-style: solid;
        border-radius: 10px;
        height: 50px;
        font-size: 150%;
    }

    #menu-page {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
    }

    #circle-button {
        margin-top: 20px;
        border: 0;
        background: transparent;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
