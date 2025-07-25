<script lang="ts">
    import { onMount } from "svelte";

    const { isVisible = false, onUploadComplete = () => {} } = $props();

    let dots = $state("");
    let animationInterval: NodeJS.Timeout;

    // animate loading dots
    onMount(() => {
        animationInterval = setInterval(() => {
            dots = dots.length >= 3 ? "" : dots + ".";
        }, 500);

        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        };
    });
</script>

{#if isVisible}
    <div class="upload-overlay">
        <div class="upload-container">
            <div class="upload-icon">
                <div class="cloud-icon">☁️</div>
            </div>

            <h1 class="upload-title">
                Uploading Your Data<span class="loading-dots">{dots}</span>
            </h1>

            <p class="upload-message">
                Please don't close this window while we save your conversation.
                This may take a few minutes.
            </p>

            <div class="spinner-container">
                <div class="spinner"></div>
            </div>
        </div>
    </div>
{/if}

<style>
    .upload-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 2rem;
    }

    .upload-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 2rem;
        padding: 4rem;
        text-align: center;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .upload-icon {
        position: relative;
        margin-bottom: 2rem;
        display: inline-block;
    }

    .cloud-icon {
        font-size: 4rem;
        animation: float 3s ease-in-out infinite;
    }

    .upload-arrow {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: bounce 2s ease-in-out infinite;
    }

    .upload-title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1e293b;
        margin-bottom: 1rem;
    }

    .loading-dots {
        display: inline-block;
        min-width: 2rem;
        text-align: left;
    }

    .upload-message {
        font-size: 1.2rem;
        color: #64748b;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .progress-container {
        margin-bottom: 2rem;
    }

    .progress-bar {
        width: 100%;
        height: 12px;
        background: #e2e8f0;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
        border-radius: 6px;
        transition: width 0.3s ease;
        position: relative;
    }

    .progress-fill::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
        );
        animation: shimmer 2s infinite;
    }

    .progress-text {
        font-size: 1rem;
        font-weight: 600;
        color: #475569;
    }

    .time-remaining {
        font-size: 1rem;
        color: #64748b;
        margin-bottom: 2rem;
        font-style: italic;
    }

    .upload-tips {
        background: #f8fafc;
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 2rem;
        border-left: 4px solid #22c55e;
    }

    .upload-tips h3 {
        font-size: 1.1rem;
        font-weight: bold;
        color: #1e293b;
        margin-bottom: 1rem;
    }

    .upload-tips ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .upload-tips li {
        font-size: 0.95rem;
        color: #475569;
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
    }

    .upload-tips li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #22c55e;
        font-weight: bold;
    }

    .spinner-container {
        margin-top: 3rem;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #e2e8f0;
        border-top: 5px solid #22c55e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translate(-50%, -50%) translateY(0px);
        }
        50% {
            transform: translate(-50%, -50%) translateY(-5px);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .upload-container {
            padding: 2rem;
            margin: 1rem;
        }

        .upload-title {
            font-size: 2rem;
        }

        .upload-message {
            font-size: 1.1rem;
        }

        .cloud-icon {
            font-size: 3rem;
        }

        .upload-arrow {
            font-size: 1.5rem;
        }
    }
</style>
