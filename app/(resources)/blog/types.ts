import readingTime from "reading-time";

export interface Post {
  title: string;
  slug: string;
  cover: string;
  createdAt: Date | string;
  publishedAt?: Date | string;
  readTime: ReturnType<typeof readingTime>;
  tags?: string[];
  featured?: boolean;
}
