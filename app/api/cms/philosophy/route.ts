import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const philosophy = db.prepare("SELECT * FROM philosophy LIMIT 1").get();
    return NextResponse.json({ success: true, data: philosophy });
  } catch (error) {
    console.error("Failed to fetch philosophy:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch philosophy" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { principle_tag, title, paragraph1, paragraph2, footer_text, copyright } = body;

    const db = getDb();
    const existing = db.prepare("SELECT id FROM philosophy LIMIT 1").get() as { id: number } | undefined;

    if (existing) {
      db.prepare(`
        UPDATE philosophy
        SET principle_tag = ?,
            title = ?,
            paragraph1 = ?,
            paragraph2 = ?,
            footer_text = ?,
            copyright = ?
        WHERE id = ?
      `).run(
        principle_tag || "ENGINEERING PRINCIPLE / 01",
        title,
        paragraph1,
        paragraph2,
        footer_text,
        copyright,
        existing.id
      );
    } else {
      db.prepare(`
        INSERT INTO philosophy (principle_tag, title, paragraph1, paragraph2, footer_text, copyright)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        principle_tag || "ENGINEERING PRINCIPLE / 01",
        title,
        paragraph1,
        paragraph2,
        footer_text,
        copyright
      );
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Philosophy saved successfully" });
  } catch (error) {
    console.error("Failed to save philosophy:", error);
    return NextResponse.json({ success: false, error: "Failed to save philosophy" }, { status: 500 });
  }
}
