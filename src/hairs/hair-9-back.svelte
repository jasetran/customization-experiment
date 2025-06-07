<script>
    import { userState } from "../state.svelte.js";
</script>

<svg
    width="100%"
    viewBox="0 0 923 1056"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M219.556 683.053C204.878 605.048 152.302 518.966 227.555 352.225C302.808 185.485 664.406 306.293 664.406 306.293L708.001 413.685C708.001 413.685 719 598.386 719 632.156C719 665.926 708.001 708.4 708.001 708.4L620.511 726.267C620.511 726.267 234.235 761.058 219.556 683.053Z"
        fill={userState.hairColor}
    />
    <path
        d="M208.114 706.5C176.496 657.903 151.199 507.967 193.906 379.142L208.115 421.419C184.955 518.992 193.542 614.631 208.114 706.5Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
