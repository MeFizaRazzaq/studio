"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/placeholder-data";
import { motion } from "framer-motion";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isScrolling, setIsScrolling] = useState(true);
  const scrollRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  const productsPerPage = 8;
  const categories = ["all", "belts", "wallets", "keychains", "gifts"];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Category Filter
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category.slug === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Best Sellers
  const bestSellers = products.slice(0, 5);

  // Auto Scroll Animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
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
    return () => cancelAnimationFrame(scrollAnimationRef.current);
  }, [isScrolling, bestSellers]);

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

      {/* ===== NEW ARRIVALS ===== */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex items-center justify-center mb-10">
          <div className="h-[1px] bg-muted/40 flex-grow"></div>
          <span className="px-6 text-muted font-medium tracking-wide">
            New Arrivals
          </span>
          <div className="h-[1px] bg-muted/40 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PAGINATION ===== */}
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
    </div>
  );
}
