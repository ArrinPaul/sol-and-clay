
import type { ImagePlaceholder } from './placeholder-images';

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  story: string;
  materials: string;
  imageId: string;
}

export interface Product {
  id: string;
  collectionId: string;
  title: string;
  slug: string;
  price: number;
  rating: number;
  stock: number;
  story: string;
  materials: string;
  dimensions: string;
  images: string[];
}

export interface Maker {
  name: string;
  bio: string;
  image: ImagePlaceholder | undefined;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
}

export interface CollaborationSubmission {
  id: string;
  studioName: string;
  email: string;
  portfolioURL: string;
  pitch: string;
  status: string;
  isSpam: boolean;
  isRelevant: boolean;
  reason: string;
  createdAt: string;
}

    