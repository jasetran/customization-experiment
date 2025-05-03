<script>
    let {
        scene = $bindable(),
        pid = $bindable(),
        condition = $bindable(),
    } = $props();

    let error = $state("");
</script>

<div id="menu-page" style="top: 50%">
    <div id="text-box">
        <h1 style="font-size: 2.2rem;">
            Welcome to Science Learning Activity!
        </h1>
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
            alt="confirm"
            style="width: 100%"
        /></button
    >
</div>

<style>
    #text-box {
        border-style: solid;
        border-radius: 1em;
        border-width: 0.4em;
        border-color: rgb(111, 158, 132);
        background-color: rgb(191, 223, 205);
        padding: 3em;
    }

    #pid-entry-text {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        margin-top: 0.7rem;
        border-color: rgb(94, 94, 94);
        border-style: solid;
        border-radius: 1rem;
        height: 4rem;
        font-size: 170%;
    }

    #menu-page {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
    }

    #circle-button {
        width: 6rem;
        border: 0;
        background: transparent;
        padding: 0;
        margin-left: 1rem;
    }

    .is-invalid {
        border-color: rgb(215, 83, 83);
        background-color: rgb(215, 83, 83);
        color: white;
    }
</style>
