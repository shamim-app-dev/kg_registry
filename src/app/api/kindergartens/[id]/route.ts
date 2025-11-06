import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { kindergartens } from "@/schema";
import { eq } from "drizzle-orm";

interface Params {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Params | Promise<Params> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid kindergarten ID" }, { status: 400 });
    }

    const kindergarten = await db
      .select()
      .from(kindergartens)
      .where(eq(kindergartens.id, id))
      .limit(1);

    if (kindergarten.length === 0) {
      return NextResponse.json({ error: "Kindergarten not found" }, { status: 404 });
    }

    return NextResponse.json(kindergarten[0], { status: 200 });
  } catch (error) {
    console.error("Fetch Kindergarten Details Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
