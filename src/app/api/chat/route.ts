import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { systemPrompt } from "./prompt";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Pass messages directly to streamText to avoid TypeScript missing type errors
    const result = streamText({
      model: google("gemini-3.5-flash"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("DETAILED CHAT ERROR:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process chat session" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}