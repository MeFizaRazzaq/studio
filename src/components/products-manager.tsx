"use client";

import { useState, useEffect } from "react";
import AddProductModal from "@/components/add-product-modal";
import ProductsTable from "./products-table";
import type { Product } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();

    // Refresh data when window gains focus
    const handleFocus = () => {
      fetchData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders")
      ]);
      
      if (!productsRes.ok) throw new Error("Failed to fetch products");
      
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();
      
      console.log("📦 Products data:", productsData);
      console.log("🛒 Orders data:", ordersData);
      console.log("📋 Sample order items:", ordersData.orders?.[0]?.items);
      
      setProducts(productsData);
      setOrders(ordersData.orders || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    await fetchData();
  };

  // Calculate order count and total quantity for each product
  const getProductOrderCount = (productId: string): number => {
    let totalQuantity = 0;
    
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          if (item.product_id  === productId) {
            totalQuantity += item.quantity || 0;
          }
        });
      }
    });
    
    return totalQuantity;
  };

  const handleAddProduct = async (productData: any) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const newProduct = await res.json();
      setProducts((prev) => [newProduct, ...prev]);
      toast({ title: "Product added!", description: `${newProduct.name} added successfully.` });
    } catch (err) {
      console.error("Error adding product:", err);
      toast({ title: "Error", description: "Failed to add product", variant: "destructive" });
    }
  };

  const handleToggleFeatured = async (productId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/products/${productId}/featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update featured status");

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, featured: !currentStatus } : p))
      );
      toast({
        title: "Updated!",
        description: `Product ${!currentStatus ? "marked as featured" : "removed from featured"}.`,
      });
    } catch (err) {
      console.error("Error toggling featured status:", err);
      toast({ title: "Error", description: "Failed to update featured status", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast({ title: "Deleted!", description: "Product deleted successfully." });
    } catch (err) {
      console.error("Error deleting product:", err);
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    }
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/admin/products/${productId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold text-xl mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total: {products.length} products | Featured: {products.filter((p) => p.featured).length}
          </p>
        </div>
        <AddProductModal onAdd={handleAddProduct} />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg">
          <p className="text-muted-foreground text-lg mb-4">No products yet</p>
          <p className="text-sm text-muted-foreground">Add your first product to get started</p>
        </div>
      ) : (
        <ProductsTable
          products={products}
          onToggleFeatured={handleToggleFeatured}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct} // <-- Add this prop for edit navigation
          getProductOrderCount={getProductOrderCount}
        />
      )}
    </div>
  );
}
