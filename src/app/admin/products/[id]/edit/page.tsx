import { adminDb } from "@/firebase/initAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SeoForm } from "./seo-form";
import { GenerateDescriptionForm } from "./generate-description-form";
import { saveProductAction } from "./actions";
import { SaveProductForm } from "./save-product-form";


export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const docSnap = await adminDb.collection("products").doc(id).get();

  if (!docSnap.exists) {
    return <div className="p-6 text-red-500">Product not found.</div>;
  }

const rawData = docSnap.data();

const product = {
  id: docSnap.id,
  name: rawData?.name ?? "",
  description: rawData?.description ?? "",
  price: rawData?.price ?? 0,
  stock: rawData?.stock ?? 0,
  images: rawData?.images ?? [],
  seo: rawData?.seo ?? null,
  featured: rawData?.featured ?? false,
  slug: rawData?.slug ?? "",
  category: rawData?.category ?? "",
  createdAt: rawData?.createdAt?.toDate?.()?.toISOString() ?? null,
  updatedAt: rawData?.updatedAt?.toDate?.()?.toISOString() ?? null,
};


  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Edit Product
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
  <CardHeader>
    <CardTitle>Product Details</CardTitle>
  </CardHeader>

  <CardContent className="grid gap-6">
    <div className="grid gap-3">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        defaultValue={product.name ?? ""}
      />
    </div>

    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="description">Description</Label>

        {/* 🔥 AI BUTTON */}
        <GenerateDescriptionForm product={product} />
      </div>

      <Textarea
        id="description"
        defaultValue={product.description ?? ""}
        className="min-h-32"
      />
    </div>
  </CardContent>
</Card>

          {/* SEO FORM */}
          <SeoForm product={product} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  defaultValue={product.price ?? 0}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  defaultValue={product.stock ?? 0}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
  <Button variant="outline" type="button">
    Cancel
  </Button>

  <SaveProductForm product={product} />
</div>

    </div>
  );
}
