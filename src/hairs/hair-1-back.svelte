<script>
    import { userState } from "../state.svelte.js";
</script>

<svg
    width="100%"
    viewBox="0 0 923 1056"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_239_1508)">
        <path
            d="M193.436 694.114C105.197 597.264 148.596 543.358 181 447H708.112C754.643 563.146 780.245 641.017 717.106 694.114C760.451 744.27 781.254 751.116 803.052 857.386C824.85 963.656 744 976 708.112 999.146C505 1071.5 402.372 1074.63 209.426 999.146C133.835 961.579 113.45 930.676 117.484 857.386C130.58 795.745 145.085 760.269 193.436 694.114Z"
            fill={userState.hairColor}
            stroke={userState.hairColor}
            stroke-width="5"
        />
    </g>
    <defs>
        <clipPath id="clip0_239_1508">
            <rect width="923" height="1056" fill="white" />
        </clipPath>
    </defs>
</svg>
