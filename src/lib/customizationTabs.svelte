<script>
    let menuTabs = [];
    export let activeTabValue = 1;
    import { avatarOptions } from "../customizeOptions.js";

    const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>
