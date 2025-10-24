import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/placeholder-data';

export const metadata = {
  title: 'Shop | Meem Artisan',
  description: 'Explore our collection of handcrafted leather goods.',
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">Our Collection</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover timeless pieces, handcrafted with passion and precision from the finest leather.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
