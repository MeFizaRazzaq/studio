"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-10 md:py-10 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline text-center text-primary mb-8">
          Featured Products
        </h2>

        {/* Marquee container */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex space-x-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...products, ...products].map((product, index) => (
              <div key={index} className="flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
