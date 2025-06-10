<script>
    import { userState } from "../state.svelte.js";
</script>

<svg
    width="100%"
    viewBox="0 0 923 1056"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_4064_84)">
        <path
            d="M611.034 765.04C654.882 807.784 682 866.816 682 932.018C682 1062.48 573.429 1056 439.5 1056C305.571 1056 197 1062.48 197 932.018C197 868.889 222.42 811.545 263.832 769.167C315.795 783.589 399.62 779 438.834 779C481.398 779 566.661 784.405 611.034 765.04Z"
            fill={userState.clothesColor}
        />
        <path
            d="M329 726.082L335 797.082"
            stroke={userState.clothesColor}
            stroke-width="15"
            stroke-linecap="round"
        />
        <path
            d="M554.473 726.714C554.822 722.586 551.759 718.958 547.632 718.609C543.504 718.26 539.875 721.323 539.527 725.451L554.473 726.714ZM547 726.082L539.527 725.451L533.527 796.451L541 797.082L548.473 797.714L554.473 726.714L547 726.082Z"
            fill={userState.clothesColor}
        />
    </g>
    <defs>
        <clipPath id="clip0_4064_84">
            <rect width="923" height="1056" fill="white" />
        </clipPath>
    </defs>
</svg>
