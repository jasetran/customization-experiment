<script context="module">
    export const sleeveType = "long";
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
    <g clip-path="url(#clip0_4126_65)">
        <path
            d="M523.125 710.212C615.85 743.396 682 830.182 682 932.018C682 1062.48 573.429 1056 439.5 1056C305.571 1056 197 1062.48 197 932.018C197 830.249 263.062 743.512 355.69 710.278C380.08 750.624 415.74 790.299 438.679 818C463.993 791.658 499.45 751.314 523.125 710.212Z"
            fill={userState.clothesColor}
        />
        <path
            d="M361.5 708L406.767 764L457 819H421.5L337 717.5L361.5 708Z"
            fill={userState.clothesShadow}
        />
        <path
            d="M511.5 706L421 820H456L535 714.5L511.5 706Z"
            fill={userState.clothesShadow}
        />
        <path
            d="M421 818.5V1057H456V818.5H421Z"
            fill={userState.clothesShadow}
        />
        <circle cx="439.5" cy="850.5" r="9.5" fill={userState.clothesColor} />
        <circle cx="438.5" cy="928.5" r="9.5" fill={userState.clothesColor} />
        <circle cx="439.5" cy="1006.5" r="9.5" fill={userState.clothesColor} />
    </g>
    <defs>
        <clipPath id="clip0_4126_65">
            <rect width="923" height="1056" fill="white" />
        </clipPath>
    </defs>
</svg>
