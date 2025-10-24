import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const craftsmanshipImage = PlaceHolderImages.find(p => p.id === 'craft-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full text-white">
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

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center text-primary mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-headline text-primary mb-6">
                The Art of Leather
              </h2>
              <p className="mb-4 text-foreground/80">
                At Haus of Meem, we honor the legacy of Pakistani craftsmanship. Each piece is meticulously handcrafted from the finest full-grain leather, sourced from local tanneries.
              </p>
              <p className="mb-8 text-foreground/80">
                Our artisans blend age-old techniques with modern precision to create products that are not just accessories, but statements of enduring quality and style.
              </p>
              <Button asChild>
                <Link href="/craftsmanship">Discover Our Process</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
                {craftsmanshipImage && (
                    <Image
                        src={craftsmanshipImage.imageUrl}
                        alt={craftsmanshipImage.description}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                        data-ai-hint={craftsmanshipImage.imageHint}
                    />
                )}
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
