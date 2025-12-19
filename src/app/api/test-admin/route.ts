import { adminDb } from "@/firebase/initAdmin";

export async function GET() {
  try {
    const snap = await adminDb.collection("products").get();
    return Response.json({ count: snap.size });
  } catch (error) {
    console.error("Admin test failed:", error);
    return Response.json({ error: "Admin connection failed" }, { status: 500 });
  }
}
