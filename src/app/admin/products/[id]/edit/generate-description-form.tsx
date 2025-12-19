"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { generateDescriptionAction } from "./actions";

type DescriptionActionState = {
  success: boolean;
  message: string;
  data?: {
    description: string;
  };
};

const initialState: DescriptionActionState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit"  disabled={pending}>
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? "Generating..." : "Generate with AI"}
    </Button>
  );
}

export function GenerateDescriptionForm({ product }: { product: any }) {
  const [state, formAction] = useFormState<DescriptionActionState, FormData>(
    generateDescriptionAction,
    initialState
  );

  useEffect(() => {
    if (state.success && state.data?.description) {
      const textarea = document.getElementById("description") as HTMLTextAreaElement;
      if (textarea) textarea.value = state.data.description;

      toast({
        title: "Description Generated",
        description: "AI description added successfully",
      });
    }

    if (!state.success && state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="name" value={product.name ?? ""} />
      <input type="hidden" name="price" value={product.price ?? 0} />
      <input
        type="hidden"
        name="images"
        value={(product.images || []).map((i: any) => i.url).join(",")}
      />

      <SubmitButton />
    </form>
  );
}
