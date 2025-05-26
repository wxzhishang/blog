'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useBlogStore } from '@/store';
import { Folder, FileText, ChevronRight, ChevronRightSquare, Layers, Grid } from 'lucide-react';
import Link from 'next/link';
import { Category, Post } from '@/types';
import { TacticsBoardIcon, FootballIcon, CityBadgeIcon } from '@/components/Layout/CityIcons';

export default function CategoriesPage() {
  const { categories, posts, initializeData } = useBlogStore();

  useEffect(() => {
    initializeData();
    document.title = '战术分类 - Cityzens 技术博客';
  }, [initializeData]);

  const categoriesWithCounts = categories.map((category: Category) => ({
    ...category,
    postCount: posts.filter((post: Post) => post.category && post.category.id === category.id).length
  }));

  const rootCategories = categoriesWithCounts.filter((category: Category) => !category.parentId);
  const getSubCategories = (parentId: string) => 
    categoriesWithCounts.filter((category: Category) => category.parentId === parentId);

  const CategoryCard = ({ category, level = 0 }: { category: Category & { postCount: number }, level?: number }) => {
    const subCategories = getSubCategories(category.id);
    const hasSubCategories = subCategories.length > 0;

    return (
      <div className={`${level > 0 ? 'ml-4 md:ml-6 border-l-2 border-city-blue-200 pl-4 md:pl-6 py-2' : ''}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-football hover:shadow-trophy transition-all duration-300 border border-city-blue-100/50 transform hover:scale-[1.02]">
          <Link href={`/categories/${category.slug}`} className="block p-5 md:p-6 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-3 bg-city-blue-100 rounded-lg group-hover:bg-city-blue-200 transition-colors">
                  <TacticsBoardIcon className="w-6 h-6 md:w-7 md:h-7 text-city-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-city-blue-800 group-hover:text-city-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-city-blue-700 text-sm mt-1 line-clamp-1">{category.description}</p>
                  )}
                  <div className="flex items-center mt-2 text-xs md:text-sm text-city-blue-500">
                    <FileText className="w-4 h-4 mr-1.5 text-city-blue-400" />
                    {category.postCount} 篇战术分析
                    {hasSubCategories && (
                      <>
                        <span className="mx-1.5">•</span>
                        <Layers className="w-4 h-4 mr-1.5 text-city-blue-400" />
                        {subCategories.length} 个子战术
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRightSquare className="w-6 h-6 text-city-blue-300 group-hover:text-city-blue-500 transition-colors shrink-0 ml-2" />
            </div>
          </Link>
        </div>

        {/* 子分类 */}
        {hasSubCategories && (
          <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
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
      <div className="bg-city-blue-50 min-h-screen pattern-background">
        {/* Header - 战术板概览 */}
        <header className="bg-city-gradient text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-center mb-6 animate-football-bounce">
              <TacticsBoardIcon className="w-20 h-20 md:w-24 md:h-24 text-city-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              蓝月亮 <span className="text-city-gold">战术板</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-city-blue-100 max-w-3xl mx-auto">
              探索曼城技术博客的丰富战术分类，从阵型解析到球员特点，深入理解蓝月亮的胜利哲学。
            </p>
            {categoriesWithCounts.length > 0 && (
                <div className="flex justify-center items-center space-x-8 text-sm text-city-blue-200">
                    <div className="flex items-center">
                        <Grid className="w-5 h-5 mr-2 text-city-blue-300" />
                        <span>共 {rootCategories.length} 个主要战术体系</span>
                    </div>
                    <div className="flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-city-blue-300" />
                        <span>总计 {categoriesWithCounts.length} 个细分战术</span>
                    </div>
                </div>
            )}
          </div>
        </header>

        {/* Categories Grid - 战术卡片 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          {rootCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {rootCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CityBadgeIcon className="w-20 h-20 text-city-blue-200 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-semibold text-city-blue-800 mb-3">战术板正在绘制中...</h3>
              <p className="text-city-blue-600">很快将为您呈现详细的战术分类！</p>
            </div>
          )}

          {/* 暂时注释掉“所有分类列表”部分，以专注于卡片布局 
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-city-blue-900 mb-8">所有战术概览</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-football border border-city-blue-100/50 overflow-hidden">
              <div className="divide-y divide-city-blue-100">
                {categoriesWithCounts.map((category) => (
                  <div key={category.id} className="p-4 md:p-5 hover:bg-city-blue-50/50 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FootballIcon className="w-5 h-5 text-city-blue-500 mr-3 group-hover:text-city-blue-600" />
                        <div>
                          <Link href={`/categories/${category.slug}`} className="font-medium text-city-blue-800 hover:text-city-blue-600 transition-colors">
                            {category.parentId && <span className="text-city-blue-400 mr-1">└</span>}{category.name}
                          </Link>
                          {category.description && (
                            <p className="text-sm text-city-blue-600 mt-1 line-clamp-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-city-blue-500">
                          {category.postCount} 篇分析
                        </span>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="text-city-blue-600 hover:text-city-gold font-semibold text-sm group-hover:underline"
                        >
                          深入查看 <ChevronRight className="w-4 h-4 inline-block ml-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          */}
        </main>
      </div>
    </Layout>
  );
} 