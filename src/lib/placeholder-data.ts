import type { Product, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

const categories: Category[] = [
  { id: '1', name: 'Wallets', slug: 'wallets' },
  { id: '2', name: 'Belts', slug: 'belts' },
  { id: '3', name: 'Keychains', slug: 'keychains' },
  { id: '4', name: 'Accessories', slug: 'accessories' },
];

const products: Product[] = [
  {
    id: 'prod_001',
    name: 'The Classic Bifold',
    slug: 'classic-bifold-wallet',
    description:
      'A timeless bifold wallet crafted from premium full-grain leather. Features six card slots, a full-length bill compartment, and two hidden pockets. Perfect for the gentleman who values tradition and quality.',
    price: 89.99,
    images: [
        {
            id: 'product-wallet-1',
            url: PlaceHolderImages.find(p => p.id === 'product-wallet-1')?.imageUrl || '',
            alt: 'Classic brown leather bifold wallet',
            hint: 'leather wallet'
        }
    ],
    stock: 25,
    category: categories[0],
    seo: {
      title: 'The Classic Bifold - Premium Leather Wallet | Meem Artisan',
      description: 'Shop our classic bifold wallet, handcrafted from the finest Pakistani leather. A statement of elegance and durability.',
      keywords: 'leather wallet, bifold wallet, men\'s wallet, luxury leather',
    },
  },
  {
    id: 'prod_002',
    name: 'The Minimalist Cardholder',
    slug: 'minimalist-cardholder',
    description:
      'For the modern man who carries only the essentials. This slim cardholder is made from supple black leather and features three card slots and a central pocket for folded cash.',
    price: 49.99,
    images: [
        {
            id: 'product-wallet-2',
            url: PlaceHolderImages.find(p => p.id === 'product-wallet-2')?.imageUrl || '',
            alt: 'Minimalist black leather cardholder',
            hint: 'leather cardholder'
        }
    ],
    stock: 50,
    category: categories[0],
    seo: {
      title: 'The Minimalist Cardholder - Slim & Stylish | Meem Artisan',
      description: 'Carry your essentials in style with our minimalist leather cardholder. Sleek, simple, and built to last.',
      keywords: 'cardholder, slim wallet, leather cardholder, minimalist wallet',
    },
  },
  {
    id: 'prod_003',
    name: 'The Executive Belt',
    slug: 'executive-leather-belt',
    description:
      'A refined black leather belt designed for formal and business attire. The polished silver buckle adds a touch of sophistication, making it a staple for any discerning wardrobe.',
    price: 119.99,
    images: [
        {
            id: 'product-belt-1',
            url: PlaceHolderImages.find(p => p.id === 'product-belt-1')?.imageUrl || '',
            alt: 'Black leather dress belt with silver buckle',
            hint: 'leather belt'
        }
    ],
    stock: 30,
    category: categories[1],
    seo: {
      title: 'The Executive - Black Leather Dress Belt | Meem Artisan',
      description: 'Complete your formal look with The Executive, a premium black leather belt featuring a sleek silver buckle.',
      keywords: 'leather belt, men\'s dress belt, black belt, formal belt',
    },
  },
  {
    id: 'prod_004',
    name: 'The Journeyman Belt',
    slug: 'journeyman-tan-belt',
    description:
      'A versatile and rugged tan leather belt perfect for casual wear. The solid brass buckle develops a unique patina over time, telling the story of your journeys.',
    price: 109.99,
    images: [
        {
            id: 'product-belt-2',
            url: PlaceHolderImages.find(p => p.id === 'product-belt-2')?.imageUrl || '',
            alt: 'Casual tan leather belt with brass buckle',
            hint: 'tan belt'
        }
    ],
    stock: 40,
    category: categories[1],
    seo: {
      title: 'The Journeyman - Casual Tan Leather Belt | Meem Artisan',
      description: 'Our Journeyman belt in tan leather is the perfect companion for your everyday adventures. Durable, stylish, and built to last.',
      keywords: 'casual belt, tan leather belt, men\'s belt, brass buckle',
    },
  },
  {
    id: 'prod_005',
    name: 'The Legacy Keychain',
    slug: 'legacy-leather-keychain',
    description:
      'An elegant solution for your keys. This keychain is crafted from a single piece of thick leather and secured with a durable brass stud and ring. Simple, strong, and sophisticated.',
    price: 29.99,
    images: [
        {
            id: 'product-keychain-1',
            url: PlaceHolderImages.find(p => p.id === 'product-keychain-1')?.imageUrl || '',
            alt: 'Simple leather keychain with brass hardware',
            hint: 'leather keychain'
        }
    ],
    stock: 100,
    category: categories[2],
    seo: {
      title: 'The Legacy Keychain - Premium Leather | Meem Artisan',
      description: 'Keep your keys organized with the Legacy Keychain. A simple yet elegant accessory made from high-quality leather.',
      keywords: 'leather keychain, key fob, men\'s accessories, luxury keychain',
    },
  },
  {
    id: 'prod_006',
    name: 'The Artisan Valet Tray',
    slug: 'artisan-valet-tray',
    description:
      'A handcrafted leather valet tray to keep your daily essentials organized. The perfect addition to your nightstand or entryway, it\'s designed to hold your wallet, keys, and watch in style.',
    price: 79.99,
    images: [
        {
            id: 'product-accessory-1',
            url: PlaceHolderImages.find(p => p.id === 'product-accessory-1')?.imageUrl || '',
            alt: 'Leather valet tray for organizing essentials',
            hint: 'valet tray'
        }
    ],
    stock: 20,
    category: categories[3],
    seo: {
      title: 'The Artisan Valet Tray - Leather Catchall | Meem Artisan',
      description: 'Organize your pocket essentials with the Artisan Valet Tray. A stylish and functional leather catchall for any modern gentleman.',
      keywords: 'valet tray, leather tray, catchall, home accessories',
    },
  },
  {
    id: 'prod_007',
    name: 'The Woven Belt',
    slug: 'woven-leather-belt',
    description:
      'Intricately woven leather provides a unique texture and a comfortable, adjustable fit. A standout piece for smart-casual looks.',
    price: 139.99,
    images: [
        {
            id: 'product-belt-3',
            url: PlaceHolderImages.find(p => p.id === 'product-belt-3')?.imageUrl || '',
            alt: 'Woven brown leather belt',
            hint: 'woven belt'
        }
    ],
    stock: 15,
    category: categories[1],
    seo: {
      title: 'The Woven Belt - Intricate Leather Design | Meem Artisan',
      description: 'Discover the artistry of our Woven Leather Belt. A unique and flexible option for the style-conscious individual.',
      keywords: 'woven belt, braided belt, leather belt, men\'s fashion',
    },
  },
  {
    id: 'prod_008',
    name: 'The Voyager Wallet',
    slug: 'voyager-travel-wallet',
    description:
      'Designed for the global traveler, this long wallet holds your passport, boarding passes, multiple currencies, and cards. Keep your travel documents secure and organized in one elegant package.',
    price: 149.99,
    images: [
        {
            id: 'product-wallet-3',
            url: PlaceHolderImages.find(p => p.id === 'product-wallet-3')?.imageUrl || '',
            alt: 'Long leather travel wallet',
            hint: 'travel wallet'
        }
    ],
    stock: 22,
    category: categories[0],
    seo: {
      title: 'The Voyager - Leather Travel Wallet & Passport Holder | Meem Artisan',
      description: 'Travel with confidence with the Voyager Wallet. A premium leather solution for organizing your passport, cards, and documents.',
      keywords: 'travel wallet, passport holder, leather organizer, men\'s travel',
    },
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return products.find(p => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    return products.find(p => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return categories;
}
