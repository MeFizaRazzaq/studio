// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CollectionCard } from "@/components/collection-card";
import { TestimonialsSection } from '@/components/testimonial-section';
import { FeaturedProducts } from '@/components/feature-products';
import type { Product } from '@/lib/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const res = await fetch('/api/products/featured');
        if (res.ok) {
          const data = await res.json();
          setFeaturedProducts(data);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[20vh] md:h-[35vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-primary">
            Haus of Meem
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-primary/90">
            Crafted for the Modern Gentleman. Uncompromising quality, timeless design.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/shop">Explore The Collection</Link>
          </Button>
        </div>
      </section>

      {/* Collections — 3-Column Staggered Layout */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center text-primary mb-14">
            Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:row-span-2">
              <CollectionCard
                title="Wallets"
                slug="wallets"
                image={{ url: "/wallet-pack.png", alt: "Wallets Collection" }}
              />
            </div>

            <div>
              <CollectionCard
                title="Belts"
                slug="belts"
                image={{ url: "/belt-pack.png", alt: "Belts Collection" }}
              />
            </div>
            <div className="md:row-span-2">
              <CollectionCard
                title="Gift Sets"
                slug="gifts"
                image={{ url: "/wallet-pack.png", alt: "Gift Sets Collection" }}
              />
            </div>

            <div>
              <CollectionCard
                title="Keychains"
                slug="keychains"
                image={{ url: "/keychain-pack.png", alt: "Keychains Collection" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 md:py-10 bg-card">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <FeaturedProducts products={featuredProducts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        )}
      </section>

      <section className="py-10 md:py-10 bg-background">
        <TestimonialsSection />
      </section>

      {/* Craftsmanship Section */}
      <section className="py-10 md:py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-60 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                The Art of Leather
              </h2>
              <p className="text-foreground/80">
                At Haus of Meem, we honor the legacy of Pakistani craftsmanship. Each piece is meticulously handcrafted from the finest full-grain leather, sourced from local tanneries.
              </p>
              <p className="text-foreground/80">
                Our artisans blend age-old techniques with modern precision to create products that are not just accessories, but statements of enduring quality and style.
              </p>
              <Button asChild size="sm" className="w-auto px-6 self-start">
                <Link href="/craftsmanship">Discover Our Process</Link>
              </Button>
            </div>

            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/dots.png"
                  alt="Leather Craftsmanship"
                  fill
                  className="object-fill"
                />
              </div>
              <div className="absolute top-1/9 left-2/5 w-2/3 h-2/3 rounded-lg overflow-hidden shadow-lg bg-blue-100">
                <Image
                  src="/art2.png"
                  alt="Detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top- left-1/2 bottom-0 right-0 w-2/2 h-2/4 rounded-lg overflow-hidden shadow-lg bg-beige-100">
                <Image
                  src="/art1.png"
                  alt="Tools"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">
            Join The Haus
          </h2>
          <p className="text-foreground/80 mb-8">
            Stay informed about new collections, exclusive offers, and the world of Haus of Meem.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="text-base"
              aria-label="Email for newsletter"
            />
            <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}