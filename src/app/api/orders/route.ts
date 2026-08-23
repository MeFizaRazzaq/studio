// src/app/api/orders/route.ts
import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

// ---------------- CREATE ORDER ----------------
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Add created_at and default status
    const orderData = {
      ...data,
      status: "Processing",
      created_at: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("orders").add(orderData);

    return NextResponse.json(
      { success: true, orderId: docRef.id },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /orders error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ---------------- GET ORDERS ----------------
// Optional query param: ?userId=uid123
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    let query = adminDb.collection("orders").orderBy("created_at", "desc");

    if (userId) {
      query = query.where("user_id", "==", userId);
    }

    const snapshot = await query.get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("GET /orders error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ---------------- UPDATE ORDER STATUS ----------------
export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    await adminDb.collection("orders").doc(orderId).update({
      status,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Order status updated" });
  } catch (err: any) {
    console.error("PATCH /orders error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
