import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { kindergartens, registrationStatus } from "@/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(registrationStatus.enumValues),
  adminNotes: z.string().optional(),
});

interface Params {
  id: string;
}

export async function PATCH(
  request: Request,
  { params }: { params: Params | Promise<Params> }
) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid kindergarten ID" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateStatusSchema.parse(body);

    const updatedKindergarten = await db
      .update(kindergartens)
      .set({
        status: validatedData.status,
        adminNotes: validatedData.adminNotes,
        updatedAt: new Date(),
      })
      .where(eq(kindergartens.id, id))
      .returning();

    if (updatedKindergarten.length === 0) {
      return NextResponse.json({ error: "Kindergarten not found" }, { status: 404 });
    }

    return NextResponse.json(updatedKindergarten[0], { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Update Kindergarten Status Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
