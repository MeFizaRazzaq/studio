"use client";

import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductsTableProps {
  products: Product[];
  onToggleFeatured: (productId: string, currentStatus: boolean) => void;
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
  getProductOrderCount: (productId: string) => number;
}

export default function ProductsTable({ 
  products, 
  onToggleFeatured,
  onDelete,
  onEdit,
  getProductOrderCount
}: ProductsTableProps) {
  // Helper function to safely get category as string
  const getCategoryName = (category: any): string => {
    if (typeof category === 'string') return category;
    if (category && typeof category === 'object' && category.name) return category.name;
    return 'Unknown';
  };

  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                {/* PRODUCT INFO */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 relative rounded overflow-hidden">
                      <Image
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.slug}</div>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  Rs {product.price?.toFixed(2) || '0.00'}
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground capitalize">
                  {getCategoryName(product.category)}
                </td>

                {/* STOCK */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    (product.stock || 0) > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {(product.stock || 0) > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </td>

                {/* ORDER COUNT */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {getProductOrderCount(product.id)}
                  </span>
                </td>

                {/* FEATURED SWITCH */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <Switch
                    checked={product.featured || false}
                    onCheckedChange={() => onToggleFeatured(product.id, product.featured || false)}
                  />
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    {/* EDIT BUTTON */}
                      <Button variant="ghost" size="sm"
                      onClick={() => onEdit(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                    {/* DELETE BUTTON */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
