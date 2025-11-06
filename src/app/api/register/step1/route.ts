
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { kindergartens } from "@/schema";

const step1Schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  cityId: z.number().int().positive("City is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = step1Schema.parse(body);

    const newKindergarten = await db
      .insert(kindergartens)
      .values({
        ...validatedData,
        // Provide default/empty values for fields required by the schema
        // that are not included in Step 1.
        ageGroups: {},
        capacity: 0,
        operatingHours: {},
        credentials: "",
        certifications: "",
      })
      .returning({ id: kindergartens.id });

    if (newKindergarten.length === 0) {
      return NextResponse.json(
        { error: "Failed to create kindergarten record." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { kindergartenId: newKindergarten[0].id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Step 1 API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
