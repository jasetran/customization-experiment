<script>
    import Icon from "@iconify/svelte";
    export let menuItems = [];
    export let activeItem;

    const handleClick = (tabValue) => () => (activeItem = tabValue);
</script>

<div class="tabs">
    <ul>
        {#each menuItems as item}
            <div
                class="tab-btn"
                class:active-icon={item.label === activeItem}
                on:click={handleClick(item.label)}
            >
                <Icon icon={item.icon} style="color: white; font-size: 50px;"
                ></Icon>
            </div>
        {/each}
    </ul>
</div>

{#each menuItems as item}
    {#if activeItem == item.label}
        <svelte:component this={item.component} />
    {/if}
{/each}

<style>
    .tabs {
        position: absolute;
        right: 100%;
    }

    ul {
        list-style-type: none;
    }

    .tab-btn {
        background-color: rgb(255, 139, 14);
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 200%;
        margin-bottom: 8px;
        padding-right: 45px;
        cursor: pointer;
        border-color: transparent;
        border-style: solid;
        border-width: 10px;
        border-radius: 15px;
    }

    .active-icon {
        background-color: rgb(0, 225, 255);
        border-color: rgb(0, 225, 255);
    }
</style>
