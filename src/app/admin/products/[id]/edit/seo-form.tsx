"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Wand2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSeoAction } from "./actions";
import { toast } from "@/hooks/use-toast";

const initialState = {
  success: false,
  message: "",
  data: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? "Generating..." : "Generate Suggestions"}
    </Button>
  );
}

export function SeoForm({ product }: { product: Product }) {
  const [state, formAction] = useFormState(generateSeoAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.data) {
        toast({
            title: "Success",
            description: state.message,
        });
        const form = formRef.current;
        if(form) {
            (form.elements.namedItem('seoTitle') as HTMLInputElement).value = state.data.title;
            (form.elements.namedItem('seoDescription') as HTMLTextAreaElement).value = state.data.description;
            (form.elements.namedItem('seoKeywords') as HTMLInputElement).value = state.data.keywords;
        }
    } else if (!state.success && state.message) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        });
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>SEO Metadata</CardTitle>
              <CardDescription>
                Generate AI-powered suggestions for your product's SEO.
              </CardDescription>
            </div>
            <SubmitButton />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <input type="hidden" name="entityName" value={product.name} />
          <input type="hidden" name="entityDescription" value={product.description} />
          <div className="grid gap-3">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" type="text" defaultValue={product.seo.title} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea id="seoDescription" name="seoDescription" defaultValue={product.seo.description} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="seoKeywords">SEO Keywords</Label>
            <Input id="seoKeywords" name="seoKeywords" type="text" defaultValue={product.seo.keywords} />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
