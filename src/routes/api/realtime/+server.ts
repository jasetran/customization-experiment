import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { OPENAI_API_KEY } = process.env;

        if (!OPENAI_API_KEY) {
            return json(
                { error: "OpenAI API key not configured" },
                { status: 500 },
            );
        }

        // Get system prompt from request body
        const body = await request.json().catch(() => ({}));
        const systemPrompt = body.systemPrompt;

        // Create a realtime session with OpenAI API
        const response = await fetch(
            "https://api.openai.com/v1/realtime/sessions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o-realtime-preview-2024-12-17",
                    voice: "verse",
                    instructions: systemPrompt,
                    input_audio_transcription: { model: "whisper-1" },
                }),
            },
        );

        if (!response.ok) {
            const error = await response.text();
            console.error("OpenAI API error:", error);
            return json(
                { error: `OpenAI API error: ${error}` },
                { status: response.status },
            );
        }

        const sessionData = await response.json();
        console.log("Session data from OpenAI:", sessionData);

        // Handle different possible response structures
        const clientSecret =
            sessionData.client_secret?.value || sessionData.client_secret;

        if (!clientSecret) {
            console.error("No client_secret found in response:", sessionData);
            return json(
                { error: "Invalid session response from OpenAI" },
                { status: 500 },
            );
        }

        return json({
            client_secret: clientSecret,
            session_id: sessionData.id,
            expires_at: sessionData.expires_at,
        });
    } catch (error) {
        console.error("Error creating realtime session:", error);
        return json(
            { error: "Failed to create realtime session" },
            { status: 500 },
        );
    }
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};

