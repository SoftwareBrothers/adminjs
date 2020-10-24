export type BlogPostMeta = {
  title?: string;
  description?: string;
}

export type PostImage = {
  key: string;
  mimetype: string;
  size: string;
  bucket: string;
}

export interface BlogPostInterface {
  id: string;
  title: string;
  body?: string;
  status: 'published' | 'draft';
  postImage?: PostImage;
  images: Array<PostImage>;
  postUrl: string;
  authorId?: string;
  excerpt?: string;
  ogTags?: BlogPostMeta;
  twitter?: BlogPostMeta;
  facebook?: BlogPostMeta;
  publishAt?: Date;
  tags: Array<string>;
}
