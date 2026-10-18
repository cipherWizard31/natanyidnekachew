import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM skill_categories ORDER BY display_order ASC").all() as any[];
    const skills = rows.map((s) => ({
      ...s,
      skills: JSON.parse(s.skills || "[]"),
    }));
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, skills, display_order } = body;

    const db = getDb();
    const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : []);

    if (id) {
      db.prepare(`
        UPDATE skill_categories
        SET title = ?,
            skills = ?,
            display_order = ?
        WHERE id = ?
      `).run(title, skillsJson, display_order || 0, id);
    } else {
      db.prepare(`
        INSERT INTO skill_categories (title, skills, display_order)
        VALUES (?, ?, ?)
      `).run(title, skillsJson, display_order || 0);
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Skill category saved successfully" });
  } catch (error) {
    console.error("Failed to save skill category:", error);
    return NextResponse.json({ success: false, error: "Failed to save skill category" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing skill category id" }, { status: 400 });
    }

    const db = getDb();
    db.prepare("DELETE FROM skill_categories WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Skill category deleted" });
  } catch (error) {
    console.error("Failed to delete skill category:", error);
    return NextResponse.json({ success: false, error: "Failed to delete skill category" }, { status: 500 });
  }
}
