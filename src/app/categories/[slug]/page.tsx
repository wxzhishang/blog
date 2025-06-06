'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Category } from '@/types';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import { ChevronRight, Home, ListFilter, AlertTriangle, Loader2, Layers, FileText } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { TacticsBoardIcon, FootballIcon, StadiumIcon, CityBadgeIcon } from '@/components/Layout/CityIcons';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { getCategoryBySlug, posts, categories: allCategories, initializeData } = useBlogStore();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const categoryData = await getCategoryBySlug(slug);
        if (categoryData) {
          setCategory(categoryData);
          document.title = `战术解读：${categoryData.name} - Cityzens 技术博客`;
          const filteredPosts = posts.filter(post => post.category?.id === categoryData.id);
          setCategoryPosts(filteredPosts);
        } else {
          setCategory(null);
          document.title = '未找到战术分类 - Cityzens 技术博客';
        }
      } catch (error) {
        console.error('加载分类数据失败:', error);
        setCategory(null);
        document.title = '加载错误 - Cityzens 技术博客';
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, getCategoryBySlug, posts, initializeData]);

  const getParentCategory = (parentId: string | null | undefined): Category | null => {
    if (!parentId) return null;
    return allCategories.find(cat => cat.id === parentId) || null;
  };

  const breadcrumbs = [];
  if (category) {
    let parent = getParentCategory(category.parentId);
    while (parent) {
      breadcrumbs.unshift({ name: parent.name, slug: parent.slug });
      parent = getParentCategory(parent.parentId);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-city-blue-50 pattern-background flex flex-col items-center justify-center p-4">
          <Loader2 className="w-16 h-16 text-city-blue-500 animate-spin mb-6" />
          <p className="text-city-blue-700 text-xl font-semibold">正在加载战术数据...</p>
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 opacity-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-city-blue-100 rounded-xl p-6 h-72 animate-pulse">
                <div className="h-6 bg-city-blue-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-city-blue-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-city-blue-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-city-blue-200 rounded w-1/2 mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-city-blue-200 rounded w-1/4"></div>
                  <div className="h-8 bg-city-blue-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="min-h-screen bg-city-blue-50 pattern-background flex flex-col items-center justify-center text-center p-4">
          <StadiumIcon className="w-24 h-24 text-city-blue-300 mb-8 opacity-70" />
          <h1 className="text-3xl font-bold text-city-blue-800 mb-4">未找到该战术手册</h1>
          <p className="text-city-blue-600 text-lg mb-8 max-w-md">
            您寻找的战术分类可能已被移除，或者暂时还未编入我们的战术库中。
          </p>
          <button 
            onClick={() => router.push('/categories')}
            className="btn-primary"
          >
            返回战术板概览
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-city-blue-50 pattern-background">
        <header className="bg-city-blue-700 text-white py-12 md:py-16 relative pattern-background-dark">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8 flex items-center space-x-1.5 text-sm">
            <Link href="/" className="text-city-blue-200 hover:text-city-gold transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1.5" /> 首页
            </Link>
            <ChevronRight className="w-4 h-4 text-city-blue-400" />
            <Link href="/categories" className="text-city-blue-200 hover:text-city-gold transition-colors flex items-center">
              <Layers className="w-4 h-4 mr-1.5" /> 战术板
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-1.5">
                <ChevronRight className="w-4 h-4 text-city-blue-400" />
                <Link href={`/categories/${crumb.slug}`} className="text-city-blue-200 hover:text-city-gold transition-colors">
                  {crumb.name}
                </Link>
              </div>
            ))}
            <ChevronRight className="w-4 h-4 text-city-blue-400" />
            <span className="text-city-gold font-semibold">{category.name}</span>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              <div className="mb-4 md:mb-0">
                <TacticsBoardIcon className="w-16 h-16 md:w-20 md:h-20 text-city-gold opacity-90" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  战术聚焦: <span className="text-city-gold">{category.name}</span>
                </h1>
                {category.description && (
                  <p className="text-lg text-city-blue-100 mb-3 max-w-2xl mx-auto md:mx-0">{category.description}</p>
                )}
                <div className="flex items-center justify-center md:justify-start text-sm text-city-blue-200">
                  <FileText className="w-4 h-4 mr-2 text-city-blue-300" />
                  <span>当前包含 {categoryPosts.length} 篇相关战报</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categoryPosts.map((post) => (
                <PostCard key={post.id} post={post} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-city-blue-100">
              <FootballIcon className="w-20 h-20 text-city-blue-300 mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl font-semibold text-city-blue-800 mb-3">暂无实战演练</h3>
              <p className="text-city-blue-600 mb-6">
                该战术分类 ({category.name}) 下暂时还没有具体的战报分析。
              </p>
              <button 
                onClick={() => router.back()} 
                className="btn-secondary mr-3"
              >
                返回上一页
              </button>
              <Link href="/" className="btn-primary">
                返回首页
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
} 