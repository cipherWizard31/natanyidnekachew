import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM certifications ORDER BY display_order ASC").all() as any[];
    const certifications = rows.map((c) => ({
      ...c,
      skills: JSON.parse(c.skills || "[]"),
    }));
    return NextResponse.json({ success: true, data: certifications });
  } catch (error) {
    console.error("Failed to fetch certifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      issuer,
      icon,
      code,
      year,
      date,
      validity,
      track,
      category,
      status,
      verify_url,
      description,
      skills,
      display_order,
    } = body;

    const db = getDb();
    const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : []);

    const existing = db.prepare("SELECT id FROM certifications WHERE id = ?").get(id);

    if (existing) {
      db.prepare(`
        UPDATE certifications
        SET title = ?,
            issuer = ?,
            icon = ?,
            code = ?,
            year = ?,
            date = ?,
            validity = ?,
            track = ?,
            category = ?,
            status = ?,
            verify_url = ?,
            description = ?,
            skills = ?,
            display_order = ?
        WHERE id = ?
      `).run(
        title,
        issuer,
        icon || "verified",
        code,
        year,
        date || year,
        validity || "Lifetime / Verified",
        track || "Engineering",
        category || "Cloud",
        status || "Active & Verified",
        verify_url || "https://linkedin.com",
        description,
        skillsJson,
        display_order || 0,
        id
      );
    } else {
      const newId = id || `cert-${Date.now()}`;
      db.prepare(`
        INSERT INTO certifications (
          id, title, issuer, icon, code, year, date, validity, track, category, status, verify_url, description, skills, display_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newId,
        title,
        issuer,
        icon || "verified",
        code,
        year,
        date || year,
        validity || "Lifetime / Verified",
        track || "Engineering",
        category || "Cloud",
        status || "Active & Verified",
        verify_url || "https://linkedin.com",
        description,
        skillsJson,
        display_order || 0
      );
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Certification saved successfully" });
  } catch (error) {
    console.error("Failed to save certification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save certification" },
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
        { success: false, error: "Missing certification id" },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare("DELETE FROM certifications WHERE id = ?").run(id);

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "Certification deleted successfully" });
  } catch (error) {
    console.error("Failed to delete certification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete certification" },
      { status: 500 }
    );
  }
}
