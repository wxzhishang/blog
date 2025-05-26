import { Post } from './post';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  postCount: number;
}

export interface CategoryWithPosts extends Category {
  posts: Post[];
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  id: string;
} 