"use client";

import { saveProductAction } from "./actions";
import { Button } from "@/components/ui/button";

export function SaveProductForm({ product }: { product: any }) {
  return (
    <form action={saveProductAction} className="flex justify-end gap-2">
      {/* REQUIRED */}
      <input type="hidden" name="id" value={product.id} />

      {/* These fields MUST match input IDs */}
      <input type="hidden" name="name" id="save-name" />
      <input type="hidden" name="description" id="save-description" />
      <input type="hidden" name="price" id="save-price" />
      <input type="hidden" name="stock" id="save-stock" />

      <Button
        type="submit"
        onClick={() => {
          // Copy visible inputs → hidden inputs
          (document.getElementById("save-name") as HTMLInputElement).value =
            (document.getElementById("name") as HTMLInputElement)?.value ?? "";

          (document.getElementById("save-description") as HTMLInputElement).value =
            (document.getElementById("description") as HTMLTextAreaElement)?.value ?? "";

          (document.getElementById("save-price") as HTMLInputElement).value =
            (document.getElementById("price") as HTMLInputElement)?.value ?? "0";

          (document.getElementById("save-stock") as HTMLInputElement).value =
            (document.getElementById("stock") as HTMLInputElement)?.value ?? "0";
        }}
      >
        Save Product
      </Button>
    </form>
  );
}
