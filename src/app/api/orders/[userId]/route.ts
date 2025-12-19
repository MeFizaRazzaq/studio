import { adminDb } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    // params is already available
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const query = adminDb
      .collection("orders")
      .where("user_id", "==", userId)
      .orderBy("created_at", "desc");

    const snapshot = await query.get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("GET /orders/[userId] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
