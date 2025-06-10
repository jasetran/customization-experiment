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
        d="M447.201 147.002C590.5 126.5 752.499 270 739 374.036C739 404.175 723.059 423.597 697.468 436H566.25L553.457 354.874L540.663 436H332.533L318.24 353.141L303.948 436H200.262C191.98 421.702 187.385 401.684 187.385 374.036C164 259.5 304.5 133.5 447.201 147.002Z"
        fill={userState.hairColor}
    />
    <path
        d="M601.6 720.264C651.125 662.354 715.181 522.576 683.514 358.5L619.567 378.361C640.138 501.596 641.006 606.887 601.6 720.264Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
