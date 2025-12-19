// src/firebase/initAdmin.ts
import admin from "firebase-admin";

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET; // e.g., "your-project.appspot.com"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket, // initialize Firebase Storage
  });
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage().bucket(); // access storage bucket
export default admin;
