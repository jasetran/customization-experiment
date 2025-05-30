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
        d="M438.534 191.999C567.121 192.412 707.097 298.962 683.671 387.463C683.671 428.626 651.521 446.569 605.882 453.999H548.271L536.499 383.163L524.729 453.999H330.722L317.499 374.429L304.277 453.999H209.284C194.806 442.194 189.464 421.68 197.827 387.463C180.552 298.987 308.914 192.348 435.532 191.999H438.534Z"
        fill={userState.hairColor}
    />
    <path
        d="M597 720.609C648.886 662.527 716.5 530 684 366L616.902 378.589C637.959 501.778 638.511 607.084 597 720.609Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
