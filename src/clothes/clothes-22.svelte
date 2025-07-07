<script context="module">
    export const sleeveType = "short";
</script>

<script>
    import { userState } from "../state.svelte.js";
</script>

<svg
    width="100%"
    viewBox="0 0 923 1056"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_4155_18)">
        <path
            d="M447.933 768.59C525.202 722.151 582.047 752.987 613.715 767.693C655.985 810.21 682 868.154 682 932.017C682 1062.48 573.429 1056 439.5 1056C305.571 1056 197 1062.48 197 932.017C197 866.183 224.647 806.638 269.247 763.8C307.484 748.163 369.062 729.002 447.933 768.59Z"
            fill={userState.clothesColor}
        />
        <path
            d="M207.5 862L672.5 865L677 881.5H202.5L207.5 862Z"
            fill={userState.clothesShadow}
        />
        <rect
            x="405"
            y="690"
            width="75"
            height="13"
            fill={userState.clothesColor}
        />
        <circle cx="440" cy="696" r="9" fill={userState.clothesShadow} />
    </g>
    <defs>
        <clipPath id="clip0_4155_18">
            <rect width="923" height="1056" fill="white" />
        </clipPath>
    </defs>
</svg>
