'use client';

import { useEffect, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { useBlogStore } from '@/store';
import { Tag, FileText, Hash, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Tag as TagType, Post } from '@/types';

export default function TagsPage() {
  const { tags, posts, initializeData } = useBlogStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // 计算每个标签的文章数量
  const tagsWithCounts = useMemo(() => {
    return tags.map((tag: TagType) => ({
      ...tag,
      postCount: posts.filter((post: Post) => 
        post.tags.some((postTag: TagType) => postTag.id === tag.id)
      ).length
    })).filter((tag: TagType & { postCount: number }) => tag.postCount > 0);
  }, [tags, posts]);

  // 按使用频率排序
  const sortedTags = useMemo(() => {
    return [...tagsWithCounts].sort((a, b) => b.postCount - a.postCount);
  }, [tagsWithCounts]);

  // 热门标签（前10个）
  const popularTags = sortedTags.slice(0, 10);

  // 获取标签的颜色类
  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-gray-100 text-gray-800'
    ];
    return colors[index % colors.length];
  };

  // 获取标签的大小类（基于使用频率）
  const getTagSize = (postCount: number, maxCount: number) => {
    const ratio = postCount / maxCount;
    if (ratio > 0.8) return 'text-2xl px-4 py-2';
    if (ratio > 0.6) return 'text-xl px-3 py-2';
    if (ratio > 0.4) return 'text-lg px-3 py-1';
    if (ratio > 0.2) return 'text-base px-2 py-1';
    return 'text-sm px-2 py-1';
  };

  const maxCount = Math.max(...tagsWithCounts.map((tag: TagType & { postCount: number }) => tag.postCount));

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                文章标签
              </h1>
              <p className="text-lg text-gray-600">
                通过标签快速找到感兴趣的内容
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tag Cloud */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">标签云</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-wrap justify-center gap-4">
                {sortedTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className={`inline-block px-4 py-2 rounded-full font-medium hover:opacity-80 transition-all duration-200 hover:scale-105 ${getTagSize(tag.postCount, maxCount)}`}
                    style={{
                      backgroundColor: tag.color + '20',
                      color: tag.color,
                      border: `2px solid ${tag.color}30`,
                    }}
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">热门标签</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTags.map((tag, index) => (
                <div key={tag.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div 
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${getTagColor(index)}`}
                      >
                        <Tag className="w-6 h-6" style={{ color: tag.color }} />
                      </div>
                      <div>
                        <Link href={`/tags/${tag.slug}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                            #{tag.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <FileText className="w-4 h-4 mr-1" />
                          {tag.postCount} 篇文章
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        排名 #{index + 1}
                      </span>
                      <Link
                        href={`/tags/${tag.slug}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                      >
                        查看文章 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Tags List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">所有标签</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {sortedTags.map((tag, index) => (
                  <div key={tag.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mr-4">
                          {index + 1}
                        </div>
                        <div 
                          className={`w-4 h-4 rounded mr-3 ${getTagColor(index)}`}
                        />
                        <div>
                          <Link href={`/tags/${tag.slug}`}>
                            <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                              #{tag.name}
                            </h3>
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {tag.postCount} 篇文章
                        </span>
                        <Link
                          href={`/tags/${tag.slug}`}
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

          {/* Statistics */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg text-white p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">标签统计</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-bold mb-2">{tagsWithCounts.length}</div>
                    <div className="text-primary-100">活跃标签数</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {tagsWithCounts.reduce((sum: number, tag: TagType & { postCount: number }) => sum + tag.postCount, 0)}
                    </div>
                    <div className="text-primary-100">标签使用次数</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {tagsWithCounts.length > 0 ? Math.round(tagsWithCounts.reduce((sum: number, tag: TagType & { postCount: number }) => sum + tag.postCount, 0) / tagsWithCounts.length) : 0}
                    </div>
                    <div className="text-primary-100">平均使用次数</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 