<script>
    export let color;

    let hue = 0; // 0 - 360
    let saturation = 100; // 0 - 100
    let lightness = 50; // 0 - 100

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) =>
            Math.round(
                255 *
                    (l -
                        a *
                            Math.max(
                                -1,
                                Math.min(k(n) - 3, Math.min(9 - k(n), 1)),
                            )),
            );
        return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
    }

    $: hex = hslToHex(hue, saturation, lightness);
    $: color = `hsl(${hue}deg ${saturation}% ${lightness}%)`;

    let hueEl;
    let saturationEl;
    let lightnessEl;

    function getClickWidth(el, event) {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        return x / rect.width;
    }
</script>

<div style="display: flex; padding: 1rem;">
    <div style="display: flex; flex-direction: column; gap: 1rem">
        <!-- Hue/Saturation Picker -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            bind:this={hueEl}
            class="color-box hue-box"
            on:click={(event) => {
                hue = Math.min(360, 360 * getClickWidth(hueEl, event));
            }}
            on:mousemove={(event) => {
                if (event.buttons === 1) {
                    hue = Math.min(360, 360 * getClickWidth(hueEl, event));
                }
            }}
        >
            <div
                class="knob"
                style={`background-color: hwb(${hue}deg 0% 0%); left: ${(hue / 360) * 100}%`}
            ></div>
        </div>

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            bind:this={saturationEl}
            class="color-box"
            style={`
								background: linear-gradient(
										to right,
										hsl(${hue}deg 0%   50%),
										hsl(${hue}deg 10%  50%),
										hsl(${hue}deg 20%  50%),
										hsl(${hue}deg 30%  50%),
										hsl(${hue}deg 40%  50%),
										hsl(${hue}deg 50%  50%),
										hsl(${hue}deg 60%  50%),
										hsl(${hue}deg 70%  50%),
										hsl(${hue}deg 80%  50%),
										hsl(${hue}deg 90%  50%),
										hsl(${hue}deg 100% 50%)
								);
						`}
            on:click={(event) => {
                saturation = Math.min(
                    100,
                    100 * getClickWidth(saturationEl, event),
                );
            }}
            on:mousemove={(event) => {
                if (event.buttons === 1) {
                    saturation = Math.min(
                        100,
                        100 * getClickWidth(saturationEl, event),
                    );
                }
            }}
        >
            <div
                class="knob"
                style={`background-color: hsl(${hue}deg ${saturation}% 50%); left: ${saturation}%`}
            ></div>
        </div>

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            bind:this={lightnessEl}
            class="color-box"
            style={`
								background: linear-gradient(
										to right,
										hsl(${hue}deg ${saturation}% 0%   ),
										hsl(${hue}deg ${saturation}% 10%  ),
										hsl(${hue}deg ${saturation}% 20%  ),
										hsl(${hue}deg ${saturation}% 30%  ),
										hsl(${hue}deg ${saturation}% 40%  ),
										hsl(${hue}deg ${saturation}% 50%  ),
										hsl(${hue}deg ${saturation}% 60%  ),
										hsl(${hue}deg ${saturation}% 70%  ),
										hsl(${hue}deg ${saturation}% 80%  ),
										hsl(${hue}deg ${saturation}% 90%  ),
										hsl(${hue}deg ${saturation}% 100% )
								);
				`}
            on:click={(event) => {
                lightness = Math.min(
                    100,
                    100 * getClickWidth(lightnessEl, event),
                );
            }}
            on:mousemove={(event) => {
                if (event.buttons === 1) {
                    lightness = Math.min(
                        100,
                        100 * getClickWidth(lightnessEl, event),
                    );
                }
            }}
        >
            <div
                class="knob"
                style={`background-color: hsl(${hue}deg ${saturation} ${lightness}%); left: ${lightness}%`}
            ></div>
        </div>
    </div>

    <div
        class="color"
        style={`background: hsl(${hue}deg ${saturation}% ${lightness}%)`}
    ></div>
</div>

<style>
    .knob {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        outline: solid 0.5rem white;
        transform: translateX(-50%);
    }

    .color-box {
        position: relative;
        width: 20rem;
        height: 2rem;
        cursor: crosshair;
        border-radius: 0.5rem;
    }

    .hue-box {
        background: linear-gradient(
            to right,
            hwb(000deg 0% 0%),
            hwb(020deg 0% 0%),
            hwb(040deg 0% 0%),
            hwb(060deg 0% 0%),
            hwb(080deg 0% 0%),
            hwb(100deg 0% 0%),
            hwb(120deg 0% 0%),
            hwb(140deg 0% 0%),
            hwb(160deg 0% 0%),
            hwb(180deg 0% 0%),
            hwb(200deg 0% 0%),
            hwb(220deg 0% 0%),
            hwb(240deg 0% 0%),
            hwb(260deg 0% 0%),
            hwb(280deg 0% 0%),
            hwb(300deg 0% 0%),
            hwb(320deg 0% 0%),
            hwb(340deg 0% 0%),
            hwb(360deg 0% 0%)
        );
    }

    .color {
        width: 20px;
        height: 20px;
    }
</style>
