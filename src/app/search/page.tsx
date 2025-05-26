'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, Calendar, User, Tag, X } from 'lucide-react'
import { useBlogStore } from '@/store'
import { formatDate } from '@/lib/utils'
import PostCard from '@/components/Post/PostCard'
import { Post, Category, Tag as TagType, User as UserType } from '@/types'

interface SearchFilters {
  category: string
  tag: string
  author: string
  dateRange: string
  sortBy: string
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const { posts, categories, tags, users, initializeData } = useBlogStore()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    tag: '',
    author: '',
    dateRange: 'all',
    sortBy: 'relevance'
  })

  useEffect(() => {
    initializeData()
  }, [initializeData])

  // 搜索和筛选逻辑
  const searchResults = useMemo(() => {
    let filteredPosts = [...posts]

    // 关键词搜索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filteredPosts = filteredPosts.filter((post: Post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag: TagType) => tag.name.toLowerCase().includes(query))
      )
    }

    // 分类筛选
    if (filters.category) {
      filteredPosts = filteredPosts.filter((post: Post) => 
        post.category.slug === filters.category
      )
    }

    // 标签筛选
    if (filters.tag) {
      filteredPosts = filteredPosts.filter((post: Post) =>
        post.tags.some((tag: TagType) => tag.slug === filters.tag)
      )
    }

    // 作者筛选
    if (filters.author) {
      filteredPosts = filteredPosts.filter((post: Post) => 
        post.author.id === filters.author
      )
    }

    // 日期范围筛选
    if (filters.dateRange !== 'all') {
      const now = new Date()
      let filterDate = new Date()
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      if (filters.dateRange !== 'all') {
        filteredPosts = filteredPosts.filter((post: Post) =>
          new Date(post.publishedAt || post.createdAt) >= filterDate
        )
      }
    }

    // 排序
    switch (filters.sortBy) {
      case 'date':
        filteredPosts.sort((a: Post, b: Post) => 
          new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
        )
        break
      case 'views':
        filteredPosts.sort((a: Post, b: Post) => b.views - a.views)
        break
      case 'likes':
        filteredPosts.sort((a: Post, b: Post) => b.likes - a.likes)
        break
      case 'relevance':
      default:
        // 保持原有顺序（相关性）
        break
    }

    return filteredPosts
  }, [posts, searchQuery, filters])

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      tag: '',
      author: '',
      dateRange: 'all',
      sortBy: 'relevance'
    })
    setSearchQuery('')
  }

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'relevance')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章、标签或内容..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5 mr-2" />
              筛选
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {Object.values(filters).filter(v => v && v !== 'relevance').length}
                </span>
              )}
            </button>
          </div>

          {/* Search Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              {searchQuery ? (
                <span>
                  搜索 "<strong>{searchQuery}</strong>" 找到 <strong>{searchResults.length}</strong> 个结果
                </span>
              ) : (
                <span>共 <strong>{searchResults.length}</strong> 篇文章</span>
              )}
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4 mr-1" />
                清除筛选
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">所有分类</option>
                  {categories.map((category: Category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签
                </label>
                <select
                  value={filters.tag}
                  onChange={(e) => handleFilterChange('tag', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">所有标签</option>
                  {tags.map((tag: TagType) => (
                    <option key={tag.id} value={tag.slug}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  作者
                </label>
                <select
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">所有作者</option>
                  {users.map((user: UserType) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.username}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时间范围
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">所有时间</option>
                  <option value="week">最近一周</option>
                  <option value="month">最近一月</option>
                  <option value="year">最近一年</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  排序方式
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="relevance">相关性</option>
                  <option value="date">发布时间</option>
                  <option value="views">浏览量</option>
                  <option value="likes">点赞数</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? '未找到相关结果' : '暂无文章'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? '尝试使用不同的关键词或调整筛选条件'
                : '还没有发布任何文章'
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800"
              >
                清除所有筛选条件
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((post: Post) => (
              <PostCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        )}
      </div>

      {/* Search Tips */}
      {searchQuery && searchResults.length > 0 && (
        <div className="bg-blue-50 border-t">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h3 className="text-sm font-medium text-blue-900 mb-2">搜索提示</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 使用引号搜索精确短语，如 "React Hooks"</li>
              <li>• 使用多个关键词可以缩小搜索范围</li>
              <li>• 尝试使用标签或分类筛选来精确查找</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">加载中...</div>}>
      <SearchPageContent />
    </Suspense>
  )
} 