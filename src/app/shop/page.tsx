"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/placeholder-data";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "belts", "wallets", "keychains", "accessories"];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category.slug === selectedCategory);


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Our Collection
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover timeless pieces, handcrafted with passion and precision from the finest leather.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-primary text-black"
                : "bg-muted text-muted-foreground hover:bg-primary/70 hover:text-black"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
