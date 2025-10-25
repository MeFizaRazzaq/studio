"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden cursor-pointer w-[300px] h-[450px] bg-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link href={`/products/${product.slug}`}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            width={300}
            height={450}
            className="object-cover w-full h-full rounded-xl transition-transform duration-500"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
