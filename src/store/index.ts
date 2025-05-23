import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Post, Category, Tag, Comment, User, SearchResult, BlogStats } from '@/types';
import { mockPosts, mockCategories, mockTags, mockComments, mockUsers } from '@/data/mockData';

interface BlogState {
  // Posts
  posts: Post[];
  currentPost: Post | null;
  
  // Categories & Tags
  categories: Category[];
  tags: Tag[];
  
  // Comments
  comments: Comment[];
  
  // Users
  users: User[];
  currentUser: User | null;
  
  // Search
  searchResults: SearchResult | null;
  searchQuery: string;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Filters
  selectedCategory: string | null;
  selectedTag: string | null;
  sortBy: 'date' | 'views' | 'likes';
  sortOrder: 'asc' | 'desc';
  
  // Pagination
  currentPage: number;
  postsPerPage: number;
  
  // Stats
  stats: BlogStats | null;
}

interface BlogActions {
  // Posts
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  togglePostLike: (id: string) => void;
  incrementPostViews: (id: string) => void;
  
  // Categories & Tags
  setCategories: (categories: Category[]) => void;
  setTags: (tags: Tag[]) => void;
  
  // Comments
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (id: string, updates: Partial<Comment>) => void;
  deleteComment: (id: string) => void;
  toggleCommentLike: (id: string) => void;
  
  // Users
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User | null) => void;
  
  // Search
  setSearchResults: (results: SearchResult | null) => void;
  setSearchQuery: (query: string) => void;
  searchPosts: (query: string) => void;
  
  // UI State
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filters
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedTag: (tagId: string | null) => void;
  setSortBy: (sortBy: 'date' | 'views' | 'likes') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Pagination
  setCurrentPage: (page: number) => void;
  setPostsPerPage: (perPage: number) => void;
  
  // Stats
  setStats: (stats: BlogStats) => void;
  
  // Utility
  getFilteredPosts: () => Post[];
  getPostBySlug: (slug: string) => Post | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getTagBySlug: (slug: string) => Tag | undefined;
  getCommentsByPostId: (postId: string) => Comment[];
  initializeData: () => void;
}

export const useBlogStore = create<BlogState & BlogActions>()(
  devtools(
    (set, get) => ({
      // Initial State
      posts: [],
      currentPost: null,
      categories: [],
      tags: [],
      comments: [],
      users: [],
      currentUser: null,
      searchResults: null,
      searchQuery: '',
      isLoading: false,
      error: null,
      selectedCategory: null,
      selectedTag: null,
      sortBy: 'date',
      sortOrder: 'desc',
      currentPage: 1,
      postsPerPage: 10,
      stats: null,

      // Actions
      setPosts: (posts) => set({ posts }),
      setCurrentPost: (post) => set({ currentPost: post }),
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts]
      })),
      
      updatePost: (id, updates) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === id ? { ...post, ...updates } : post
        )
      })),
      
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter(post => post.id !== id)
      })),
      
      togglePostLike: (id) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      })),
      
      incrementPostViews: (id) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, views: post.views + 1 } : post
        )
      })),
      
      setCategories: (categories) => set({ categories }),
      setTags: (tags) => set({ tags }),
      
      setComments: (comments) => set({ comments }),
      
      addComment: (comment) => set((state) => ({
        comments: [...state.comments, comment]
      })),
      
      updateComment: (id, updates) => set((state) => ({
        comments: state.comments.map(comment =>
          comment.id === id ? { ...comment, ...updates } : comment
        )
      })),
      
      deleteComment: (id) => set((state) => ({
        comments: state.comments.filter(comment => comment.id !== id)
      })),
      
      toggleCommentLike: (id) => set((state) => ({
        comments: state.comments.map(comment =>
          comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
        )
      })),
      
      setUsers: (users) => set({ users }),
      setCurrentUser: (user) => set({ currentUser: user }),
      
      setSearchResults: (results) => set({ searchResults: results }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      searchPosts: (query) => {
        const { posts } = get();
        const filteredPosts = posts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
        );
        
        set({
          searchResults: {
            posts: filteredPosts,
            total: filteredPosts.length,
            page: 1,
            limit: 10
          },
          searchQuery: query
        });
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      setSelectedTag: (tagId) => set({ selectedTag: tagId }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      
      setCurrentPage: (page) => set({ currentPage: page }),
      setPostsPerPage: (perPage) => set({ postsPerPage: perPage }),
      
      setStats: (stats) => set({ stats }),
      
      getFilteredPosts: () => {
        const { posts, selectedCategory, selectedTag, sortBy, sortOrder } = get();
        let filtered = [...posts];
        
        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter(post => post.categoryId === selectedCategory);
        }
        
        // Filter by tag
        if (selectedTag) {
          filtered = filtered.filter(post => 
            post.tags.some(tag => tag.id === selectedTag)
          );
        }
        
        // Sort
        filtered.sort((a, b) => {
          let aValue: number;
          let bValue: number;
          
          switch (sortBy) {
            case 'views':
              aValue = a.views;
              bValue = b.views;
              break;
            case 'likes':
              aValue = a.likes;
              bValue = b.likes;
              break;
            case 'date':
            default:
              aValue = new Date(a.publishedAt || a.createdAt).getTime();
              bValue = new Date(b.publishedAt || b.createdAt).getTime();
              break;
          }
          
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
        
        return filtered;
      },
      
      getPostBySlug: (slug) => {
        const { posts } = get();
        return posts.find(post => post.slug === slug);
      },
      
      getCategoryBySlug: (slug) => {
        const { categories } = get();
        return categories.find(category => category.slug === slug);
      },
      
      getTagBySlug: (slug) => {
        const { tags } = get();
        return tags.find(tag => tag.slug === slug);
      },
      
      getCommentsByPostId: (postId) => {
        const { comments } = get();
        return comments.filter(comment => comment.postId === postId);
      },
      
      initializeData: () => {
        set({
          posts: mockPosts,
          categories: mockCategories,
          tags: mockTags,
          comments: mockComments,
          users: mockUsers,
          currentUser: mockUsers[0], // 默认设置为管理员
        });
      },
    }),
    {
      name: 'blog-store',
    }
  )
);

// 为了兼容性，也导出为blogStore
export const blogStore = useBlogStore; 