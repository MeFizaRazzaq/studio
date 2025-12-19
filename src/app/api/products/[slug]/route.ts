// src/app/api/products/[slug]/route.ts
import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

interface Params {
  params: { slug: string };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params; // ✅ important!
    const snapshot = await adminDb
      .collection("products")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (err: any) {
    console.error("GET product by slug error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
