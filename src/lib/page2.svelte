<script>
    let { scene = $bindable(), charName = $bindable() } = $props();

    const charNameOptions = [
        "Noah",
        "Melina",
        "Leah",
        "Eris",
        "Eddie",
        "Eris",
        "Logan",
        "Lincoln",
        "Madelyn",
        "Lillian",
        "Lucian",
        "Celeste",
        "Criselle",
        "Camden",
        "Adrian",
        "Pao",
    ];

    let error = $state("");
</script>

<input
    id="char-entry-text"
    type="text"
    class:is-invalid={error.length}
    placeholder="Enter your character's name"
    bind:value={charName}
/>
<button
    id="back-button"
    type="button"
    style="top: 10%; left: 36%; font-size: 170%;"
    onclick={() => (charName = shuffle(charNameOptions))}>Randomize</button
>
<button
    id="back-button"
    type="button"
    onclick={() => {
        scene = scene - 1;
    }}>Back</button
>

<style>
    #char-entry-text {
        position: absolute;
        width: 400px;
        top: 10%;
        left: 16%;
        transform: translateX(-50%) translateY(-50%);
        padding: 8px;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 175%;
    }

    #back-button {
        position: absolute;
        top: 90%;
        left: 5%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 200%;
        padding: 10px;
    }
</style>
