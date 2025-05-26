import { User } from './user';
import { Category } from './category';
import { Tag } from './tag';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  categoryId: string;
  category: Category;
  tags: Tag[];
  views: number;
  likes: number;
  commentsCount: number;
  readingTime: number;
  isSticky: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  isPublished?: boolean;
  isSticky?: boolean;
  categoryId: string;
  tagIds?: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
} 