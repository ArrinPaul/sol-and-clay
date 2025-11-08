
import type { ImagePlaceholder } from "./placeholder-images";

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageId: string;
}

export interface Maker {
  name: string;
  bio: string;
  image: ImagePlaceholder | undefined;
}
