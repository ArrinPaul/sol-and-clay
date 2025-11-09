
import { notFound } from 'next/navigation';
import { collections, products as allProducts } from '@/lib/data';
import CollectionDetailPage from './collection-detail-page';

type Props = {
  params: { slug: string };
};

export default function CollectionPage({ params }: Props) {
  const { slug } = params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const products = allProducts.filter(
    (p) => p.collectionId === collection.id
  );

  return <CollectionDetailPage collection={collection} products={products} />;
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}
