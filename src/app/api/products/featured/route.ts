// src/app/api/products/featured/route.ts
import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("featured", "==", true)
      .get();

    const products = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name ?? "",
        price: data.price ?? 0,
        images: data.images ?? [],
        slug: data.slug ?? "",
        featured: true,
      };
    });

    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Get featured products error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
