import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { pricing, durationType } from "@/schema";

const pricingItemSchema = z.object({
  durationType: z.enum(durationType.enumValues),
  price: z.number().int().positive(),
});

const step4Schema = z.object({
  kindergartenId: z.number().int().positive(),
  pricing: z.array(pricingItemSchema).min(1, "At least one pricing option is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = step4Schema.parse(body);

    const { kindergartenId, pricing: pricingData } = validatedData;

    // TODO: In a real app, you should verify that the kindergartenId exists
    // and that the user has permission to add pricing to it.

    const newPricing = await db
      .insert(pricing)
      .values(
        pricingData.map((p) => ({
          kindergartenId,
          ...p,
        }))
      )
      .returning({ id: pricing.id });

    return NextResponse.json(
      {
        message: "Pricing added successfully.",
        pricingIds: newPricing.map((p) => p.id),
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Step 4 API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
