<script>
    import { userState } from "./state.svelte.js";
</script>

<svg width="100%" viewBox="0 0 923 1056" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M418.5 421.5C418.5 421.5 485.308 364.67 496 317.5L497.08 318.925C563.342 406.306 603.567 459.353 713 473C700.627 291.502 625.784 195.556 440.5 186C276.5 197.5 221.665 250.426 180 455C188.675 453.742 206.242 465.222 246.5 455C323.205 433.859 342.184 382.785 389.5 317.5C383.897 372.563 359.635 399.297 312 464C351.714 471.65 418.5 421.5 418.5 421.5Z"
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
