import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

// GET /api/cms/testimonials
// Returns all testimonials (with optional ?status=all|pending|approved|rejected)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const db = getDb();
    let query = "SELECT * FROM testimonials ORDER BY created_at DESC, id DESC";
    const params: any[] = [];

    if (statusFilter && statusFilter !== "all") {
      query = "SELECT * FROM testimonials WHERE status = ? ORDER BY created_at DESC, id DESC";
      params.push(statusFilter);
    }

    const rows = db.prepare(query).all(...params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/cms/testimonials
// Handles public submissions (defaulting to 'pending') or admin updates (status approve/reject, edit, order)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      role,
      company,
      avatar_url,
      relationship,
      content,
      rating,
      status,
      display_order,
    } = body;

    const db = getDb();

    // If ID is provided, this is an admin update from CMS Studio
    if (id) {
      db.prepare(`
        UPDATE testimonials
        SET name = ?,
            role = ?,
            company = ?,
            avatar_url = ?,
            relationship = ?,
            content = ?,
            rating = ?,
            status = ?,
            display_order = ?
        WHERE id = ?
      `).run(
        name,
        role,
        company || "",
        avatar_url || "",
        relationship || "",
        content,
        rating ?? 5,
        status || "pending",
        display_order ?? 0,
        id
      );

      revalidatePath("/");
      revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

      return NextResponse.json({
        success: true,
        message: "Testimonial updated successfully",
      });
    }

    // Otherwise, this is a new submission
    if (!name || !role || !content) {
      return NextResponse.json(
        { success: false, error: "Name, role, and testimonial content are required." },
        { status: 400 }
      );
    }

    const result = db.prepare(`
      INSERT INTO testimonials (
        name,
        role,
        company,
        avatar_url,
        relationship,
        content,
        rating,
        status,
        display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      role,
      company || "",
      avatar_url || "",
      relationship || "",
      content,
      rating ?? 5,
      status || "pending",
      display_order ?? 0
    );

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid,
      message: "Testimonial submitted successfully and sent for review!",
    });
  } catch (error) {
    console.error("Failed to process testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process testimonial" },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/testimonials?id=...
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
