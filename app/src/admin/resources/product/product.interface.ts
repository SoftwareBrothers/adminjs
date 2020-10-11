export type OgTags = {
  title?: string;
  Description?: string;
  image?: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  description?: string;
  ogTags?: OgTags;
}
