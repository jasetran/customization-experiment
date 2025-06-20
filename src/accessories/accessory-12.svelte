<script>
    import { userState } from "../state.svelte.js";
</script>

<svg
    width="100%"
    viewBox="0 0 923 1056"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect
        x="245"
        y="438"
        width="151"
        height="105"
        rx="14"
        stroke={userState.accessoriesColor}
        stroke-width="12"
    />
    <rect
        x="444"
        y="438"
        width="151"
        height="105"
        rx="14"
        stroke={userState.accessoriesColor}
        stroke-width="12"
    />
    <rect
        x="394"
        y="497"
        width="12"
        height="50"
        rx="6"
        transform="rotate(-90 394 497)"
        fill={userState.accessoriesColor}
    />
</svg>
