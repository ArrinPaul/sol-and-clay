
import { notFound } from 'next/navigation';
import { products as allProducts } from '@/lib/data';
import ProductDetailPageClient from './product-detail-page';

type Props = {
  params: { slug: string };
};

// This page is a Server Component to handle data fetching and static generation.
export default function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // We pass the resolved product down to the Client Component.
  return <ProductDetailPageClient product={product} />;
}

// generateStaticParams can only be used in Server Components.
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}
