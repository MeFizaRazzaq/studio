"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Product Image */}
      <div className="relative w-full h-[380px] overflow-hidden">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="bg-primary text-black font-medium rounded-full hover:bg-primary/80 transition"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link href={`/products/${product.slug}`}>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-black transition"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-foreground capitalize mb-1">
          {product.name}
        </h3>
        <p className="text-primary text-base font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
