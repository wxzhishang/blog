'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post, Category } from '@/types';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import { ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getCategoryBySlug, posts } = useBlogStore();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      setIsLoading(true);
      try {
        const categoryData = await getCategoryBySlug(slug);
        if (categoryData) {
          setCategory(categoryData);
          const filteredPosts = posts.filter(post => post.categoryId === categoryData.id);
          setCategoryPosts(filteredPosts);
        }
      } catch (error) {
        console.error('加载分类数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, getCategoryBySlug, posts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到该分类</h1>
          <p className="text-gray-600">该分类可能已被删除或移动到其他位置</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 面包屑导航 */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-primary-600">首页</a>
          <ChevronRight className="w-4 h-4" />
          <a href="/categories" className="hover:text-primary-600">分类</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-600">{category.name}</span>
        </div>

        {/* 分类信息 */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 mb-4">{category.description}</p>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">文章数量: {categoryPosts.length}</span>
          </div>
        </div>

        {/* 文章列表 */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">该分类下暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
} 