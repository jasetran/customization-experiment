<script>
    let { scene = $bindable(), condition = $bindable() } = $props();
    import { userState } from "../state.svelte.js";
    import { onMount } from "svelte";

    let isRecording = $state(false);
    let audioUrl = $state("");
    let mediaRecorder;
    let audioChunks = [];
    let stream;
    let countdown = $state(10);
    let countdownInterval;

    async function startRecording() {
        try {
            // request microphone access
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                audioUrl = URL.createObjectURL(audioBlob);

                // stop all tracks to release microphone
                stream.getTracks().forEach((track) => track.stop());

                // clear countdown interval
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }
            };

            mediaRecorder.start();
            isRecording = true;

            // starting countdown for interaction
            startCountdown();

            // auto-stop after 10 seconds TO DO: Kunlei said 8 seconds so maybe change it to 8
            setTimeout(() => {
                if (isRecording) {
                    stopRecording();
                }
            }, 10000);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone. Please check permissions.");
        }
    }

    function startCountdown() {
        countdown = 10;
        countdownInterval = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    function stopRecording() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
        }
    }

    // immediately begin recording when the component starts
    onMount(() => {
        startRecording();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    });
</script>

<div id="char-chat">
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHair.back></userState.charHair.back>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charArms></userState.charArms>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHead></userState.charHead>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charNose></userState.charNose>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charMouth></userState.charMouth>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charEyes></userState.charEyes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charEyebrows></userState.charEyebrows>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charClothes></userState.charClothes>
    </div>
    <div style="display: flex; margin-bottom: -114.4%;">
        <userState.charHair.front></userState.charHair.front>
    </div>
    <div style="display: flex; margin-bottom: -114.4%">
        <userState.charAccessories></userState.charAccessories>
    </div>
</div>

<div class="audio-recorder">
    <div class="controls">
        {#if isRecording}
            <div class="recording-status">
                <span class="pulse">👂 Listening... </span>
                {countdown}s remaining
            </div>
        {:else if audioUrl}
            <div class="complete-status">
                <div class="playback">
                    <audio controls src={audioUrl}></audio>
                </div>
            </div>
        {:else}
            <div class="initializing">🎤 Checking microphone...</div>
        {/if}
    </div>
</div>

<style>
    .audio-recorder {
        position: relative;
        top: 90%;
        left: 5%;
        max-width: 90rem;
        transform: translateY(-50%);
        text-align: center;
    }

    .recording-status,
    .complete-status,
    .initializing {
        background-color: white;
        color: #29458f;
        border-radius: 1rem;
        border-style: solid;
        border-width: 1rem;
        font-weight: bold;
        padding: 1rem 8rem 1rem 8rem;
        font-size: 2.5rem;
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    .playback {
        padding-top: 1rem;
    }

    audio {
        width: 100%;
        margin: 1rem 0;
    }

    #char-chat {
        position: absolute;
        left: 22%;
        top: 15%;
        transform: translateY(-50%);
        width: 60rem;
        height: 30rem;
    }
</style>
