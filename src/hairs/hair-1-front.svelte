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
        d="M418.5 418.988C418.5 418.988 485.308 359.386 496 309.915L497.08 311.409C563.342 403.053 603.567 458.687 713 473C700.627 282.648 625.784 182.022 440.5 172C276.5 184.061 221.665 239.568 180 454.122C188.675 452.803 206.242 464.842 246.5 454.122C323.205 431.95 342.184 378.384 389.5 309.915C383.897 367.663 359.635 395.702 312 463.561C351.714 471.584 418.5 418.988 418.5 418.988Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
    <path
        d="M612.5 694.9C651.789 642.134 685.016 595.021 693.5 460.249L643.357 436.9C658.019 536.326 631.093 598.079 612.5 694.9Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
