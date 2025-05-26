import { create } from 'zustand';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/category';
import { Post } from '@/types/post';
import { useBlogStore } from '.';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // Async Actions
  fetchCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => Promise<Category | null>;
  getPostsByCategory: (categoryId: string) => Promise<Post[]>;
  createCategory: (input: CreateCategoryInput) => Promise<Category>;
  updateCategoryById: (input: UpdateCategoryInput) => Promise<Category>;
  deleteCategoryById: (id: string) => Promise<void>;
}

// 模拟数据
const mockCategories: Category[] = [
  {
    id: '1',
    name: '技术',
    slug: 'technology',
    description: '最新技术动态和编程教程',
    postCount: 42
  },
  {
    id: '2',
    name: '生活',
    slug: 'lifestyle',
    description: '日常生活感悟和经验分享',
    postCount: 28
  }
];

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  addCategory: (category) => set((state) => ({ 
    categories: [...state.categories, category] 
  })),
  updateCategory: (category) => set((state) => ({
    categories: state.categories.map((c) => 
      c.id === category.id ? category : c
    )
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((c) => c.id !== id)
  })),

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ categories: mockCategories });
    } catch (error) {
      set({ error: '获取分类列表失败' });
    } finally {
      set({ isLoading: false });
    }
  },

  getCategoryBySlug: async (slug) => {
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const category = mockCategories.find((c) => c.slug === slug);
      return category || null;
    } catch (error) {
      set({ error: '获取分类详情失败' });
      return null;
    }
  },

  getPostsByCategory: async (categoryId) => {
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 返回空数组，实际实现应该从API获取数据
      return [];
    } catch (error) {
      set({ error: '获取分类文章失败' });
      return [];
    }
  },

  createCategory: async (input) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newCategory: Category = {
        id: Date.now().toString(),
        postCount: 0,
        ...input
      };
      get().addCategory(newCategory);
      return newCategory;
    } catch (error) {
      set({ error: '创建分类失败' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategoryById: async (input) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const category = get().categories.find((c) => c.id === input.id);
      if (!category) throw new Error('分类不存在');
      
      const updatedCategory: Category = {
        ...category,
        ...input
      };
      get().updateCategory(updatedCategory);
      return updatedCategory;
    } catch (error) {
      set({ error: '更新分类失败' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategoryById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      get().deleteCategory(id);
    } catch (error) {
      set({ error: '删除分类失败' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
})); 