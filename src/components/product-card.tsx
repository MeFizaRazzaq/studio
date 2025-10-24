"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="group overflow-hidden relative border-0 shadow-none bg-transparent rounded-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            width={600}
            height={600}
            className="object-cover w-full h-full aspect-square transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={product.images[0].hint}
          />
        </div>
      </Link>
      <CardContent className="p-4 bg-card">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-headline text-primary font-medium truncate">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
            <p className="text-base text-foreground/80">${product.price.toFixed(2)}</p>
            <Button variant="outline" size="sm" onClick={() => addItem(product)}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
