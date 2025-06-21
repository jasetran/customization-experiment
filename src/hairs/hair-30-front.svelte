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
        d="M676.735 366.286C685.857 432.13 681.846 493.38 673.991 491.999C673.936 491.993 667.365 491.295 662.851 499.863C657.022 510.915 653.491 519.5 646.991 535C646.526 539.325 644.954 538.925 643.491 542.5C642.027 546.076 634.707 556.777 632.491 559C632.491 559 652.401 464.569 638.111 422.593C634.087 410.759 630.254 398.419 624.934 385.958C644.707 381.243 662.073 374.61 676.735 366.286Z"
        fill="url(#paint0_linear_2072_228)"
    />
    <path
        d="M574.121 299.986C574.121 299.986 611.879 287.431 645.626 299.967C679.374 312.503 681.09 338.354 679.5 394L603.5 394L574.121 299.986Z"
        fill={userState.hairColor}
    />
    <path
        d="M274.446 212.613C363.129 137.635 566.691 162.065 632.191 242.037C689.565 312.086 670.887 336.021 665.368 340.882C664.562 341.592 663.502 341.876 662.428 341.876L238.713 341.86C167.119 341.862 246.229 236.469 274.446 212.613Z"
        fill="url(#paint1_linear_2072_228)"
    />
    <path
        d="M317 368.5C261 321.5 260.739 293.357 299.239 252.857L247 252.856C197 297.856 168.834 379.987 317 368.5Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <path
        d="M197.501 358.999C189.391 320.686 219.677 301.815 274.5 260.5L263 226.5C222.52 256.343 154.905 329.155 197.501 358.999Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <path
        d="M413 370.5C387.5 341.5 364.221 293.444 402.721 252.943L303 268.5C253 313.5 264.835 381.987 413 370.5Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <path
        d="M628.427 367.198C545.926 306.34 530.068 290.691 566.166 248.036L474.126 288.472C426.806 336.283 481.172 387.217 628.427 367.198Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <path
        d="M499 371.5C420.148 305.982 440.221 291.443 478.721 250.943L430.407 264.949C380.407 309.949 350.834 382.987 499 371.5Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <defs>
        <linearGradient
            id="paint0_linear_2072_228"
            x1="651.943"
            y1="367.186"
            x2="677.537"
            y2="448.645"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
            <stop
                offset="1"
                stop-color={userState.hairColor}
                stop-opacity="0.05"
            />
        </linearGradient>
        <linearGradient
            id="paint1_linear_2072_228"
            x1="208.626"
            y1="264.241"
            x2="650.593"
            y2="264.375"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color={userState.hairColor} />
            <stop offset="1" stop-color={userState.hairColor} />
        </linearGradient>
    </defs>
</svg>
