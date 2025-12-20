import { notFound } from 'next/navigation';
import { products as allProducts } from '@/lib/data';
import ProductDetailPageClient from './product-detail-page';

// Force dynamic rendering since this page uses Clerk authentication
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

// This page is a Server Component to handle data fetching.
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // We pass the resolved product down to the Client Component.
  return <ProductDetailPageClient product={product} />;
}
