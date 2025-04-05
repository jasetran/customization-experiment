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

<div class="tabs-content">
    {#each menuItems as item}
        {#if activeItem == item.label}
            <svelte:component this={item.component} />
        {/if}
    {/each}
</div>

<style>
    .tabs {
        position: absolute;
        right: 100%;
    }

    .tabs-content {
        padding: 30px 20px;
        background-color: rgb(255, 221, 158);
        border-color: rgb(255, 139, 14);
        border-style: solid;
        border-width: 10px;
        border-radius: 15px;
        display: grid;
        grid-template-columns: 125px 125px 125px 125px;
        grid-gap: 10px;
        height: 400px;
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
        border-radius: 15px 0 0 15px;
    }

    .active-icon {
        background-color: rgb(0, 225, 255);
        border-color: rgb(0, 225, 255);
    }
</style>
