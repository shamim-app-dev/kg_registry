import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { kindergartens } from "@/schema";
import { eq } from "drizzle-orm";

const step3Schema = z.object({
  kindergartenId: z.number().int().positive(),
  credentials: z.string().min(1, "Credentials are required"),
  certifications: z.string().min(1, "Certifications are required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = step3Schema.parse(body);

    const { kindergartenId, ...updateData } = validatedData;

    const updatedKindergarten = await db
      .update(kindergartens)
      .set(updateData)
      .where(eq(kindergartens.id, kindergartenId))
      .returning({ id: kindergartens.id });

    if (updatedKindergarten.length === 0) {
      return NextResponse.json(
        { error: "Kindergarten not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { kindergartenId: updatedKindergarten[0].id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Step 3 API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
