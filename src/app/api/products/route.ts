// src/app/api/products/route.ts
import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snap = await adminDb
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
    
    const products = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return NextResponse.json(products);
  } catch (err: any) {
    console.error("GET products error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      description,
      price,
      category,
      stock = 0,
      images = [],
      seo = {},
      featured = false,
    } = data;

    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, or category" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const docRef = await adminDb.collection("products").add({
      name,
      slug,
      description: description || "",
      price: Number(price),
      category,
      stock: Number(stock),
      images,
      featured,
      seo: {
        title: seo.title || `${name} | Haus of Meem`,
        description:
          seo.description ||
          `Shop ${name} — handmade leather from Haus of Meem.`,
        keywords:
          seo.keywords ||
          `${name}, leather, handmade, Haus of Meem`,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const savedDoc = await docRef.get();
    return NextResponse.json({ id: docRef.id, ...savedDoc.data() });
  } catch (err: any) {
    console.error("POST product error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}