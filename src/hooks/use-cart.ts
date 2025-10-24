"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';
import { toast } from './use-toast';

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          // Increase quantity if item already exists
          get().updateQuantity(product.id, existingItem.quantity + 1);
        } else {
          // Add new item to cart
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.url || '',
            quantity: 1,
            slug: product.slug,
          };
          set({ items: [...currentItems, newItem] });
        }
        
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
        get()._recalculateTotals();
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
        get()._recalculateTotals();
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
        get()._recalculateTotals();
      },

      clearCart: () => {
        set({ items: [] });
        get()._recalculateTotals();
      },

      _recalculateTotals: () => {
        const items = get().items;
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        set({ totalItems, totalPrice });
      },
    }),
    {
      name: 'meem-artisan-cart',
      storage: createJSONStorage(() => localStorage),
      // Recalculate totals on hydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._recalculateTotals();
        }
      },
    }
  )
);

// We need a wrapper to handle hydration issues with SSR
// See: https://docs.pmnd.rs/zustand/integrations/nextjs
import { useState, useEffect } from 'react';

const useCart = () => {
  const cartState = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return empty state on server
  if (!isClient) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalPrice: 0,
    };
  }

  return cartState;
};


export default useCart;
