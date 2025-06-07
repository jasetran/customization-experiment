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
        d="M431.208 174.362C562.885 173.912 706.982 287.781 682.977 382.3C682.977 418.629 660.389 437.955 626.091 448H545.68L532.996 362.874L520.313 448H324.761L310.77 362.141L296.779 448H193.708C182.834 434.915 179.568 414.208 187.051 382.3C169.349 287.808 301.472 173.842 431.208 174.362Z"
        fill={userState.hairColor}
    />
    <path
        d="M601.6 720.264C651.125 662.354 715.181 522.576 683.515 358.5L619.567 378.361C640.138 501.596 641.006 606.887 601.6 720.264Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
