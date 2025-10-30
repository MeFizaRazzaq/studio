import { db } from "./initFirebase";
import { collection, getDocs } from "firebase/firestore";

export async function testConnection() {
  const snapshot = await getDocs(collection(db, "products"));
  console.log("Connected! Docs:", snapshot.size);
}
