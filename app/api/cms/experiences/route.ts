import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM experiences ORDER BY display_order ASC").all() as any[];
    const experiences = rows.map((e) => ({
      ...e,
      skills: JSON.parse(e.skills || "[]"),
    }));
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, period, role, company, company_url, tagline, description, skills, display_order } = body;

    const db = getDb();
    const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : []);

    if (id) {
      // Update existing experience
      db.prepare(`
        UPDATE experiences
        SET period = ?,
            role = ?,
            company = ?,
            company_url = ?,
            tagline = ?,
            description = ?,
            skills = ?,
            display_order = ?
        WHERE id = ?
      `).run(
        period,
        role,
        company,
        company_url || "https://github.com/cipherWizard31",
        tagline,
        description,
        skillsJson,
        display_order || 0,
        id
      );
    } else {
      // Insert new experience
      db.prepare(`
        INSERT INTO experiences (period, role, company, company_url, tagline, description, skills, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        period || "2024 — PRESENT",
        role,
        company,
        company_url || "https://github.com/cipherWizard31",
        tagline || "",
        description,
        skillsJson,
        display_order || 0
      );
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Experience saved successfully" });
  } catch (error) {
    console.error("Failed to save experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing experience id" },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare("DELETE FROM experiences WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
