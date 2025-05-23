'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import { TrendingUp, Clock, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { 
    posts, 
    categories, 
    tags, 
    initializeData, 
    getFilteredPosts 
  } = useBlogStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredPosts = getFilteredPosts();
  const featuredPost = filteredPosts.find(post => post.isSticky) || filteredPosts[0];
  const recentPosts = filteredPosts.slice(0, 6);
  const popularPosts = [...filteredPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const stats = {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalCategories: categories.length,
    totalTags: tags.length,
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                欢迎来到技术博客
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                分享最新的技术知识和实践经验，助力开发者成长
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-primary-100">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  <span>{stats.totalPosts} 篇文章</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  <span>{stats.totalViews.toLocaleString()} 次阅读</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  <span>{stats.totalCategories} 个分类</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                精选文章
              </h2>
              <PostCard post={featuredPost} variant="featured" />
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Posts */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
                  <Link 
                    href="/posts"
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    查看全部 →
                  </Link>
                </div>
                <div className="space-y-8">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Popular Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                    热门文章
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={post.id} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <Link href={`/posts/${post.slug}`}>
                            <h4 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </Link>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{post.views} 次阅读</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    文章分类
                  </h3>
                  <div className="space-y-2">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-700 hover:text-primary-600">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {category.postCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/categories"
                    className="block mt-4 text-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    查看全部分类 →
                  </Link>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    热门标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 12).map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.slug}`}
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                        }}
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/tags"
                    className="block mt-4 text-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    查看全部标签 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 