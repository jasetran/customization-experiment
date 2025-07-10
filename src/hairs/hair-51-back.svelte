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
        d="M633.843 463.565C622.988 475.617 616.893 495.613 620.23 508.227C623.566 520.841 635.07 521.297 645.925 509.245C656.78 497.193 662.875 477.197 659.539 464.583C656.203 451.969 644.698 451.513 633.843 463.565Z"
        fill="url(#paint0_linear_2155_2)"
    />
    <path
        d="M762.649 611.052C790.926 584.402 794.769 574.517 781.918 542.148C785.037 528.463 782.81 513.942 775.475 500.13C768.139 486.319 755.97 473.735 740.263 463.719C724.557 453.703 705.9 446.629 686.281 443.252C663.293 427.224 614.594 398.81 566.527 501.615C564.885 512.518 566.549 523.849 571.408 534.852C557.456 545.45 548.781 559.253 546.498 574.486C553.955 687.111 602.369 680.109 642.895 669.415C671.61 674.234 700.357 670.793 722.814 659.849C745.271 648.904 759.599 631.352 762.649 611.052Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="4"
        stroke-linejoin="round"
    />
    <path
        d="M702.055 462.336C693.519 476.902 691.177 498.233 696.826 509.981C702.474 521.729 713.973 519.445 722.509 504.879C731.046 490.314 733.387 468.982 727.739 457.234C722.091 445.486 710.592 447.771 702.055 462.336Z"
        fill="url(#paint1_linear_2155_2)"
    />
    <defs>
        <linearGradient
            id="paint0_linear_2155_2"
            x1="620.23"
            y1="508.227"
            x2="667.758"
            y2="495.656"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
        </linearGradient>
        <linearGradient
            id="paint1_linear_2155_2"
            x1="696.826"
            y1="509.981"
            x2="742.533"
            y2="488.006"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
        </linearGradient>
    </defs>
</svg>
