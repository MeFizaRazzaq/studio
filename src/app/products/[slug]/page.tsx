'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import useCart from '@/hooks/use-cart';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const fetchedProduct = await getProductBySlug(params.slug);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (product) {
        // Since useCart handles quantity accumulation, just call addItem repeatedly
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
    }
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover"
            data-ai-hint={product.images[0].hint}
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-headline text-primary mb-2">{product.name}</h1>
          <p className="text-2xl text-foreground/90 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          <Separator className="my-8" />

          <div className="flex items-center gap-4 mb-8">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-10 text-center">{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-full" />
                    <Separator className="my-8" />
                    <Skeleton className="h-12 w-full md:w-1/2" />
                </div>
            </div>
        </div>
    );
}
