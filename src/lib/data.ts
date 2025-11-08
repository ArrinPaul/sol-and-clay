
import { PlaceHolderImages } from './placeholder-images';
import type { Collection, Maker } from './types';

export const collections: Collection[] = [
  {
    id: '1',
    title: 'The Checkered Collection',
    slug: 'checkered-collection',
    description: 'A study in balance and contrast—bringing timeless checks into earthy, tactile design.',
    imageId: 'collection-checkered',
  },
  {
    id: '2',
    title: 'The Wave Collection',
    slug: 'wave-collection',
    description: 'A collection defined by its organic, flowing edges and serene glazes.',
    imageId: 'collection-wave',
  },
  {
    id: '3',
    title: 'The Earthline Collection',
    slug: 'earthline-collection',
    description: 'Featuring natural, muted glazes that celebrate the colors of the earth.',
    imageId: 'collection-earthline',
  }
];

export const makerOfMonth: Maker = {
  name: 'Isabella Chen',
  bio: 'Isabella finds her inspiration in the quiet moments of nature. Her work combines traditional techniques with a modern aesthetic, creating pieces that are both timeless and contemporary. She believes every object in a home should have a story and a soul.',
  image: PlaceHolderImages.find((img) => img.id === 'maker-isabella-chen'),
};

export const collaborationSubmissions = [
  {
    id: "collab_01",
    studioName: "Clay & Co.",
    email: "hello@clayandco.com",
    portfolioURL: "https://clayandco.com",
    pitch: "We create minimalist ceramic ware that would align perfectly with your brand.",
    status: "Approved",
    isSpam: false,
    isRelevant: true,
    reason: "High-quality portfolio with a style that complements Sol & Clay. The pitch is professional and relevant.",
    createdAt: "2023-10-26T10:00:00Z",
  },
  {
    id: "collab_02",
    studioName: "Get Rich Quick Pottery",
    email: "spam@example.com",
    portfolioURL: "https://example.com/spam-link",
    pitch: "Make thousands with our proven system! We have the best pots. Click here.",
    status: "Rejected (Spam)",
    isSpam: true,
    isRelevant: false,
    reason: "The pitch contains classic spam indicators ('Get Rich Quick', urgent language) and the portfolio link appears suspicious.",
    createdAt: "2023-10-26T11:30:00Z",
  },
  {
    id: "collab_03",
    studioName: "Colorful Creations",
    email: "contact@colorful.net",
    portfolioURL: "https://colorful.net",
    pitch: "We make brightly colored, novelty-shaped mugs and vases! Think unicorns and rainbows.",
    status: "Rejected (Irrelevant)",
    isSpam: false,
    isRelevant: false,
    reason: "While the work may be skillful, the aesthetic (bright, novelty) does not align with Sol & Clay's warm, earthy, and modern brand identity.",
    createdAt: "2023-10-25T14:00:00Z",
  },
];
