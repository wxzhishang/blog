'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import { TrendingUp, Clock, Users, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { 
  CityBadgeIcon, 
  FootballIcon, 
  TrophyIcon, 
  StadiumIcon, 
  JerseyNumberIcon,
  TacticsBoardIcon 
} from '@/components/Layout/CityIcons';
import { mockPosts, mockCategories, mockTags } from '@/data/mockData';

export default function HomePage() {
  const { 
    posts, 
    categories, 
    tags, 
    initializeData, 
    getFilteredPosts 
  } = useBlogStore();

  const [todayViews, setTodayViews] = useState(0);

  useEffect(() => {
    initializeData();
  }, []);

  // 客户端设置今日观战数据，避免hydration错误
  useEffect(() => {
    setTodayViews(Math.floor(Math.random() * 500) + 100);
  }, []);

  // 如果store中的数据为空，使用mock数据作为fallback
  const currentPosts = posts.length > 0 ? posts : mockPosts;
  const currentCategories = categories.length > 0 ? categories : mockCategories;
  const currentTags = tags.length > 0 ? tags : mockTags;

  const filteredPosts = posts.length > 0 ? getFilteredPosts() : mockPosts;
  const featuredPost = filteredPosts.find(post => post.isSticky) || filteredPosts[0];
  const recentPosts = filteredPosts.slice(0, 6);
  const popularPosts = [...filteredPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const stats = {
    totalPosts: currentPosts.length,
    totalViews: currentPosts.reduce((sum, post) => sum + post.views, 0),
    totalCategories: currentCategories.length,
    totalTags: currentTags.length,
  };

  // 为categories添加postCount
  const categoriesWithCount = currentCategories.map(category => ({
    ...category,
    postCount: currentPosts.filter(post => post.category && post.category.id === category.id).length
  }));

  // 为tags添加postCount  
  const tagsWithCount = currentTags.map(tag => ({
    ...tag,
    postCount: currentPosts.filter(post => post.tags && post.tags.some(postTag => postTag.id === tag.id)).length
  }));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 via-city-blue-50 to-gray-100 min-h-screen relative overflow-hidden">
        {/* 背景装饰 - 帆船剪影 */}
        <div className="absolute inset-0 bg-stadium-pattern opacity-5"></div>
        <div className="absolute top-20 right-10 animate-stadium-pulse">
          <StadiumIcon className="w-32 h-32 text-city-blue-200" />
        </div>
        <div className="absolute bottom-20 left-10 animate-sail-float">
          <CityBadgeIcon className="w-24 h-24 opacity-10" />
        </div>

        {/* Hero Section - 曼城主题 */}
        <section className="bg-city-gradient text-white py-20 relative overflow-hidden">
          {/* 动态背景元素 */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-1/4 animate-football-bounce">
              <FootballIcon className="w-8 h-8 opacity-20" />
            </div>
            <div className="absolute bottom-10 right-1/4 animate-sail-float">
              <TrophyIcon className="w-10 h-10 opacity-20" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CityBadgeIcon className="w-20 h-20 animate-sail-float" />
                  <div className="absolute -top-2 -right-2">
                    <div className="animate-trophy-glow">
                      <TrophyIcon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-city-blue-100 bg-clip-text text-transparent">
                  欢迎来到蓝月亮技术博客
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-city-blue-100">
                像曼城征服球场一样，我们征服技术领域 🏆
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 text-city-blue-100 mb-8">
                <div className="flex items-center bg-city-blue-800/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <BookOpen className="w-6 h-6 mr-2" />
                  <span className="font-semibold">{stats.totalPosts}</span>
                  <span className="ml-1">篇战报</span>
                </div>
                <div className="flex items-center bg-city-blue-800/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  <span className="font-semibold">{stats.totalViews.toLocaleString()}</span>
                  <span className="ml-1">次观战</span>
                </div>
                <div className="flex items-center bg-city-blue-800/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <Users className="w-6 h-6 mr-2" />
                  <span className="font-semibold">{stats.totalCategories}</span>
                  <span className="ml-1">个战术</span>
                </div>
                <div className="flex items-center bg-city-blue-800/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <Clock className="w-6 h-6 mr-2" />
                  <span className="font-semibold">{todayViews}</span>
                  <span className="ml-1">今日观战</span>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/posts"
                  className="group inline-flex items-center px-8 py-4 bg-city-gold hover:bg-city-gold/90 text-city-blue-900 font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-trophy"
                >
                  <TacticsBoardIcon className="w-5 h-5 mr-2" />
                  开始阅读战报
                  <FootballIcon className="w-4 h-4 ml-2 group-hover:animate-football-bounce" />
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <CityBadgeIcon className="w-5 h-5 mr-2" />
                  了解更衣室
                </Link>
              </div>

              {/* 快捷导航 */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                <Link 
                  href="/posts?sort=popular"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  🔥 热门战报
                </Link>
                <Link 
                  href="/categories"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  ⚽ 战术分类
                </Link>
                <Link 
                  href="/tags"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  🏆 球员标签
                </Link>
                <Link 
                  href="/archive"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  📚 战报归档
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post - 精选战报 */}
        {featuredPost && (
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <TrophyIcon className="w-8 h-8 mr-3 animate-trophy-glow" />
                  <h2 className="text-3xl font-bold text-city-blue-900">本周精选战报</h2>
                  <TrophyIcon className="w-8 h-8 ml-3 animate-trophy-glow" />
                </div>
                <p className="text-city-blue-600">教练精心挑选的技术战术分析</p>
              </div>
              <PostCard post={featuredPost} variant="featured" />
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Posts - 最新战报 */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <TacticsBoardIcon className="w-6 h-6 mr-3 text-city-blue-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-city-blue-900">最新战报</h2>
                      {recentPosts.length > 0 && (
                        <p className="text-sm text-city-blue-500 mt-1">
                          最近更新：{formatDate(recentPosts[0].publishedAt || recentPosts[0].createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link 
                    href="/posts"
                    className="flex items-center text-city-blue-600 hover:text-city-blue-800 font-medium group transition-colors duration-200"
                  >
                    查看全部战报
                    <FootballIcon className="w-4 h-4 ml-2 group-hover:animate-football-bounce" />
                  </Link>
                </div>
                <div className="space-y-8">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar - 球迷看台 */}
              <div className="space-y-8">
                {/* Quick Search - 快速搜索 */}
                <div className="bg-white rounded-xl shadow-football p-6 border-l-4 border-city-gold hover:shadow-trophy transition-all duration-300">
                  <h3 className="text-xl font-bold text-city-blue-900 mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-city-gold" />
                    快速搜索
                  </h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const query = formData.get('search') as string;
                      if (query.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                      }
                    }}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        name="search"
                        placeholder="搜索战报..."
                        className="w-full pl-10 pr-4 py-3 border border-city-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-city-blue-500 focus:border-city-blue-500 bg-city-blue-50/50 transition-colors"
                      />
                      <Search className="absolute left-3 top-3.5 w-4 h-4 text-city-blue-400" />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-city-blue-600 hover:bg-city-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      搜索战报
                    </button>
                  </form>
                </div>

                {/* Popular Posts - 热门战报 */}
                <div className="bg-white rounded-xl shadow-football p-6 border-l-4 border-city-blue-300 hover:shadow-trophy transition-all duration-300">
                  <h3 className="text-xl font-bold text-city-blue-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-city-gold animate-pulse" />
                    <span className="bg-gradient-to-r from-city-blue-900 to-city-gold bg-clip-text text-transparent">
                      🔥 球迷热议战报
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-city-blue-50 transition-colors duration-200">
                        <JerseyNumberIcon 
                          number={index + 1} 
                          className="w-8 h-8 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link href={`/posts/${post.slug}`}>
                            <h4 className="text-sm font-medium text-city-blue-900 hover:text-city-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </Link>
                          <div className="flex items-center mt-1 text-xs text-city-blue-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{post.views} 次观战</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/posts?sort=popular"
                    className="block mt-4 text-center text-city-blue-600 hover:text-city-blue-800 font-medium py-2 px-4 rounded-lg border border-city-blue-200 hover:border-city-blue-300 transition-all duration-200"
                  >
                    查看更多热议战报 →
                  </Link>
                </div>

                {/* Categories - 战术分类 */}
                <div className="bg-white rounded-xl shadow-football p-6 border-l-4 border-pitch-green hover:shadow-pitch transition-all duration-300">
                  <h3 className="text-xl font-bold text-city-blue-900 mb-4 flex items-center">
                    <TacticsBoardIcon className="w-5 h-5 mr-2 text-pitch-green" />
                    战术分类
                  </h3>
                  <div className="space-y-2">
                    {categoriesWithCount.slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-city-blue-50 hover:to-pitch-green/10 transition-all duration-200 group"
                      >
                        <span className="text-city-blue-700 hover:text-city-blue-900 font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {category.name}
                        </span>
                        <span className="text-sm text-city-blue-500 bg-city-blue-100 px-3 py-1 rounded-full font-semibold">
                          {category.postCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/categories"
                    className="block mt-4 text-center text-city-blue-600 hover:text-city-blue-800 font-medium py-2 px-4 rounded-lg border border-city-blue-200 hover:border-city-blue-300 transition-all duration-200"
                  >
                    查看全部战术 →
                  </Link>
                </div>

                {/* Tags - 球员标签 */}
                <div className="bg-white rounded-xl shadow-football p-6 border-l-4 border-city-gold hover:shadow-trophy transition-all duration-300">
                  <h3 className="text-xl font-bold text-city-blue-900 mb-4 flex items-center">
                    <FootballIcon className="w-5 h-5 mr-2 text-city-gold" />
                    球员标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tagsWithCount.slice(0, 12).map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.slug}`}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                        style={{
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                          borderColor: tag.color + '80',
                          borderWidth: '1px'
                        }}
                      >
                        <span className="mr-1.5">#</span>{tag.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/tags"
                    className="block mt-4 text-center text-city-blue-600 hover:text-city-blue-800 font-medium py-2 px-4 rounded-lg border border-city-blue-200 hover:border-city-blue-300 transition-all duration-200"
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