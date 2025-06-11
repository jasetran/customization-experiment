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
        d="M674.97 355.804C683.769 430.435 678.022 503.805 671 503.5C670.975 503.423 666.483 490.02 660.5 497C654.511 503.988 649.833 517.451 649.816 517.5C649.816 517.5 645.963 528.425 644.5 532C643.037 535.575 631.715 547.278 629.5 549.5C629.532 549.37 653.172 452.23 638.892 410.283C635.406 400.031 632.064 389.399 627.773 378.639C645.245 372.525 661.142 364.801 674.97 355.804Z"
        fill="url(#paint0_linear_2005_803)"
    />
    <path
        d="M205.105 182.815C206.231 180.81 208.475 179.71 210.765 179.925C442.658 201.633 641.846 160.669 662.503 263.962C679.029 346.606 669.252 345.236 664.57 341.23C663.114 339.984 661.37 338.993 659.454 338.982L232.98 336.435C232.331 336.431 231.69 336.328 231.083 336.099C194.106 322.205 173.369 239.311 205.105 182.815Z"
        fill="url(#paint1_linear_2005_803)"
    />
    <path
        d="M584.748 332.531C584.748 332.531 621.892 320.139 654.338 330.246C686.783 340.353 682.813 358.834 679.5 408.5L601.419 410.359L584.748 332.531Z"
        fill={userState.hairColor}
    />
    <defs>
        <linearGradient
            id="paint0_linear_2005_803"
            x1="649.803"
            y1="356.718"
            x2="665.11"
            y2="537.534"
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
            x1="190.213"
            y1="262.162"
            x2="662.253"
            y2="262.305"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
            <stop offset="1" stop-color={userState.hairColor} />
        </linearGradient>
    </defs>
</svg>
