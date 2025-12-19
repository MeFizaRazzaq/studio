import { NextResponse } from "next/server";
import { generateProductDescription } from "@/ai/flows/generate-product-description";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, images } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const result = await generateProductDescription({
      name,
      price: parseFloat(price),
      images: images || [],
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("AI generation error:", err);
    return NextResponse.json({ error: err.message || "AI generation failed" }, { status: 500 });
  }
}
