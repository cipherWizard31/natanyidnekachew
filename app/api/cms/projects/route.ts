import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM projects ORDER BY display_order ASC").all() as any[];
    const projects = rows.map((p) => ({
      ...p,
      skills: JSON.parse(p.skills || "[]"),
    }));
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, url, description, stars, forks, skills, image_url, image_alt, display_order } = body;

    const db = getDb();
    const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : []);

    if (id) {
      // Update existing project
      db.prepare(`
        UPDATE projects
        SET title = ?,
            url = ?,
            description = ?,
            stars = ?,
            forks = ?,
            skills = ?,
            image_url = COALESCE(?, image_url),
            image_alt = ?,
            display_order = ?
        WHERE id = ?
      `).run(
        title,
        url,
        description,
        stars,
        forks,
        skillsJson,
        image_url,
        image_alt || title,
        display_order || 0,
        id
      );
    } else {
      // Create new project
      db.prepare(`
        INSERT INTO projects (title, url, description, stars, forks, skills, image_url, image_alt, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        title,
        url,
        description,
        stars || "0",
        forks || "0",
        skillsJson,
        image_url || "/uploads/4866c795c48c7e8f3ffd46fe9e20876d.webp",
        image_alt || title,
        display_order || 0
      );
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Project saved successfully" });
  } catch (error) {
    console.error("Failed to save project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save project" },
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
        { success: false, error: "Missing project id" },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare("DELETE FROM projects WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
