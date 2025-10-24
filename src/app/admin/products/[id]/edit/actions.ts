"use server";

import { generateSeoMetadata } from "@/ai/flows/generate-seo-metadata";
import { z } from "zod";

const formSchema = z.object({
  entityName: z.string(),
  entityDescription: z.string(),
});

type State = {
  success: boolean;
  message: string;
  data?: {
    title: string;
    description: string;
    keywords: string;
  };
};

export async function generateSeoAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    entityName: formData.get("entityName"),
    entityDescription: formData.get("entityDescription"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
    };
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
    return {
      success: false,
      message: "Failed to generate SEO metadata.",
    };
  }
}
