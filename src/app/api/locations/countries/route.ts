import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { countries } from "@/schema";

export async function GET() {
  try {
    const allCountries = await db.select().from(countries);
    return NextResponse.json(allCountries, { status: 200 });
  } catch (error) {
    console.error("Fetch Countries Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching countries." },
      { status: 500 }
    );
  }
}
