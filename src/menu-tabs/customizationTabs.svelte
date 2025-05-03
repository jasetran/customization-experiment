<script>
    import Icon from "@iconify/svelte";
    import { userState } from "../state.svelte.js";
    import ColorPicker from "../color-picker.svelte";
    export let menuItems = [];
    export let activeItem;
    export let activeColor;

    const handleClick = (tabValue, colorValue) => () => {
        activeItem = tabValue;
        activeColor = colorValue;
    };
</script>

<div class="tabs">
    <ul>
        {#each menuItems as item}
            <button
                class="tab-btn"
                class:active-icon={item.label === activeItem}
                on:click={handleClick(item.label, item.color)}
                on:keypress={handleClick(item.label, item.color)}
            >
                <Icon icon={item.icon} style="color: white; font-size: 3rem;"
                ></Icon>
            </button>
        {/each}
    </ul>
</div>

<div class="tabs-content">
    {#each menuItems as item}
        {#if activeItem == item.label}
            <svelte:component this={item.component} />
        {/if}
    {/each}
</div>

<ColorPicker bind:color={userState[activeColor]} />

<style>
    .tabs {
        position: absolute;
        right: 100%;
    }

    .tabs-content {
        padding: 2.5rem 1.5rem;
        background-color: rgb(255, 221, 158);
        border-color: rgb(255, 139, 14);
        border-style: solid;
        border-width: 1rem;
        border-radius: 1.5rem;
        display: grid;
        grid-template-columns: 10rem 10rem 10rem 10rem;
        grid-gap: 1rem;
        height: 22rem;
    }

    ul {
        list-style-type: none;
    }

    .tab-btn {
        display: flex;
        background-color: rgb(255, 139, 14);
        margin-bottom: 0.8rem;
        padding: 0.8rem;
        padding-right: 2rem;
        cursor: pointer;
        border: 0;
        border-radius: 1.5rem 0 0 1.5rem;
    }

    .active-icon {
        background-color: rgb(0, 225, 255);
        border-color: rgb(0, 225, 255);
    }
</style>
