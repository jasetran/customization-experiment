<script>
    import { onMount, onDestroy } from "svelte";

    let { scene = $bindable() } = $props();

    let permissionStatus = $state("pending"); // 'pending', 'requesting', 'granted', 'denied'
    let errorMessage = $state("");
    let mediaStream = $state(null);

    // Preview elements
    let videoElement = $state();
    let audioContext = $state();
    let analyser = $state();
    let microphoneSource = $state();
    let audioLevelArray = $state();
    let animationFrame = $state();
    let audioLevel = $state(0);

    // Generate audio level bars for visualization
    let audioLevelBars = $derived(
        Array.from({ length: 15 }, (_, i) => {
            const threshold = (i + 1) / 15;
            return audioLevel > threshold;
        }),
    );

    onMount(() => {
        requestPermissions();
    });

    onDestroy(() => {
        cleanup();
    });

    // Reactive effect to start preview when conditions are met
    $effect(() => {
        if (mediaStream && videoElement && permissionStatus === "granted") {
            startPreview();
        }
    });

    async function startPreview() {
        try {
            // Setup video preview
            if (videoElement && mediaStream.getVideoTracks().length > 0) {
                videoElement.srcObject = mediaStream;
                await videoElement.play();
            }

            // Setup audio level monitoring
            if (mediaStream.getAudioTracks().length > 0) {
                const AudioContextClass =
                    window.AudioContext || window["webkitAudioContext"];
                audioContext = new AudioContextClass();
                analyser = audioContext.createAnalyser();
                microphoneSource =
                    audioContext.createMediaStreamSource(mediaStream);

                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.3;
                microphoneSource.connect(analyser);

                audioLevelArray = new Uint8Array(analyser.frequencyBinCount);
                updateAudioLevel();
            }
        } catch (err) {
            console.error("Error starting preview:", err);
        }
    }

    function updateAudioLevel() {
        if (!analyser || !audioLevelArray) return;

        analyser.getByteFrequencyData(audioLevelArray);

        let sum = 0;
        for (let i = 0; i < audioLevelArray.length; i++) {
            sum += audioLevelArray[i];
        }
        audioLevel = sum / audioLevelArray.length / 255;

        animationFrame = requestAnimationFrame(updateAudioLevel);
    }

    async function requestPermissions() {
        permissionStatus = "requesting";
        errorMessage = "";

        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: true,
            });

            permissionStatus = "granted";
        } catch (err) {
            permissionStatus = "denied";

            if (err.name === "NotAllowedError") {
                errorMessage =
                    "Permission denied. Please allow access to microphone and camera.";
            } else if (err.name === "NotFoundError") {
                errorMessage = "No microphone or camera found on this device.";
            } else if (err.name === "NotSupportedError") {
                errorMessage = "Your browser does not support media access.";
            } else {
                errorMessage = `Error accessing media devices: ${err.message}`;
            }
        }
    }

    function cleanup() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        if (audioContext) {
            audioContext.close();
        }
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
        }
    }
</script>

<svelte:window on:beforeunload={cleanup} />

