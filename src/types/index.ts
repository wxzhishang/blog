export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'author' | 'visitor';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  postCount: number;
}

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

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  postId: string;
  parentId?: string;
  children?: Comment[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  template: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface SearchResult {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  totalUsers: number;
  popularPosts: Post[];
  recentComments: Comment[];
  categoryStats: Array<{
    category: Category;
    count: number;
  }>;
  tagStats: Array<{
    tag: Tag;
    count: number;
  }>;
} 