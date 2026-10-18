import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const articles = db.prepare("SELECT * FROM articles ORDER BY display_order ASC").all();
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, year, title, publication, url, read_time, display_order } = body;

    const db = getDb();

    if (id) {
      db.prepare(`
        UPDATE articles
        SET year = ?,
            title = ?,
            publication = ?,
            url = ?,
            read_time = ?,
            display_order = ?
        WHERE id = ?
      `).run(year, title, publication, url, read_time || "5 min read", display_order || 0, id);
    } else {
      db.prepare(`
        INSERT INTO articles (year, title, publication, url, read_time, display_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(year || `${new Date().getFullYear()}`, title, publication, url, read_time || "5 min read", display_order || 0);
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Article saved successfully" });
  } catch (error) {
    console.error("Failed to save article:", error);
    return NextResponse.json({ success: false, error: "Failed to save article" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing article id" }, { status: 400 });
    }

    const db = getDb();
    db.prepare("DELETE FROM articles WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json({ success: false, error: "Failed to delete article" }, { status: 500 });
  }
}
