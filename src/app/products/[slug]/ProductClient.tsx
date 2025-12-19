'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useCart from '@/hooks/use-cart';

interface Props {
  slug: string;
}

export default function ProductClient({ slug }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          setError(res.status === 404 ? 'Product not found' : 'Failed to load product');
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Button onClick={() => (window.location.href = '/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.images?.[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-headline mb-2">{product.name}</h1>
          <p className="text-2xl mb-6">Rs {product.price}</p>

          <p className="text-muted-foreground mb-8">
            {product.description}
          </p>

          <Separator className="my-6" />

          <div className="flex items-center gap-4 mb-6">
            <Button size="icon" variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button size="icon" variant="outline" onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </Button>
          </div>

          <Button onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
      <Skeleton className="aspect-square" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
