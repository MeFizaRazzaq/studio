"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden bg-transparent cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden rounded-xl relative">

          {/* Product Image */}
          <motion.div
            className="w-full h-auto"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              width={600}
              height={700}
              className="object-cover w-full h-auto rounded-xl
                         group-hover:blur-[3px] group-hover:brightness-75
                         transition-all duration-500"
            />
          </motion.div>

          {/* Hover Info Panel */}
          <motion.div
            className="absolute bottom-0 left-0 right-0
                       p-5 flex flex-col items-start
                       opacity-0 group-hover:opacity-100
                       translate-y-6 group-hover:translate-y-0
                       transition-all duration-500"
          >
            <h3 className="text-lg font-semibold text-white drop-shadow-md truncate">
              {product.name}
            </h3>
            <p className="text-base text-white/90 mt-1">
              ${product.price.toFixed(2)}
            </p>

            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="mt-3 rounded-full bg-white text-black font-medium hover:scale-105 transition"
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