<div class="container">
    <div class="content">
        <h2 style="font-size: 2.5rem; margin-bottom: 0rem;">
            This experiment requires a camera and microphone.
        </h2>

        <h2 style="font-size: 1.8rem; margin-top: 0.8rem; font-weight: normal;">
            Please accept the pop-up asking for permission to access your camera
            and microphone.
        </h2>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 32 32"
        >
            <g fill="#000000">
                <path
                    d="M20 9a2 2 0 1 0 0 4a2 2 0 0 0 0-4M9 24a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm2 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2m4-1a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M7 11a2 2 0 1 1 4 0a2 2 0 0 1-4 0"
                />
                <path
                    d="M20 5a6 6 0 0 0-5.5 3.598a6.001 6.001 0 1 0-8.528 7.583A3 3 0 0 0 4 19v1H3v-.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V23h1v5a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-.118a2 2 0 0 0 1.106 1.789l3 1.5A2 2 0 0 0 31 29.382V17.618a2 2 0 0 0-2.894-1.789l-3 1.5A2 2 0 0 0 24 19.12V19c0-1.089-.58-2.042-1.448-2.568A6 6 0 0 0 20 5m-4 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0m13 6.618v11.764l-3-1.5v-8.764zM7 18h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1M9 7a4 4 0 1 1 0 8a4 4 0 0 1 0-8"
                />
            </g>
        </svg>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 32 32"
        >
            <g fill="#000">
                <path
                    d="M15.415 18.53a1.47 1.47 0 1 1-2.94 0a1.47 1.47 0 0 1 2.94 0"
                />
                <path
                    d="M19.36 3.662a2.227 2.227 0 0 0-3.157-.09a2.227 2.227 0 0 0-.124 3.12a7.4 7.4 0 0 0-1 3.164l-.012-.013L1.8 25.394a3.381 3.381 0 0 0 2.579 5.568c.733 0 1.446-.24 2.029-.685l16.299-12.334l-.005-.005a7.4 7.4 0 0 0 3.21-.808l.14.148c.85.901 2.255.94 3.155.092c.906-.842.94-2.26.093-3.158l-.194-.205a7.47 7.47 0 0 0-9.72-10.317zm-4.218 9.175l.492.522a7.5 7.5 0 0 0 3.595 3.817l.494.524L5.199 28.689a1.377 1.377 0 0 1-1.874-2zm1.747-8.538c.5-.471 1.273-.45 1.743.049l9.94 10.55a1.227 1.227 0 0 1-.046 1.74l-.003.003c-.5.472-1.274.45-1.743-.049l-9.94-10.55c-.472-.5-.45-1.273.049-1.743"
                />
            </g>
        </svg>

        {#if permissionStatus === "requesting"}
            <p>Please allow access when prompted by your browser...</p>
        {:else if permissionStatus === "denied"}
            <p style="font-size: 2rem; color: red; margin: 2rem 1rem;">
                <b>Error: {errorMessage}</b> Check your browser settings and refresh
                the page to try again.
            </p>
            <!-- svelte-ignore event_directive_deprecated -->
            <button on:click={() => window.location.reload()}>Try Again</button>
        {:else if permissionStatus === "granted"}
            <div class="preview">
                <div class="video-container">
                    <video bind:this={videoElement} autoplay muted playsinline
                    ></video>
                    <p>Can you see yourself?</p>
                </div>

                <div class="audio-container">
                    <div class="audio-bars">
                        {#each audioLevelBars as isActive}
                            <div class="bar" class:active={isActive}></div>
                        {/each}
                    </div>
                    <p>Can you hear yourself?</p>
                </div>
            </div>
            <!-- svelte-ignore event_directive_deprecated -->
            <button
                on:click={() => {
                    scene++;
                }}>Continue</button
            >
        {/if}
    </div>
</div>

<style>
    .container {
        background: white;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        box-sizing: border-box;
    }

    .content {
        text-align: center;
        max-width: 150rem;
        width: 100%;
    }

    .preview {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
        align-items: center;
    }

    .video-container {
        text-align: center;
    }

    video {
        height: 20rem;
        border: 0.1rem solid #ccc;
        border-radius: 1.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    .audio-container {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .audio-bars {
        display: flex;
        align-items: end;
        gap: 0.4rem;
        height: 16rem;
        margin-bottom: 0.5rem;
        padding: 2rem;
        background: #f8f8f8;
        border-radius: 1.5rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    .bar {
        width: 12px;
        background: #ddd;
        border-radius: 3px;
        transition: background-color 0.1s ease;
    }

    .bar:nth-child(1) {
        height: 2rem;
    }
    .bar:nth-child(2) {
        height: 3rem;
    }
    .bar:nth-child(3) {
        height: 4rem;
    }
    .bar:nth-child(4) {
        height: 5rem;
    }
    .bar:nth-child(5) {
        height: 6rem;
    }
    .bar:nth-child(6) {
        height: 7rem;
    }
    .bar:nth-child(7) {
        height: 8rem;
    }
    .bar:nth-child(8) {
        height: 9rem;
    }
    .bar:nth-child(9) {
        height: 10rem;
    }
    .bar:nth-child(10) {
        height: 11rem;
    }
    .bar:nth-child(11) {
        height: 12rem;
    }
    .bar:nth-child(12) {
        height: 13rem;
    }
    .bar:nth-child(13) {
        height: 14rem;
    }
    .bar:nth-child(14) {
        height: 15rem;
    }
    .bar:nth-child(15) {
        height: 16rem;
    }

    .bar.active {
        background: #23622a;
    }

    button {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        font-size: 2rem;
        padding: 1rem 4rem;
        background-color: rgb(109, 179, 236);
        border-style: solid;
        border-width: 0.4rem;
        border-radius: 0.5rem;
        border-color: rgb(26, 104, 168);
    }

    button:hover {
        background: rgb(26, 104, 168);
    }

    p {
        margin: 2rem 0;
        font-size: 1rem;
    }

    @media (max-width: 900px) {
        .preview {
            flex-direction: column;
            align-items: center;
            gap: 40px;
        }

        video {
            width: 320px;
            height: 240px;
        }

        .audio-bars {
            height: 80px;
        }

        .bar:nth-child(1) {
            height: 2rem;
        }
        .bar:nth-child(2) {
            height: 3rem;
        }
        .bar:nth-child(3) {
            height: 4rem;
        }
        .bar:nth-child(4) {
            height: 5rem;
        }
        .bar:nth-child(5) {
            height: 6rem;
        }
        .bar:nth-child(6) {
            height: 7rem;
        }
        .bar:nth-child(7) {
            height: 8rem;
        }
        .bar:nth-child(8) {
            height: 9rem;
        }
        .bar:nth-child(9) {
            height: 10rem;
        }
        .bar:nth-child(10) {
            height: 11rem;
        }
        .bar:nth-child(11) {
            height: 12rem;
        }
        .bar:nth-child(12) {
            height: 13rem;
        }
        .bar:nth-child(13) {
            height: 14rem;
        }
        .bar:nth-child(14) {
            height: 15rem;
        }
        .bar:nth-child(15) {
            height: 16rem;
        }
    }

    @media (max-width: 600px) {
        video {
            width: 280px;
            height: 210px;
        }

        .content {
            padding: 0 10px;
        }
    }
</style>
