'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useBlogStore } from '@/store';
import { Folder, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Category, Post } from '@/types';

export default function CategoriesPage() {
  const { categories, posts, initializeData } = useBlogStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // 计算每个分类的文章数量
  const categoriesWithCounts = categories.map((category: Category) => ({
    ...category,
    postCount: posts.filter((post: Post) => post.category.id === category.id).length
  }));

  // 按层级组织分类
  const rootCategories = categoriesWithCounts.filter((category: Category) => !category.parentId);
  const getSubCategories = (parentId: string) => 
    categoriesWithCounts.filter((category: Category) => category.parentId === parentId);

  const CategoryCard = ({ category, level = 0 }: { category: Category & { postCount: number }, level?: number }) => {
    const subCategories = getSubCategories(category.id);
    const hasSubCategories = subCategories.length > 0;

    return (
      <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {category.name}
                </Link>
                {category.description && (
                  <p className="text-gray-600 mt-1">{category.description}</p>
                )}
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4 mr-1" />
                  {category.postCount} 篇文章
                  {hasSubCategories && (
                    <>
                      <span className="mx-2">•</span>
                      <Folder className="w-4 h-4 mr-1" />
                      {subCategories.length} 个子分类
                    </>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 子分类 */}
        {hasSubCategories && (
          <div className="mt-4 space-y-4">
            {subCategories.map((subCategory: Category & { postCount: number }) => (
              <CategoryCard key={subCategory.id} category={subCategory} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                文章分类
              </h1>
              <p className="text-lg text-gray-600">
                按分类浏览我们的技术文章
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rootCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* All Categories List */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">所有分类</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <div key={category.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Folder className="w-5 h-5 text-primary-600 mr-3" />
                        <div>
                          <Link href={`/categories/${category.slug}`}>
                            <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                              {category.parentId && '└ '}{category.name}
                            </h3>
                          </Link>
                          {category.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {category.postCount} 篇文章
                        </span>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="text-primary-600 hover:text-primary-800 font-medium"
                        >
                          查看 →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 