<script>
    let avatarOptions = [
        "eyes-1.png",
        "eyes-2.png",
        "eyes-3.png",
        "eyes-4.png",
    ];
</script>

{#each avatarOptions as item}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        class="option"
        class:is-active={item == charEyes}
        style="background-image: url('assets/char/{item}')"
        onclick={() => {
            charEyes = item;
        }}
    ></button>
{/each}

<style>
    .option {
        border-radius: 20px;
        border-style: solid;
        border-width: 10px;
        border-color: white;
        padding: 30px;
        background-color: white;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        aspect-ratio: 1;
        box-sizing: border-box;
    }

    .is-active {
        border-color: rgb(255, 56, 56);
    }
</style>
