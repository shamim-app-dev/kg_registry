import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { kindergartens } from "@/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const approvedKindergartens = await db
      .select()
      .from(kindergartens)
      .where(eq(kindergartens.status, "Approved"));

    return NextResponse.json(approvedKindergartens, { status: 200 });
  } catch (error) {
    console.error("Fetch Approved Kindergartens Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching approved kindergartens." },
      { status: 500 }
    );
  }
}
