export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  tags?: string[];
  category?: string;
  readingTime?: string;
  image?: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  keywords?: string;
  openGraph?: {
    title: string;
    description: string;
    type: string;
  };
}