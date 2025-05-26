'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Tag as TagType } from '@/types';
import PostCard from '@/components/Post/PostCard';
import { useBlogStore } from '@/store';
import {
  ChevronRight,
  Home,
  ListChecks, // 在面包屑导航中为"标签"页面链接使用 ListChecks
  Loader2,
  FileText,
  Tag as TagIconLucide // 重命名以避免与 TagType 冲突
} from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { FootballIcon, StadiumIcon, CityBadgeIcon } from '@/components/Layout/CityIcons';

export default function TagPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  // 假设 getTagBySlug 存在，或者可以像 getCategoryBySlug 一样派生
  // 目前，我们将从所有标签中筛选。一个专门的 getTagBySlug 会更好。
  const { tags, posts, initializeData } = useBlogStore(); 
  
  const [currentTag, setCurrentTag] = useState<TagType | null>(null);
  const [tagPosts, setTagPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData(); // 确保所有数据都可用
  }, [initializeData]);

  useEffect(() => {
    const loadTagData = () => { // 移除了 async，因为这里的 getTagBySlug 是同步的
      if (!slug || tags.length === 0) { // 等待标签加载完成
        // 如果 store 尚未加载标签，此 effect 可能会过早运行。
        // 如果这是一个问题，可以考虑在 useBlogStore 中添加加载状态或重试机制。
        if (tags.length === 0 && posts.length ===0) setIsLoading(true); // 如果 store 未就绪，则继续加载
        else setIsLoading(false); // 如果 slug 缺失但 store 已就绪，则停止加载（将显示未找到）
        return;
      }
      setIsLoading(true);
      // 通过从标签数组中筛选来模拟 getTagBySlug
      const tagData = tags.find((t: TagType) => t.slug === slug);

      if (tagData) {
        setCurrentTag(tagData);
        document.title = `标签：${tagData.name} - Cityzens 技术博客`;
        const filteredPosts = posts.filter(post => 
          post.tags && post.tags.some(pt => pt.id === tagData.id)
        );
        setTagPosts(filteredPosts);
      } else {
        setCurrentTag(null);
        document.title = '未找到标签 - Cityzens 技术博客';
      }
      setIsLoading(false);
    };

    loadTagData();
  }, [slug, tags, posts, initializeData]); // 依赖 store 中的 tags 和 posts


  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-city-blue-50 pattern-background flex flex-col items-center justify-center p-4">
          <Loader2 className="w-16 h-16 text-city-blue-500 animate-spin mb-6" />
          <p className="text-city-blue-700 text-xl font-semibold">正在加载标签数据...</p>
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

  if (!currentTag) {
    return (
      <Layout>
        <div className="min-h-screen bg-city-blue-50 pattern-background flex flex-col items-center justify-center text-center p-4">
          <CityBadgeIcon className="w-24 h-24 text-city-blue-300 mb-8 opacity-70" />
          <h1 className="text-3xl font-bold text-city-blue-800 mb-4">未找到该球员/技术标签</h1>
          <p className="text-city-blue-600 text-lg mb-8 max-w-md">
            您寻找的标签可能不存在，或暂无相关技术分析。
          </p>
          <button 
            onClick={() => router.push('/tags')}
            className="btn-primary"
          >
            返回标签云
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-city-blue-50 pattern-background">
        {/* 头部 - 标签详情页 */}
        <header className="bg-city-blue-700 text-white py-12 md:py-16 relative pattern-background-dark">
          {/* 面包屑导航 */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8 flex items-center space-x-1.5 text-sm">
            <Link href="/" className="text-city-blue-200 hover:text-city-gold transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1.5" /> 首页
            </Link>
            <ChevronRight className="w-4 h-4 text-city-blue-400" />
            <Link href="/tags" className="text-city-blue-200 hover:text-city-gold transition-colors flex items-center">
              <ListChecks className="w-4 h-4 mr-1.5" /> 标签云
            </Link>
            <ChevronRight className="w-4 h-4 text-city-blue-400" />
            <span className="text-city-gold font-semibold">#{currentTag.name}</span>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              <div className="mb-4 md:mb-0 p-3 bg-city-blue-600/50 rounded-full">
                <TagIconLucide className="w-12 h-12 md:w-16 md:h-16 text-city-gold opacity-90" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  焦点: <span className="text-city-gold">#{currentTag.name}</span>
                </h1>
                {/* currentTag.description && (
                  <p className="text-lg text-city-blue-100 mb-3 max-w-2xl mx-auto md:mx-0">{currentTag.description}</p>
                ) */}
                <div className="flex items-center justify-center md:justify-start text-sm text-city-blue-200">
                  <FileText className="w-4 h-4 mr-2 text-city-blue-300" />
                  <span>共找到 {tagPosts.length} 篇相关战报</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 文章列表 */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          {tagPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {tagPosts.map((post) => (
                <PostCard key={post.id} post={post} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-city-blue-100">
              <FootballIcon className="w-20 h-20 text-city-blue-300 mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl font-semibold text-city-blue-800 mb-3">暂无关联战报</h3>
              <p className="text-city-blue-600 mb-6">
                关于标签 #{currentTag.name} 暂时还没有具体的战报分析。
              </p>
              <button 
                onClick={() => router.back()} 
                className="btn-secondary mr-3"
              >
                返回上一页
              </button>
              <Link href="/tags" className="btn-primary">
                返回标签云
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
} 