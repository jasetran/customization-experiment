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
        x="384.284"
        y="512.571"
        width="20.4286"
        height="67.6039"
        rx="10.2143"
        transform="rotate(-90 384.284 512.571)"
        fill={userState.accessoriesColor}
    />
    <path
        d="M310.885 423.5C355.561 423.5 391.271 458.249 391.271 500.5C391.271 542.751 355.561 577.5 310.885 577.5C266.209 577.5 230.5 542.751 230.5 500.5C230.5 458.249 266.209 423.5 310.885 423.5Z"
        stroke={userState.accessoriesColor}
        stroke-width="15"
    />
    <path
        d="M530.115 423.5C574.79 423.5 610.5 458.249 610.5 500.5C610.5 542.751 574.79 577.5 530.115 577.5C485.439 577.5 449.73 542.751 449.73 500.5C449.73 458.249 485.439 423.5 530.115 423.5Z"
        stroke={userState.accessoriesColor}
        stroke-width="15"
    />
</svg>
