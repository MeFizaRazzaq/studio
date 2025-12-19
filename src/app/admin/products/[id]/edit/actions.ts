"use server";

import { adminDb } from "@/firebase/initAdmin";
import { generateSeoMetadata } from "@/ai/flows/generate-seo-metadata";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { z } from "genkit";
import { revalidatePath } from "next/cache";

/* =========================================================
   SAVE PRODUCT ACTION
========================================================= */
const saveProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
});

export async function saveProductAction(formData: FormData) {
  const parsed = saveProductSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
  });

  if (!parsed.success) {
    throw new Error("Invalid product data");
  }

  const { id, name, description, price, stock } = parsed.data;

  await adminDb.collection("products").doc(id).update({
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    updatedAt: new Date(),
  });

  // Refresh UI
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
}

/* =========================================================
   SEO GENERATION ACTION
========================================================= */
const seoFormSchema = z.object({
  entityName: z.string(),
  entityDescription: z.string(),
});

export async function generateSeoAction(prevState: any, formData: FormData) {
  const validatedFields = seoFormSchema.safeParse({
    entityName: formData.get("entityName"),
    entityDescription: formData.get("entityDescription"),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    const seoData = await generateSeoMetadata({
      entityType: "product",
      ...validatedFields.data,
    });

    return {
      success: true,
      message: "SEO metadata generated successfully.",
      data: seoData,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to generate SEO metadata." };
  }
}

/* =========================================================
   PRODUCT DESCRIPTION (AI)
========================================================= */
const descriptionFormSchema = z.object({
  name: z.string(),
  price: z.string(),
  images: z.string().optional(),
});

export async function generateDescriptionAction(prevState: any, formData: FormData) {
  const parsed = descriptionFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    images: formData.get("images"),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid form data" };
  }

  try {
    const imageArray = parsed.data.images
      ? parsed.data.images.split(",")
      : [];

    const descriptionData = await generateProductDescription({
      name: parsed.data.name,
      price: parseFloat(parsed.data.price),
      images: imageArray,
    });

    return {
      success: true,
      message: "Product description generated successfully",
      data: descriptionData,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to generate product description",
    };
  }
}
