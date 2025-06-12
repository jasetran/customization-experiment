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
        d="M678.172 354.351C687.597 429.255 681.266 503.407 672 503.5C671.975 503.423 667.483 490.02 661.5 497C655.511 503.988 650.833 517.451 650.816 517.5C650.816 517.5 646.963 528.425 645.5 532C644.037 535.575 632.715 547.278 630.5 549.5C630.532 549.37 654.172 452.23 639.892 410.283C636.406 400.031 633.064 389.399 628.773 378.639C647.179 372.198 663.839 363.971 678.172 354.351Z"
        fill="url(#paint0_linear_2005_803)"
    />
    <path
        d="M206.105 182.815C207.231 180.81 209.475 179.71 211.765 179.925C443.658 201.633 642.846 160.669 663.503 263.962C680.029 346.606 670.252 345.236 665.57 341.23C664.114 339.984 662.37 338.993 660.454 338.982L233.98 336.435C233.331 336.431 232.69 336.328 232.083 336.099C195.106 322.205 174.369 239.311 206.105 182.815Z"
        fill="url(#paint1_linear_2005_803)"
    />
    <path
        d="M585.748 332.531C585.748 332.531 622.892 320.139 655.338 330.246C687.783 340.353 683.813 358.834 680.5 408.5L602.419 410.359L585.748 332.531Z"
        fill={userState.hairColor}
    />
    <defs>
        <linearGradient
            id="paint0_linear_2005_803"
            x1="651.991"
            y1="355.301"
            x2="667.089"
            y2="537.453"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
            <stop
                offset="1"
                stop-color={userState.hairColor}
                stop-opacity="0"
            />
        </linearGradient>
        <linearGradient
            id="paint1_linear_2005_803"
            x1="191.213"
            y1="262.162"
            x2="663.253"
            y2="262.305"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
            <stop offset="1" stop-color={userState.hairColor} />
        </linearGradient>
    </defs>
</svg>
