import type { Metadata } from 'next';
import ProductClient from './ProductClient';
import { adminDb } from '@/firebase/initAdmin';

/* ---------- METADATA ---------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const snapshot = await adminDb
      .collection('products')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return {
        title: ' Product',
      };
    }

    const product = snapshot.docs[0].data();

    return {
      title: ` ${product.name}`,
      description: product.description,
    };
  } catch {
    return {
      title: ' Product',
    };
  }
}

/* ---------- PAGE ---------- */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductClient slug={slug} />;
}
