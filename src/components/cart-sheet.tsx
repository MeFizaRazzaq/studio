"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import useCart from '@/hooks/use-cart';
import { X, Minus, Plus } from 'lucide-react';
import type { CartItem } from '@/lib/types';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="pr-6">
          <SheetTitle className='font-headline'>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <CartLineItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="mt-auto pt-6">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">Add some products to get started.</p>
            <SheetTrigger asChild>
                <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}


function CartLineItem({ item }: { item: CartItem }) {
    const { updateQuantity, removeItem } = useCart();
  
    return (
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-md">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <Link href={`/products/${item.slug}`} className="hover:underline font-medium">{item.name}</Link>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
          <div className="mt-2 flex items-center">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
              className="h-6 w-12 text-center border-0 bg-transparent focus-visible:ring-0"
            />
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeItem(item.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
