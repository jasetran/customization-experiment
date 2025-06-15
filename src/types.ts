export type RealtimeItem = {
    id: string;
    content: (
        | { type: "input_text"; text: string | null }
        | { type: "input_audio"; transcript: string | null }
        | { type: "audio"; transcript: string | null }
    )[];
    role: "user" | "assistant";
};
