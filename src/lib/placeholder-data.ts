import type { Product, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

const categories: Category[] = [
  { id: '1', name: 'Wallets', slug: 'wallets' },
  { id: '2', name: 'Belts', slug: 'belts' },
  { id: '3', name: 'Keychains', slug: 'keychains' },
  { id: '4', name: 'Accessories', slug: 'accessories' },
];

const products: Product[] = [
  // DARK-THEME PRODUCTS FIRST
  {
    id: 'prod_005',
    name: 'The Legacy Wallet - Olive Leather',
    slug: 'legacy-wallet-olive-leather',
    description:
      'An elegant solution for your keys. Crafted from thick black leather and secured with a durable brass stud and ring. Simple, strong, and sophisticated.',
    price: 2900,
    images: [
      {
        id: 'wallet-4-close',
        url: PlaceHolderImages.find(p => p.id === 'wallet-4-close')?.imageUrl || '',
        alt: 'Green leather wallet closed near a sunlit window (used as product texture reference)',
        hint: 'leather keychain',
      },
    ],
    stock: 100,
    category: categories[2],
    seo: {
      title: 'The Legacy Wallet - Olive Leather | Meem Artisan',
      description:
        'Keep your keys organized with the Legacy Wallet. A simple yet elegant accessory made from high-quality olive leather.',
      keywords: 'olive leather wallet, keychain, premium leather, men\'s accessory',
    },
  },
  {
    id: 'prod_002',
    name: 'The Minimalist Cardholder - Black Leather',
    slug: 'minimalist-cardholder-black-leather',
    description:
      'For the modern man who carries only the essentials. This slim black leather cardholder features three card slots and a central pocket for folded cash.',
    price: 2799,
    images: [
      {
        id: 'card-holder-without-card',
        url: PlaceHolderImages.find(p => p.id === 'card-holder-without-card')?.imageUrl || '',
        alt: 'Sleek black leather card holder without cards',
        hint: 'minimalist card holder',
      },
      {
        id: 'card-holder-with-card',
        url: PlaceHolderImages.find(p => p.id === 'card-holder-with-card')?.imageUrl || '',
        alt: 'Black leather card holder with visible credit cards inside',
        hint: 'leather card holder',
      },
    ],
    stock: 50,
    category: categories[0],
    seo: {
      title: 'The Minimalist Cardholder - Black Leather | Meem Artisan',
      description:
        'Carry your essentials in style with our minimalist black leather cardholder. Sleek, simple, and built to last.',
      keywords: 'black leather cardholder, minimalist wallet, slim wallet, men\'s accessory',
    },
  },
  {
    id: 'prod_001',
    name: 'The Classic Bifold - Tan Brown',
    slug: 'classic-bifold-tan-brown',
    description:
      'A timeless bifold wallet crafted from premium dark brown leather. Features six card slots, a full-length bill compartment, and two hidden pockets.',
    price: 2499,
    images: [
      {
        id: 'wallet-1-open',
        url: PlaceHolderImages.find(p => p.id === 'wallet-1-open')?.imageUrl || '',
        alt: 'Open tan leather wallet showing its compartments',
        hint: 'open leather wallet',
      },
      {
        id: 'wallet-1-close',
        url: PlaceHolderImages.find(p => p.id === 'wallet-1-close')?.imageUrl || '',
        alt: 'Tan leather wallet closed on wooden surface',
        hint: 'leather wallet',
      },
    ],
    stock: 25,
    category: categories[0],
    seo: {
      title: 'The Classic Bifold - Tan Brown | Meem Artisan',
      description:
        'Shop our classic bifold wallet, handcrafted from premium tan brown leather. A statement of elegance and durability.',
      keywords: 'tan brown wallet, classic bifold, leather wallet, men\'s wallet, premium leather',
    },
  },
  {
    id: 'prod_008',
    name: 'The Heritage Wallet - Dark Brown',
    slug: 'heritage-wallet-dark-brown',
    description:
      'A symbol of craftsmanship and tradition, The Heritage Wallet blends modern minimalism with timeless dark brown leather design.',
    price: 1299,
    images: [
      {
        id: 'wallet-1close',
        url: PlaceHolderImages.find(p => p.id === 'wallet-1close')?.imageUrl || '',
        alt: 'Dark brown leather wallet with embossed logo',
        hint: 'dark brown wallet',
      },
      {
        id: 'wallet-2-open',
        url: PlaceHolderImages.find(p => p.id === 'wallet-2-open')?.imageUrl || '',
        alt: 'Light brown leather wallet opened showing inner slots',
        hint: 'bifold leather wallet',
      },
    ],
    stock: 18,
    category: categories[0],
    seo: {
      title: 'The Heritage Wallet - Dark Brown | Meem Artisan',
      description:
        'Experience timeless design with The Heritage Wallet, handcrafted in rich dark brown leather.',
      keywords: 'dark brown wallet, heritage wallet, leather wallet, men\'s accessory, handcrafted',
    },
  },

  // LIGHT / TAN / GREEN THEME PRODUCTS
  {
    id: 'prod_004',
    name: 'The Voyager Wallet - Brown Leather',
    slug: 'voyager-wallet-brown-leather',
    description:
      'Designed for the global traveler, this long brown leather wallet holds your passport, boarding passes, multiple currencies, and cards.',
    price: 1499,
    images: [
      {
        id: 'wallet-3-with-gift-box',
        url: PlaceHolderImages.find(p => p.id === 'wallet-3-with-gift-box')?.imageUrl || '',
        alt: 'Brown leather wallet elegantly presented with a gift box',
        hint: 'gift box wallet',
      },
      {
        id: 'wallet-3close',
        url: PlaceHolderImages.find(p => p.id === 'wallet-3close')?.imageUrl || '',
        alt: 'Rich brown leather wallet beside a wristwatch',
        hint: 'luxury leather wallet',
      },
    ],
    stock: 22,
    category: categories[0],
    seo: {
      title: 'The Voyager Wallet - Brown Leather | Meem Artisan',
      description:
        'Travel with confidence with the Voyager Wallet. A premium brown leather solution for organizing your passport, cards, and documents.',
      keywords: 'brown leather wallet, voyager wallet, travel wallet, passport wallet, men\'s accessory',
    },
  },
  {
    id: 'prod_003',
    name: 'The Executive Belt - Black',
    slug: 'executive-belt-black',
    description:
      'A refined black leather belt designed for formal and business attire. Polished silver buckle adds a touch of sophistication.',
    price: 1199,
    images: [
      {
        id: 'belt1',
        url: PlaceHolderImages.find(p => p.id === 'belt1')?.imageUrl || '',
        alt: 'Premium black leather belt with polished buckle',
        hint: 'leather belt',
      },
    ],
    stock: 30,
    category: categories[1],
    seo: {
      title: 'The Executive Belt - Black | Meem Artisan',
      description:
        'Complete your formal look with The Executive, a premium black leather belt featuring a sleek silver buckle.',
      keywords: 'black leather belt, executive belt, formal belt, men\'s accessory, premium belt',
    },
  },
  {
    id: 'prod_007',
    name: 'Masculine Vibe Wallet - Black',
    slug: 'masculine-vibe-wallet-black',
    description:
      'Intricately woven leather provides a unique texture and a comfortable, adjustable fit. A standout piece for smart-casual looks.',
    price: 1399,
    images: [
      {
        id: 'wallet-5-close',
        url: PlaceHolderImages.find(p => p.id === 'wallet-5-close')?.imageUrl || '',
        alt: 'Black leather wallet beside sunglasses (used as product texture for woven belt)',
        hint: 'woven belt',
      },
    ],
    stock: 15,
    category: categories[1],
    seo: {
      title: 'Masculine Vibe Wallet - Black | Meem Artisan',
      description:
        'Experience style and sophistication with our Masculine Vibe Wallet in black leather.',
      keywords: 'black leather wallet, masculine wallet, stylish wallet, men\'s accessory',
    },
  },
  {
    id: 'prod_006',
    name: 'Minimal Wallet - Beige Leather',
    slug: 'minimal-wallet-beige-leather',
    description:
      'A handcrafted beige leather valet tray to keep your daily essentials organized. Designed to hold wallet, keys, and watch in style.',
    price: 1999,
    images: [
      {
        id: 'heroImage',
        url: PlaceHolderImages.find(p => p.id === 'wallet-6-close')?.imageUrl || '',
        alt: 'Beige leather wallet closed and standing upright (texture reference for tray)',
        hint: 'valet tray',
      },
    ],
    stock: 20,
    category: categories[3],
    seo: {
      title: 'Minimal Wallet - Beige Leather | Meem Artisan',
      description:
        'Keep your essentials organized with the Minimal Wallet in beige leather. Sleek, simple, and functional.',
      keywords: 'beige leather wallet, minimal wallet, valet tray, men\'s accessory',
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
