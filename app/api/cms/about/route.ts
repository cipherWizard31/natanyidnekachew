import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const db = getDb();
    const about = db.prepare("SELECT * FROM about LIMIT 1").get();
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error("Failed to load about data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load about data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      paragraph1,
      paragraph2,
      paragraph3,
      runtime_version,
      target_qps,
      consensus,
      p99_latency,
    } = body;

    const db = getDb();

    // Check if about row exists
    const existing = db.prepare("SELECT id FROM about LIMIT 1").get() as { id: number } | undefined;

    if (existing) {
      db.prepare(`
        UPDATE about
        SET paragraph1 = ?,
            paragraph2 = ?,
            paragraph3 = ?,
            runtime_version = ?,
            target_qps = ?,
            consensus = ?,
            p99_latency = ?
        WHERE id = ?
      `).run(
        paragraph1,
        paragraph2,
        paragraph3,
        runtime_version,
        target_qps,
        consensus,
        p99_latency,
        existing.id
      );
    } else {
      db.prepare(`
        INSERT INTO about (paragraph1, paragraph2, paragraph3, runtime_version, target_qps, consensus, p99_latency)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        paragraph1,
        paragraph2,
        paragraph3,
        runtime_version,
        target_qps,
        consensus,
        p99_latency
      );
    }

    revalidatePath("/");
    revalidatePath("/FNYmvVFOtibWurX9D6fYFxjSU4rLTi3g");

    return NextResponse.json({ success: true, message: "About section updated successfully!" });
  } catch (error) {
    console.error("Failed to update about data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update about data" },
      { status: 500 }
    );
  }
}
