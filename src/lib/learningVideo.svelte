<script>
    let { scene = $bindable() } = $props();
    console.log("begin video watching");
</script>

<!-- svelte-ignore event_directive_deprecated -->
<div class="video-container">
    <video
        src="/assets/NASA-PBSKIDS-ice-video.mp4"
        autoplay
        playsinline
        on:ended={(scene = scene + 1)}
    >
        <track
            kind="captions"
            src="/assets/NASA-PBSKIDS-ice-video-captions.vtt"
            srclang="en"
            label="English"
            default
        />
        Your browser does not support the video tag.
    </video>
</div>

<style>
    .video-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    video {
        width: 92rem;
        height: 52rem;
        object-fit: contain;
        border-width: 1rem;
        border-style: solid;
        border-color: orange;
    }
</style>
