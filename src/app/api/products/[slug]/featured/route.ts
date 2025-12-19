// src/app/api/products/[id]/featured/route.ts
import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { featured } = await req.json();

    await adminDb.collection("products").doc(id).update({
      featured: Boolean(featured),
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await adminDb.collection("products").doc(id).get();

    return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err: any) {
    console.error("Toggle featured error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}