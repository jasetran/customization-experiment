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
        d="M236.5 901C231.23 804.375 170.289 317.64 304.797 226.63C439.306 135.619 719.001 388.506 719.001 388.506L728.626 713.862C728.626 713.862 728.12 835.555 724.699 876.905C721.277 918.256 699.058 951.069 699.058 951.069L618.728 966.334C618.728 966.334 241.771 997.626 236.5 901Z"
        fill={userState.hairColor}
    />
    <path
        d="M207.901 867.311C177.178 776.172 141.569 478.681 204.5 327.5L236.659 452.237C197.993 567.966 233.021 750.48 207.901 867.311Z"
        fill={userState.hairColor}
        stroke={userState.hairColor}
        stroke-width="5"
    />
</svg>
