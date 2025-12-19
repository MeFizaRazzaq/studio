import { NextResponse } from "next/server";
import { adminDb } from "@/firebase/initAdmin";

export async function GET() {
  try {
    const snapshot = await adminDb.collection("users").orderBy("createdAt", "desc").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    console.error("GET /api/users error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
