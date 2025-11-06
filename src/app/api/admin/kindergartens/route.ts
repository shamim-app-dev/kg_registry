import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { kindergartens, registrationStatus } from "@/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    let query = db.select().from(kindergartens).$dynamic();

    if (status && registrationStatus.enumValues.includes(status as any)) {
      query = query.where(eq(kindergartens.status, status as any));
    }

    const allKindergartens = await query;
    return NextResponse.json(allKindergartens, { status: 200 });
  } catch (error) {
    console.error("Fetch Kindergartens Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching kindergartens." },
      { status: 500 }
    );
  }
}
