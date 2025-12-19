// src/components/add-product-modal.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AddProductModalProps {
  onAdd: (product: any) => void;
}

export default function AddProductModal({ onAdd }: AddProductModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const categories = ["belts", "wallets", "keychains", "gifts"];

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setStock("");
    setCategory("");
    setFeatured(false);
    setImages([]);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

const generateAI = async () => {
  if (!name || !price) {
    alert("Please enter the product name and price first.");
    return;
  }

  setGenerating(true);
  setUploadProgress("Generating AI description...");

  try {
    const res = await fetch("/api/ai/generate-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price), images: images.map(f => f.name) }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "AI generation failed");
    }

    const data = await res.json();
    setDescription(data.description || "");
  } catch (err: any) {
    console.error("AI generation error:", err);
    alert("Error: " + err.message);
  } finally {
    setGenerating(false);
    setUploadProgress("");
  }
};


  const handleSubmit = async () => {
    if (!name || !price || !category || images.length === 0) {
      alert("Please fill all required fields (name, price, category) and select at least one image.");
      return;
    }

    setLoading(true);
    setUploadProgress("Uploading images...");

    try {
      // Upload images
      const uploadedImages = [];
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        setUploadProgress(`Uploading image ${i + 1} of ${images.length}...`);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Image upload failed");
        }

        const data = await res.json();
        uploadedImages.push({
          url: data.url,
          alt: name,
          hint: `${name} - handcrafted leather product`,
        });
      }

      setUploadProgress("Creating product...");

      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        category,
        featured,
        images: uploadedImages,
        seo: {
          title: `${name} | Haus of Meem`,
          description: description || `Shop ${name} — handmade leather from Haus of Meem.`,
          keywords: `${name}, leather, handmade, Haus of Meem, ${category}`,
        },
      };

      // Use the passed callback to add product
      await onAdd(productData);

      resetForm();
      setOpen(false);
    } catch (err: any) {
      console.error("Error adding product:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input 
              id="name"
              placeholder="e.g., Classic Leather Belt" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              disabled={loading || generating}
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (Rs) *</Label>
              <Input 
                id="price"
                placeholder="e.g., 2500" 
                type="number"
                step="0.01"
                min="0"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading || generating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input 
                id="stock"
                placeholder="e.g., 10" 
                type="number"
                min="0"
                value={stock} 
                onChange={(e) => setStock(e.target.value)}
                disabled={loading || generating}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} disabled={loading || generating}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description with AI Generate */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="flex gap-2 items-center">
              <Textarea 
                id="description"
                placeholder="Describe the product features, materials, and craftsmanship..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                disabled={loading || generating}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={generateAI}
                disabled={loading || generating}
              >
                {generating ? "⏳ Generating..." : "AI Generate"}
              </Button>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product
              </Label>
              <p className="text-sm text-muted-foreground">
                Display this product on the homepage
              </p>
            </div>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
              disabled={loading || generating}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images">Product Images *</Label>
            <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files || []))}
                className="w-full cursor-pointer"
                disabled={loading || generating}
              />
              {images.length > 0 ? (
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {images.length} image(s) selected
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {images.map((file, idx) => (
                      <div key={idx}>• {file.name}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Click to select product images
                </p>
              )}
            </div>
          </div>

          {/* Progress */}
          {(loading || generating) && uploadProgress && (
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium text-primary">{uploadProgress}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={loading || generating}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || generating || !name || !price || !category || images.length === 0}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                {uploadProgress || "Processing..."}
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
