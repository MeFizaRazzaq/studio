// src/app/shop/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";


export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolling, setIsScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const productsPerPage = 6;
  const categories = ["all", "belts", "wallets", "keychains", "gifts"];

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch('/api/products');
        
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  // Category Filter
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory || p.category?.slug === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Best Sellers (first 5 products)
  const bestSellers = products.slice(0, 5);

  // Auto Scroll Animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || bestSellers.length === 0) return;
    
    let scroll = 0;
    const speed = 0.6;

    const animate = () => {
      if (isScrolling) {
        scroll += speed;
        if (scroll >= container.scrollWidth / 2) scroll = 0;
        container.scrollLeft = scroll;
      }
      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [isScrolling, bestSellers]);

  // Loading State
  if (loading) {
    return (
      <div className="font-serif bg-background text-muted-foreground">
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">
            Our Leather Collection
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 leading-relaxed mb-8">
            Handcrafted with passion, built to last — explore pieces that embody timeless design and everyday durability.
          </p>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </section>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="font-serif bg-background text-muted-foreground">
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">
            Our Leather Collection
          </h1>
          <div className="py-20">
            <p className="text-red-500 font-semibold text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-black rounded-full hover:bg-primary/90 transition-all"
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  // No Products State
  if (products.length === 0) {
    return (
      <div className="font-serif bg-background text-muted-foreground">
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">
            Our Leather Collection
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 leading-relaxed mb-8">
            Handcrafted with passion, built to last — explore pieces that embody timeless design and everyday durability.
          </p>
          <div className="py-20">
            <p className="text-muted-foreground text-xl">No products available at the moment.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="font-serif bg-background text-muted-foreground">
      {/* ===== HERO / INTRO ===== */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-headline text-primary mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Leather Collection
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground/80 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Handcrafted with passion, built to last — explore pieces that embody timeless design and everyday durability.
        </motion.p>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="flex flex-wrap justify-center gap-3 mb-14 sticky top-20 z-10 bg-background/95 backdrop-blur py-4 border-b border-muted/30">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border
              ${
                selectedCategory === cat
                  ? "bg-primary text-black border-primary shadow-sm"
                  : "border-muted/40 text-muted-foreground hover:bg-primary/60 hover:text-black"
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </section>

      {/* ===== BEST SELLERS ===== */}
      {bestSellers.length > 0 && (
        <section className="bg-card py-14 mb-20 border-y border-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-center text-primary mb-8">
              Best Sellers
            </h2>
            <div
              ref={scrollRef}
              className="flex gap-16 whitespace-nowrap overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsScrolling(false)}
              onMouseLeave={() => setIsScrolling(true)}
            >
              {bestSellers.concat(bestSellers).map((product, idx) => (
                <div key={idx} className="inline-block min-w-[240px] max-h-[420px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== NEW ARRIVALS ===== */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex items-center justify-center mb-10">
          <div className="h-[1px] bg-muted/40 flex-grow"></div>
          <span className="px-6 text-muted font-medium tracking-wide">
            New Arrivals
          </span>
          <div className="h-[1px] bg-muted/40 flex-grow"></div>
        </div>

        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-full h-full min-h-[400px]">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <section className="flex justify-center mb-16 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                currentPage === i + 1
                  ? "bg-primary text-black border-primary font-semibold"
                  : "bg-background border-muted/50 text-muted-foreground hover:bg-primary/50 hover:text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </section>
      )}
    </div>
  );
}