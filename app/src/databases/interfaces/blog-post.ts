export type BlogPostMeta = {
  title?: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  body?: string;
  status: 'published' | 'draft';
  postImage?: {
    key: string;
    mimetype: string;
    size: string;
    bucket: string;
  };
  postUrl: string;
  authorId?: string;
  excerpt?: string;
  ogTags?: BlogPostMeta;
  twitter?: BlogPostMeta;
  facebook?: BlogPostMeta;
  publishAt?: Date;
  tags: Array<string>;
}
