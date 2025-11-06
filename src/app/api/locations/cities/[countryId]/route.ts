import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cities } from "@/schema";
import { eq } from "drizzle-orm";

interface Params {
  countryId: string;
}

export async function GET(
  request: Request,
  { params }: { params: Params | Promise<Params> }
) {
  try {
    // In newer Next.js versions, params can be a promise.
    const resolvedParams = await params;
    const countryId = parseInt(resolvedParams.countryId, 10);

    if (isNaN(countryId)) {
      return NextResponse.json({ error: "Invalid country ID" }, { status: 400 });
    }

    const citiesByCountry = await db
      .select()
      .from(cities)
      .where(eq(cities.countryId, countryId));

    return NextResponse.json(citiesByCountry, { status: 200 });
  } catch (error) {
    console.error("Fetch Cities Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching cities." },
      { status: 500 }
    );
  }
}
