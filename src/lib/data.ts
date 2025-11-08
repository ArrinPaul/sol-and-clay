
import { PlaceHolderImages } from './placeholder-images';
import type {
  Collection,
  Maker,
  Product,
  Testimonial,
  CollaborationSubmission,
} from './types';

export const collections: Collection[] = [
  {
    id: '1',
    title: 'The Checkered Collection',
    slug: 'checkered-collection',
    description:
      'A study in balance and contrast—bringing timeless checks into earthy, tactile design.',
    story:
      'The Checkered Collection transforms a classic visual motif into modern, functional pieces. Each work is hand-built and glazed, preserving subtle variations that make every piece unique.',
    materials: 'Stoneware clay, hand-glazed in warm neutrals and pastels.',
    imageId: 'collection-checkered',
  },
  {
    id: '2',
    title: 'The Wave Collection',
    slug: 'wave-collection',
    description:
      'A collection defined by its organic, flowing edges and serene, oceanic glazes.',
    story:
      'Inspired by the calm rhythm of the sea, the Wave Collection features pieces with fluid, organic edges. The glazes, in shades of soft teal and sandy white, evoke a sense of peace and tranquility.',
    materials: 'Porcelain with a mix of matte and gloss glazes.',
    imageId: 'collection-wave',
  },
  {
    id: '3',
    title: 'The Earthline Collection',
    slug: 'earthline-collection',
    description:
      'Featuring natural, muted glazes that celebrate the colors of the earth.',
    story:
      'Grounded in nature, the Earthline Collection showcases the raw beauty of clay. With minimal glazing and a focus on texture, these pieces connect us to the earth they came from.',
    materials: 'Terracotta and stoneware with matte, textured finishes.',
    imageId: 'collection-earthline',
  },
  {
    id: '4',
    title: 'The Bloom Collection',
    slug: 'bloom-collection',
    description:
      'Inspired by flora and subtle pastel hues, this collection is a celebration of new beginnings.',
    story:
      'Like the first flowers of spring, the Bloom Collection is delicate and hopeful. Soft pastel glazes over fine porcelain create pieces that feel light, airy, and full of life.',
    materials: 'Fine porcelain with soft pastel glazes.',
    imageId: 'collection-bloom',
  },
  {
    id: '5',
    title: 'The Monsoon Collection',
    slug: 'monsoon-collection',
    description:
      'Deep blues and rich grey clays capture the dramatic beauty of a storm.',
    story:
      'This collection is an ode to the power and beauty of the monsoon. Deep, moody blues and textured grey clays mimic the feeling of rain-soaked earth and stormy skies.',
    materials: 'Grey stoneware with reactive blue and charcoal glazes.',
    imageId: 'collection-monsoon',
  },
  {
    id: '6',
    title: 'The Ember Collection',
    slug: 'ember-collection',
    description:
      'Rustic orange-brown glazes and bold, clean lines that evoke warmth and comfort.',
    story:
      'The Ember Collection is inspired by the comforting glow of a fire. Warm, rustic glazes over simple, strong forms create a sense of hearth and home.',
    materials: 'Dark stoneware with iron-rich, warm-toned glazes.',
    imageId: 'collection-ember',
  },
];

