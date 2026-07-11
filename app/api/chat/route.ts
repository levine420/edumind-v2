import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ──────────────────────────────────────────
   GROQ CHAT
────────────────────────────────────────── */
async function chatWithGroq(
  apiKey: string,
  message: string,
  history: { role: "user" | "model"; parts: string }[],
  documentText: string,
  documentName: string
): Promise<string> {
  const groq = new Groq({ apiKey });

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `Kamu adalah EduMind AI Tutor, asisten belajar yang cerdas dan ramah.
Kamu telah membaca materi berjudul "${documentName}".
Jawab setiap pertanyaan pengguna dalam Bahasa Indonesia berdasarkan materi tersebut.
Gunakan format yang jelas — bullet points atau paragraf pendek untuk memudahkan pemahaman.

RINGKASAN MATERI (untuk konteks):
${documentText ? documentText.slice(0, 6000) : "Tidak ada materi yang diunggah."}`,
    },
    // Convert history
    ...history
      .filter(h => h.role && h.parts)
      .map(h => ({
        role: (h.role === "model" ? "assistant" : "user") as "user" | "assistant",
        content: h.parts,
      })),
    { role: "user" as const, content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });
    return completion.choices[0]?.message?.content || "Maaf, tidak ada respons dari AI.";
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    const msg = err instanceof Error ? err.message : "";
    if (status === 429 || msg.includes("429")) {
      throw new Error("Rate limit Groq tercapai. Tunggu 1 menit lalu coba lagi.");
    }
    if (status === 401 || msg.includes("Invalid API Key")) {
      throw new Error("Groq API Key tidak valid. Dapatkan key gratis di console.groq.com");
    }
    throw err;
  }
}

/* ──────────────────────────────────────────
   GEMINI CHAT
────────────────────────────────────────── */
async function chatWithGemini(
  apiKey: string,
  message: string,
  history: { role: "user" | "model"; parts: string }[],
  documentText: string,
  documentName: string
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `Kamu adalah EduMind AI Tutor, asisten belajar yang cerdas dan ramah.
Kamu telah membaca materi berjudul "${documentName}".
Jawab setiap pertanyaan pengguna dalam Bahasa Indonesia berdasarkan materi tersebut.
Gunakan format yang jelas — bullet points atau paragraf pendek.

RINGKASAN MATERI:
${documentText ? documentText.slice(0, 8000) : "Tidak ada materi yang diunggah."}`,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  });

  const chatHistory: Content[] = history
    .filter(h => h.role && h.parts)
    .map(h => ({ role: h.role, parts: [{ text: h.parts }] }));

  try {
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    const msg = err instanceof Error ? err.message : "";
    if (status === 429 || msg.includes("429")) {
      throw new Error("Quota Gemini API habis. Tunggu 1-2 menit, atau ganti ke Groq di Settings.");
    }
    if (status === 400 || status === 403 || msg.includes("API_KEY_INVALID")) {
      throw new Error("Gemini API Key tidak valid. Periksa kembali di Settings.");
    }
    throw err;
  }
}

/* ──────────────────────────────────────────
   ROUTE HANDLER
────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message, history, documentText, documentName, apiKey, provider = "gemini",
    } = body as {
      message: string;
      history: { role: "user" | "model"; parts: string }[];
      documentText: string;
      documentName: string;
      apiKey?: string;
      provider?: "gemini" | "groq";
    };

    const key = apiKey || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "API Key belum diset. Klik 'API Key Settings' di sidebar." },
        { status: 401 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong." }, { status: 400 });
    }

    let reply: string;
    if (provider === "groq") {
      reply = await chatWithGroq(key, message, history, documentText, documentName);
    } else {
      reply = await chatWithGemini(key, message, history, documentText, documentName);
    }

    return NextResponse.json({ success: true, reply });
  } catch (err: unknown) {
    console.error("[API/chat] Error:", err);
    const message = err instanceof Error ? err.message : "Terjadi kesalahan tidak dikenal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
