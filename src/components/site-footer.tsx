import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafted for the Modern Gentleman.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4 font-headline">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="/shop?category=wallets" className="text-sm text-muted-foreground hover:text-primary">Wallets</Link></li>
              <li><Link href="/shop?category=belts" className="text-sm text-muted-foreground hover:text-primary">Belts</Link></li>
              <li><Link href="/shop?category=accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4 font-headline">About</h3>
            <ul className="space-y-2">
              <li><Link href="/craftsmanship" className="text-sm text-muted-foreground hover:text-primary">Our Craft</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4 font-headline">Join The Haus</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receive updates on new collections and exclusive offers.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background"/>
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Meem Artisan. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {/* Add social icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
