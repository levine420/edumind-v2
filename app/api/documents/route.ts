import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/app/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any)?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const stmt = db.prepare('SELECT id, fileName, fileSize, uploadedAt FROM documents WHERE userId = ? ORDER BY uploadedAt DESC');
    const documents = stmt.all(userId);

    return NextResponse.json(documents);
  } catch (error) {
    console.error("[API/documents] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents." },
      { status: 500 }
    );
  }
}
