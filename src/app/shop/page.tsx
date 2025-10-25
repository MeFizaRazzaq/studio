"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/placeholder-data";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const scrollRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  const categories = ["all", "belts", "wallets", "keychains", "gifts"];

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filtered products
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category.slug === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  // Best Sellers
  const bestSellers = products.slice(0, 5);

  // Horizontal scroll animation for Best Sellers
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = 0;
    const speed = 0.5;

    const loop = () => {
      if (isScrolling) {
        scrollAmount += speed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) scrollAmount = 0;
        scrollContainer.scrollLeft = scrollAmount;
      }
      scrollAnimationRef.current = requestAnimationFrame(loop);
    };
    scrollAnimationRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(scrollAnimationRef.current);
  }, [bestSellers, isScrolling]);

  return (
    <div className="font-serif bg-background text-muted-foreground">
      {/* ===== Page Title Section ===== */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Our Collection
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Discover timeless pieces, handcrafted with passion and precision from the finest leather.
        </p>
      </section>

      {/* ===== Filter Buttons Section ===== */}
      <section className="flex justify-center space-x-4 mb-10 sticky top-20 z-10 bg-background py-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
              selectedCategory === category ? "border-primary bg-primary text-black" : "border-muted/50 bg-muted text-muted-foreground hover:bg-primary/70 hover:text-black"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </section>

      {/* ===== Best Sellers Section ===== */}
      <section className="w-full bg-card py-8 mb-12">
        <div className="container gap-4 mx-auto">
          <h2 className="text-4xl font-headline mb-4 text-primary text-center">Best Sellers</h2>
          <div
            ref={scrollRef}
            className="flex gap-36 whitespace-nowrap overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
          >
            {bestSellers.concat(bestSellers).map((product, idx) => (
              <div key={idx} className="inline-block min-w-[180px] max-h-[420px]">
                <ProductCard className="bg-card h-[200px]"product={product}  />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Divider Section ===== */}
      <section className="flex items-center my-12 container mx-auto px-4">
        <div className="flex-grow border-t border-muted/50 mr-3"></div>
        <span className="font-semibold text-muted">New Arrivals</span>
        <div className="flex-grow border-t border-muted/50 ml-3"></div>
      </section>

      {/* ===== New Arrivals Section ===== */}
      <section className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {currentProducts.map((product, idx) => (
          <div key={product.id}>
            {/* Centered Gift Banner */}
            {currentPage === 1 && idx === Math.floor(currentProducts.length / 2) && (
              <div className="bg-card text-center p-6 rounded-lg mb-6">
                <h3 className="text-xl font-headline mb-2 text-primary">🎁 Gift It Well</h3>
                <p className="text-muted mb-4">
                  Explore personalized leather gifts for your loved ones.
                </p>
                <button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary/20 transition">
                  Explore Gifts
                </button>
              </div>
            )}
            <ProductCard product={product} className="bg-card" />
          </div>
        ))}
      </section>

      {/* ===== Pagination Section ===== */}
      <section className="flex justify-center mt-12 mb-12 space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full border border-muted transition ${
              currentPage === i + 1 ? "bg-card font-semibold" : "bg-background"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </section>
    </div>
  );
}
