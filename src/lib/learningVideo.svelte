<script>
    let { scene = $bindable() } = $props();
    let videoElement;
    let showPlayButton = $state(false);
    let videoStarted = $state(false);

    function handleCanPlay() {
        // try to autoplay, but if it fails, show the play button
        if (videoElement) {
            videoElement.play().catch(() => {
                showPlayButton = true;
            });
        }
    }

    function handlePlay() {
        videoStarted = true;
        showPlayButton = false;
    }

    function startVideo() {
        if (videoElement) {
            videoElement.play();
        }
    }
</script>

<div class="video-container">
    <video
        bind:this={videoElement}
        src="/assets/NASA-PBSKIDS-ice-video.mp4"
        autoplay
        on:canplay={handleCanPlay}
        on:play={handlePlay}
        on:ended={() => (scene = scene + 1)}
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

    {#if showPlayButton && !videoStarted}
        <button class="play-button" on:click={startVideo}>
            ▶ Play Video
        </button>
    {/if}
</div>

<style>
    .video-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        z-index: 10;
    }

    .play-button:hover {
        background: rgba(0, 0, 0, 0.9);
    }
</style>
