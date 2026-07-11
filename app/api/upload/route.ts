import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any)?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    if (fileName.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse")) as any;
      const parseFunc = typeof pdfParse === "function" ? pdfParse : pdfParse.default;
      const data = await parseFunc(buffer);
      extractedText = data.text;
    } else if (
      fileName.endsWith(".txt") ||
      fileName.endsWith(".md") ||
      fileName.endsWith(".csv")
    ) {
      extractedText = buffer.toString("utf-8");
    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload a PDF, TXT, MD, or CSV file." }, { status: 415 });
    }

    // Clean and truncate
    extractedText = extractedText
      .replace(/\\s{3,}/g, "\\n\\n")
      .trim();

    if (!extractedText || extractedText.length < 20) {
      return NextResponse.json(
        { error: "Gagal mengekstrak teks yang cukup dari file." },
        { status: 422 }
      );
    }
    
    // Save to database
    const insertStmt = db.prepare(
      'INSERT INTO documents (userId, fileName, fileSize, textContent) VALUES (?, ?, ?, ?)'
    );
    const info = insertStmt.run(userId, file.name, file.size, extractedText);

    const newDocumentId = info.lastInsertRowid;

    return NextResponse.json({
      success: true,
      documentId: newDocumentId,
      fileName: file.name,
      textLength: extractedText.length,
    });

  } catch (err) {
    console.error("[API/upload] Error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses file. Coba lagi." },
      { status: 500 }
    );
  }
}
