import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ──────────────────────────────────────────
   PROMPTS
────────────────────────────────────────── */
const PROMPTS = {
  summary: (text: string) => `
Kamu adalah AI asisten belajar EduMind. Buat ringkasan terstruktur dari teks berikut dalam Bahasa Indonesia.
Output HARUS berupa JSON valid dengan format:
{
  "title": "Judul materi",
  "chapters": [
    { "title": "Nama bab/bagian", "points": ["poin penting 1", "poin penting 2", "poin penting 3"] }
  ],
  "keyTerms": ["istilah kunci 1", "istilah kunci 2"],
  "conclusion": "Kesimpulan singkat materi dalam 2-3 kalimat."
}
Buat 3-6 bab. Setiap bab minimal 3 poin. Jangan tambahkan apapun di luar JSON.

TEKS MATERI:
${text.slice(0, 12000)}
`,

  quiz: (text: string) => `
Kamu adalah AI asisten belajar EduMind. Buat 8 soal kuis pilihan ganda dari teks berikut dalam Bahasa Indonesia.
Output HARUS berupa JSON valid:
{
  "questions": [
    {
      "id": 1,
      "question": "Pertanyaan lengkap?",
      "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
      "correct": 1,
      "explanation": "Penjelasan 2-3 kalimat."
    }
  ]
}
"correct" adalah INDEX (0-3). Buat soal bervariasi. Jangan tambahkan apapun di luar JSON.

TEKS MATERI:
${text.slice(0, 12000)}
`,

  flashcard: (text: string) => `
Kamu adalah AI asisten belajar EduMind. Buat 8 flashcard dari teks berikut dalam Bahasa Indonesia.
Output HARUS berupa JSON valid:
{
  "flashcards": [
    { "id": 1, "front": "Pertanyaan/istilah singkat", "back": "Jawaban/definisi (maks 50 kata)" }
  ]
}
Jangan tambahkan apapun di luar JSON.

TEKS MATERI:
${text.slice(0, 8000)}
`,
};

/* ──────────────────────────────────────────
   PARSE JSON from AI response
────────────────────────────────────────── */
function parseJsonResponse(text: string): unknown {
  // Direct parse
  try { return JSON.parse(text); } catch { /* continue */ }
  // Extract from markdown code block
  const mdMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (mdMatch) try { return JSON.parse(mdMatch[1]); } catch { /* continue */ }
  // Extract first JSON object/array
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) try { return JSON.parse(jsonMatch[0]); } catch { /* continue */ }
  throw new Error("Response AI bukan format JSON valid. Coba generate ulang.");
}

/* ──────────────────────────────────────────
   GEMINI GENERATE
────────────────────────────────────────── */
async function generateWithGemini(apiKey: string, type: string, prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { temperature: 0.5, responseMimeType: "application/json" },
  });

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      const msg = err instanceof Error ? err.message : "";
      const isRateLimit = status === 429 || msg.includes("429");

      if (isRateLimit && attempt < 2) {
        const delay = [3000, 8000][attempt];
        console.log(`[Gemini] Rate limited, retry in ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      if (isRateLimit) {
        throw new Error("Quota Gemini API habis. Tunggu 1-2 menit lalu coba lagi, atau ganti ke provider Groq yang limitnya lebih besar.");
      }
      if (status === 400 || status === 403 || msg.includes("API_KEY_INVALID")) {
        throw new Error("Gemini API Key tidak valid. Periksa kembali di Settings.");
      }
      throw err;
    }
  }
  throw new Error("Gemini gagal setelah beberapa percobaan.");
}

/* ──────────────────────────────────────────
   GROQ GENERATE
────────────────────────────────────────── */
async function generateWithGroq(apiKey: string, prompt: string): Promise<string> {
  const groq = new Groq({ apiKey });
  
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Kamu adalah AI asisten belajar EduMind. Selalu jawab dengan JSON valid yang diminta, tanpa teks tambahan.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      });
      return completion.choices[0]?.message?.content || "";
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      const msg = err instanceof Error ? err.message : "";
      const isRateLimit = status === 429 || msg.includes("429") || msg.toLowerCase().includes("rate limit");

      if (isRateLimit && attempt < 2) {
        const delay = [2000, 5000][attempt];
        console.log(`[Groq] Rate limited, retry in ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      if (isRateLimit) {
        throw new Error("Rate limit Groq tercapai. Tunggu 1 menit lalu coba lagi.");
      }
      if (status === 401 || msg.includes("Invalid API Key") || msg.includes("401")) {
        throw new Error("Groq API Key tidak valid. Dapatkan key gratis di console.groq.com");
      }
      throw err;
    }
  }
  throw new Error("Groq gagal setelah beberapa percobaan.");
}

/* ──────────────────────────────────────────
   ROUTE HANDLER
────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, text, apiKey, provider = "gemini" } = body as {
      type: "summary" | "quiz" | "flashcard";
      text: string;
      apiKey?: string;
      provider?: "gemini" | "groq";
    };

    const key = apiKey || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "API Key belum diset. Klik 'API Key Settings' di sidebar untuk memasukkan key." },
        { status: 401 }
      );
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json({ error: "Teks dokumen terlalu pendek atau tidak terbaca." }, { status: 400 });
    }

    if (!["summary", "quiz", "flashcard"].includes(type)) {
      return NextResponse.json({ error: "Tipe generasi tidak valid." }, { status: 400 });
    }

    const prompt = PROMPTS[type](text);
    let responseText: string;

    if (provider === "groq") {
      responseText = await generateWithGroq(key, prompt);
    } else {
      responseText = await generateWithGemini(key, type, prompt);
    }

    const parsed = parseJsonResponse(responseText);
    return NextResponse.json({ success: true, type, data: parsed });
  } catch (err: unknown) {
    console.error("[API/generate] Error:", err);
    const message = err instanceof Error ? err.message : "Terjadi kesalahan tidak dikenal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
