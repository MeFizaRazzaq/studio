import { getProductById } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SeoForm } from "./seo-form";

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-headline text-primary">Edit Product</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" className="w-full" defaultValue={product.name} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" defaultValue={product.description} className="min-h-32" />
                        </div>
                    </CardContent>
                </Card>
                <SeoForm product={product} />
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" defaultValue={product.price} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" defaultValue={product.stock} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Product</Button>
        </div>
    </div>
  );
}
