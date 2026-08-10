import { NextRequest, NextResponse } from "next/server";
import { chatAboutArticle } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chatContext, history, message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const reply = await chatAboutArticle(chatContext, history || [], message);

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred.";
    return NextResponse.json({ error: `Failed to get response: ${message}` }, { status: 500 });
  }
}