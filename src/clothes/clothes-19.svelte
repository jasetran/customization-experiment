<script context="module">
    export const sleeveType = "none";
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
    <g clip-path="url(#clip0_4126_18)">
        <path
            d="M364.961 707.159C385.043 729.372 414.213 743.35 446.679 743.35C477.305 743.35 504.997 730.91 524.896 710.854C616.691 744.505 682 830.831 682 932.018C682 1062.48 573.429 1056 439.5 1056C305.571 1056 197 1062.48 197 932.018C197 826.885 267.501 737.794 364.961 707.159Z"
            fill="white"
        />
        <path d="M317 728L341 716V796H317V728Z" fill={userState.clothesColor} />
        <path
            d="M545 718.5L567 731V796H545V718.5Z"
            fill={userState.clothesColor}
        />
        <path
            d="M291 802H590.426C590.426 802 601.516 878.64 612.952 921.5C624.388 964.36 655 1021.5 655 1021.5C655 1021.5 632.435 1036.5 600 1048C567.565 1059.5 433.246 1057 433.246 1057C433.246 1057 396.383 1057.59 374 1057C351.617 1056.41 318.615 1054 318.615 1054C318.615 1054 291.422 1050.71 277.068 1046.5C262.713 1042.29 245.031 1034 245.031 1034C245.031 1034 236.55 1028.32 232 1024.5C227.45 1020.68 221 1014 221 1014C221 1014 253.787 962.603 268.057 921.5C282.328 880.397 291 802 291 802Z"
            fill={userState.clothesColor}
        />
        <path
            d="M360 875C360 875 407.703 878.526 438.352 878.549C469.002 878.571 518 875 518 875L502.459 978.423C502.459 978.423 463.542 984 438.352 984C413.163 984 374.246 978.423 374.246 978.423L360 875Z"
            fill={userState.clothesShadow}
        />
        <circle cx="328.5" cy="808.5" r="9.5" fill={userState.clothesShadow} />
        <circle cx="555.5" cy="808.5" r="9.5" fill={userState.clothesShadow} />
        <line
            x1="565.5"
            y1="795"
            x2="565.5"
            y2="803"
            stroke={userState.clothesShadow}
            stroke-width="3"
        />
        <line
            x1="318.5"
            y1="795"
            x2="318.5"
            y2="803"
            stroke={userState.clothesShadow}
            stroke-width="3"
        />
        <line
            x1="339.5"
            y1="795"
            x2="339.5"
            y2="803"
            stroke={userState.clothesShadow}
            stroke-width="3"
        />
        <line
            x1="546.5"
            y1="795"
            x2="546.5"
            y2="803"
            stroke={userState.clothesShadow}
            stroke-width="3"
        />
    </g>
    <defs>
        <clipPath id="clip0_4126_18">
            <rect width="923" height="1056" fill="white" />
        </clipPath>
    </defs>
</svg>
