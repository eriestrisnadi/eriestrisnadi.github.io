export interface Post {
  title: string;
  cover: string;
  createdAt: Date | string;
  href: string;
  tags?: string[];
  featured?: boolean;
}