export const products: Product[] = [
  // Checkered Collection
  {
    id: 'p1',
    collectionId: '1',
    title: 'Checkered Tray',
    slug: 'checkered-tray',
    price: 75.0,
    rating: 4.8,
    stock: 15,
    story:
      'Inspired by the rhythm of pattern and pause — perfect for table styling or daily ritual spaces.',
    materials: 'Stoneware with matte glaze; food safe.',
    dimensions: '12" L x 6" W x 1" H',
    images: ['product-checkered-tray-1', 'product-checkered-tray-2'],
  },
  {
    id: 'p2',
    collectionId: '1',
    title: 'Checkered Vase',
    slug: 'checkered-vase',
    price: 95.0,
    rating: 4.9,
    stock: 8,
    story:
      'A statement piece that combines classic pattern with a modern, sculptural form.',
    materials: 'Hand-built stoneware with clear interior glaze.',
    dimensions: '10" H x 5" Diameter',
    images: ['product-checkered-vase-1', 'product-checkered-vase-2'],
  },
  // Wave Collection
  {
    id: 'p3',
    collectionId: '2',
    title: 'Wave Serving Bowl',
    slug: 'wave-serving-bowl',
    price: 120.0,
    rating: 4.7,
    stock: 12,
    story:
      'The organic, undulating edge of this bowl mimics the gentle movement of water.',
    materials: 'Porcelain with a soft teal gloss glaze.',
    dimensions: '11" Diameter x 4" H',
    images: ['product-wave-bowl-1', 'product-wave-bowl-2'],
  },
  {
    id: 'p4',
    collectionId: '2',
    title: 'Wavy Edge Plates (Set of 2)',
    slug: 'wavy-edge-plates',
    price: 85.0,
    rating: 4.9,
    stock: 20,
    story:
      'Perfect for serving, these plates bring a touch of coastal calm to any meal.',
    materials: 'Porcelain with a sandy matte white glaze.',
    dimensions: '8" Diameter',
    images: ['product-wave-plates-1', 'product-wave-plates-2'],
  },
  // Earthline Collection
  {
    id: 'p5',
    collectionId: '3',
    title: 'Earthline Planter',
    slug: 'earthline-planter',
    price: 65.0,
    rating: 4.8,
    stock: 25,
    story:
      'A simple, honest home for your favorite plant, celebrating the texture of raw clay.',
    materials: 'Terracotta with a sealed interior, includes drainage hole.',
    dimensions: '6" H x 6" Diameter',
    images: ['product-earthline-planter-1', 'product-earthline-planter-2'],
  },
  {
    id: 'p6',
    collectionId: '3',
    title: 'Textured Mugs (Set of 2)',
    slug: 'textured-mugs',
    price: 70.0,
    rating: 5.0,
    stock: 5,
    story:
      'The perfect mug for your morning ritual, with a satisfying texture that feels great in your hands.',
    materials: 'Stoneware with a thin white glaze on the interior.',
    dimensions: '3.5" H x 3" Diameter',
    images: ['product-earthline-mugs-1', 'product-earthline-mugs-2'],
  },
];

export const getRelatedProducts = (currentProductId: string): Product[] => {
  const currentProduct = products.find((p) => p.id === currentProductId);
  if (!currentProduct) return [];
  return products.filter(
    (p) =>
      p.collectionId === currentProduct.collectionId && p.id !== currentProductId
  );
};

export const makerOfMonth: Maker = {
  name: 'Isabella Chen',
  bio: 'Isabella finds her inspiration in the quiet moments of nature. Her work combines traditional techniques with a modern aesthetic, creating pieces that are both timeless and contemporary. She believes every object in a home should have a story and a soul.',
  image: PlaceHolderImages.find((img) => img.id === 'maker-isabella-chen'),
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'The quality and craftsmanship are outstanding. My vase is a true work of art and the centerpiece of my living room.',
    author: 'Sarah L.',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'I love that each piece has a story. It feels so much more personal than buying from a big-box store. The packaging was also beautiful!',
    author: 'Michael B.',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'These are the most beautiful mugs I have ever owned. They make my morning coffee feel like a special ritual.',
    author: 'Jessica P.',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'Customer service was incredibly helpful when I had a question about my order. A wonderful experience from start to finish.',
    author: 'Emily R.',
    rating: 5,
  },
];

export const collaborationSubmissions: CollaborationSubmission[] = [
  {
    id: 'collab_01',
    studioName: 'Clay & Co.',
    email: 'hello@clayandco.com',
    portfolioURL: 'https://clayandco.com',
    pitch:
      'We create minimalist ceramic ware that would align perfectly with your brand.',
    status: 'Approved',
    isSpam: false,
    isRelevant: true,
    reason:
      "High-quality portfolio with a style that complements Sol & Clay. The pitch is professional and relevant.",
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'collab_02',
    studioName: 'Get Rich Quick Pottery',
    email: 'spam@example.com',
    portfolioURL: 'https://example.com/spam-link',
    pitch: 'Make thousands with our proven system! We have the best pots. Click here.',
    status: 'Rejected (Spam)',
    isSpam: true,
    isRelevant: false,
    reason:
      "The pitch contains classic spam indicators ('Get Rich Quick', urgent language) and the portfolio link appears suspicious.",
    createdAt: '2023-10-26T11:30:00Z',
  },
  {
    id: 'collab_03',
    studioName: 'Colorful Creations',
    email: 'contact@colorful.net',
    portfolioURL: 'https://colorful.net',
    pitch:
      'We make brightly colored, novelty-shaped mugs and vases! Think unicorns and rainbows.',
    status: 'Rejected (Irrelevant)',
    isSpam: false,
    isRelevant: false,
    reason:
      "While the work may be skillful, the aesthetic (bright, novelty) does not align with Sol & Clay's warm, earthy, and modern brand identity.",
    createdAt: '2023-10-25T14:00:00Z',
  },
];

    