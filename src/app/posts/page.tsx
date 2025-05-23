'use client';

import { useEffect, useState, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import { Search, Filter, Grid, List, Calendar, User, Tag, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Post, Category, Tag as TagType, User as UserType } from '@/types';

interface PostFilters {
  category: string;
  tag: string;
  author: string;
  sortBy: string;
}

export default function PostsPage() {
  const { 
    posts, 
    categories, 
    tags, 
    users, 
    initializeData,
    getFilteredPosts,
    selectedCategory,
    selectedTag,
    setSelectedCategory,
    setSelectedTag,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    searchPosts
  } = useBlogStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PostFilters>({
    category: '',
    tag: '',
    author: '',
    sortBy: 'latest'
  });

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((post: Post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      result = result.filter((post: Post) => post.category.slug === filters.category);
    }

    if (filters.tag) {
      result = result.filter((post: Post) => 
        post.tags.some((tag: TagType) => tag.slug === filters.tag)
      );
    }

    if (filters.author) {
      result = result.filter((post: Post) => post.author.id === filters.author);
    }

    switch (filters.sortBy) {
      case 'latest':
        result.sort((a: Post, b: Post) => 
          new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
        );
        break;
      case 'oldest':
        result.sort((a: Post, b: Post) => 
          new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime()
        );
        break;
      case 'popular':
        result.sort((a: Post, b: Post) => b.views - a.views);
        break;
      case 'liked':
        result.sort((a: Post, b: Post) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return result;
  }, [posts, searchQuery, filters]);

  const handleFilterChange = (key: keyof PostFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      tag: '',
      author: '',
      sortBy: 'latest'
    });
  };

  const hasActiveFilters = searchQuery || filters.category || filters.tag || filters.author || filters.sortBy !== 'latest';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPosts(searchQuery);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                所有文章
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                探索我们的技术文章和见解
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索文章..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  清除筛选
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="latest">最新发布</option>
                <option value="oldest">最早发布</option>
                <option value="popular">最多浏览</option>
                <option value="liked">最多点赞</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-white border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">分类</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={!filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="mr-2"
                      />
                      <span>全部分类</span>
                    </label>
                    {categories.map((category: Category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.slug}
                          checked={filters.category === category.slug}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-2"
                        />
                        <span>{category.name} ({category.postCount || 0})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: TagType) => (
                      <button
                        key={tag.id}
                        onClick={() => handleFilterChange('tag', filters.tag === tag.slug ? '' : tag.slug)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          filters.tag === tag.slug
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        #{tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">作者</h3>
                  <div className="flex flex-wrap gap-2">
                    {users.map((user: UserType) => (
                      <button
                        key={user.id}
                        onClick={() => handleFilterChange('author', filters.author === user.id ? '' : user.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          filters.author === user.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {user.name || user.username}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              找到 {filteredAndSortedPosts.length} 篇文章
            </p>
          </div>

          {/* Posts Grid/List */}
          {filteredAndSortedPosts.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {filteredAndSortedPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                没有找到相关文章
              </h3>
              <p className="text-gray-600 mb-4">
                尝试调整搜索条件或筛选器
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                清除所有筛选
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 