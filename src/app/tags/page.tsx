'use client';

import { useEffect, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { useBlogStore } from '@/store';
import { Tag as TagIconLucide, FileText, Hash, TrendingUp, Search, ListChecks, PieChart, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Tag as TagType, Post } from '@/types';
import { FootballIcon, JerseyNumberIcon, CityBadgeIcon, StadiumIcon } from '@/components/Layout/CityIcons';

// 扩展的曼城主题标签按钮样式 - 确保这些已在 globals.css 中定义
const cityTagStyles = [
  'btn-tag-blue', 
  'btn-tag-gold', 
  'btn-tag-darkblue', 
  'btn-tag-green',
  'btn-tag-skyblue-outline',
  'btn-tag-gold-outline',
  'btn-tag-darkblue-outline',
  'btn-tag-gray',
  'btn-tag-blue-light',
  'btn-tag-gold-light',
  // 如果您定义了更多样式，请在此处添加
];

// 辅助函数，根据标签名称和基础索引获取一个相对一致的样式索引
const getStyleIndexForTag = (tagName: string, baseIndex: number, totalStyles: number): number => {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = (hash << 5) - hash + tagName.charCodeAt(i);
    hash |= 0; // 转换为32位整数
  }
  // 与 baseIndex 混合以确保多样性，并防止所有以 'A' 开头的标签等具有相同的颜色。
  return (Math.abs(hash) + baseIndex) % totalStyles;
};

export default function TagsPage() {
  const { tags, posts, initializeData } = useBlogStore();

  useEffect(() => {
    initializeData();
    document.title = '球员/技术标签 - Cityzens 技术博客';
  }, [initializeData]);

  const tagsWithCounts = useMemo(() => {
    return tags.map((tag: TagType) => ({
      ...tag,
      postCount: posts.filter((post: Post) => 
        post.tags && post.tags.some((postTag: TagType) => postTag.id === tag.id)
      ).length
    })).filter((tag: TagType & { postCount: number }) => tag.postCount > 0);
  }, [tags, posts]);

  const sortedTags = useMemo(() => {
    return [...tagsWithCounts].sort((a, b) => b.postCount - a.postCount);
  }, [tagsWithCounts]);

  const popularTags = sortedTags.slice(0, 9); 
  const maxCount = tagsWithCounts.length > 0 ? Math.max(...tagsWithCounts.map(tag => tag.postCount)) : 0;

  const getTagSizeClass = (postCount: number) => {
    if (maxCount === 0) return 'text-base px-3 py-1.5'; 
    const ratio = postCount / maxCount;
    if (ratio > 0.7) return 'text-xl px-5 py-2.5 font-bold';       // 最大号
    if (ratio > 0.5) return 'text-lg px-4 py-2 font-semibold';     // 大号
    if (ratio > 0.3) return 'text-base px-3 py-1.5 font-medium';   // 中号
    if (ratio > 0.1) return 'text-sm px-3 py-1';                 // 小号
    return 'text-xs px-2.5 py-0.5';                             // 最小号
  };

  // if (tagsWithCounts.length === 0 && !posts.length) { 
  //     // 这个条件在 store 数据填充前的初始加载期间可能为 true
  //     // 如果需要，可以考虑从 store 本身获取更稳健的加载状态
  // }

  return (
    <Layout>
      <div className="bg-city-blue-50 min-h-screen pattern-background">
        {/* 头部 - 标签云 */}
        <header className="bg-city-gradient text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-center mb-6 animate-football-bounce">
              <TagIconLucide className="w-20 h-20 md:w-24 md:h-24 text-city-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              蓝月亮 <span className="text-city-gold">标签焦点</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-city-blue-100 max-w-3xl mx-auto">
              通过标签快速定位球员分析、热门技术或精彩瞬间，深入了解 Cityzens 的每一个细节。
            </p>
            {tagsWithCounts.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-city-blue-200">
                    <div className="flex items-center">
                        <Hash className="w-5 h-5 mr-2 text-city-blue-300" />
                        <span>共 {tagsWithCounts.length} 个活跃标签</span>
                    </div>
                    <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-city-blue-300" />
                        <span>总计 {tagsWithCounts.reduce((sum, tag) => sum + tag.postCount, 0)} 次关联</span>
                    </div>
                </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          {tagsWithCounts.length === 0 && posts.length > 0 ? ( // 检查 posts.length 以区别于初始加载状态
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-city-blue-100">
                <CityBadgeIcon className="w-24 h-24 text-city-blue-300 mx-auto mb-8 opacity-60" />
                <h3 className="text-2xl font-semibold text-city-blue-800 mb-3">暂无可用标签</h3>
                <p className="text-city-blue-600 mb-6 max-w-md mx-auto">目前还没有技术标签可供浏览，我们的教练团队正在努力整理中！</p>
                <Link href="/" className="btn-primary">
                    返回首页
                </Link>
            </div>
          ) : tagsWithCounts.length === 0 && posts.length === 0 ? (
            <div className="text-center py-16">
                 <Loader2 className="w-16 h-16 text-city-blue-500 animate-spin mb-6 mx-auto" />
                 <p className="text-city-blue-700 text-xl font-semibold">正在加载标签数据...</p>
            </div>
          ) : (
            <>
              {/* 标签云 */}
              <section className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-city-blue-800 mb-6 md:mb-8 text-center">
                  <Search className="inline-block w-7 h-7 mr-2 text-city-blue-600" /> 探索标签云
                </h2>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-football border border-city-blue-100/50 p-6 md:p-10">
                  <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    {sortedTags.map((tag, index) => {
                      const styleIndex = getStyleIndexForTag(tag.name, index, cityTagStyles.length);
                      return (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.slug}`}
                          className={`rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md border border-transparent hover:border-city-gold/50 ${getTagSizeClass(tag.postCount)} ${cityTagStyles[styleIndex]}`}
                        >
                          #{tag.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 热门标签 */}
              {popularTags.length > 0 && (
                <section className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-city-blue-800 mb-6 md:mb-8 text-center">
                    <TrendingUp className="inline-block w-7 h-7 mr-2 text-city-blue-600" /> 热门球员/技术焦点
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {popularTags.map((tag, index) => {
                      const styleIndex = getStyleIndexForTag(tag.name, index, cityTagStyles.length);
                      return(
                        <div key={tag.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-football hover:shadow-trophy transition-all duration-300 border border-city-blue-100/60 transform hover:scale-[1.02]">
                          <div className="p-5 md:p-6">
                            <div className="flex items-center mb-4">
                              <div className={`p-3 rounded-lg mr-4 ${cityTagStyles[styleIndex]} bg-opacity-20`}>
                                <JerseyNumberIcon number={(index + 1).toString()} className={`w-8 h-8 ${cityTagStyles[styleIndex].replace('btn-tag-', 'text-').replace('-outline','')}`} />
                              </div>
                              <div>
                                <Link href={`/tags/${tag.slug}`}>
                                  <h3 className="text-lg md:text-xl font-semibold text-city-blue-800 hover:text-city-blue-600 transition-colors">
                                    #{tag.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-city-blue-600 flex items-center mt-1">
                                  <FileText className="w-4 h-4 mr-1.5 text-city-blue-400" />
                                  {tag.postCount} 篇相关战报
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                              <Link
                                href={`/tags/${tag.slug}`}
                                className={`btn-secondary text-sm py-1.5 px-3 ${cityTagStyles[styleIndex].includes('gold') || cityTagStyles[styleIndex].includes('green') ? 'hover:!bg-city-blue-600' : '' } `} // 为金色/绿色标签确保对比度
                              >
                                查看焦点 <ChevronRight className="w-4 h-4 inline-block ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 所有标签列表 */}
              <section className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-city-blue-800 mb-6 md:mb-8 text-center">
                  <ListChecks className="inline-block w-7 h-7 mr-2 text-city-blue-600" /> 所有标签清单
                </h2>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-football border border-city-blue-100/50 overflow-hidden">
                  <div className="divide-y divide-city-blue-100">
                    {sortedTags.map((tag, index) => {
                      const styleIndex = getStyleIndexForTag(tag.name, index, cityTagStyles.length);
                      return(
                        <div key={tag.id} className="p-4 md:p-5 hover:bg-city-blue-50/30 transition-colors group">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <span className={`flex items-center justify-center w-7 h-7 rounded-full ${cityTagStyles[styleIndex].replace('btn-tag','bg')} bg-opacity-20 text-sm font-semibold ${cityTagStyles[styleIndex].replace('btn-tag-','text-').replace('-outline','')} mr-3 shrink-0`}>
                                {index + 1}
                              </span>
                              <Link href={`/tags/${tag.slug}`} className="font-medium text-city-blue-800 hover:text-city-blue-600 transition-colors text-base md:text-lg">
                                  #{tag.name}
                              </Link>
                            </div>
                            <div className="flex items-center space-x-4 pl-0 sm:pl-10">
                              <span className="text-sm text-city-blue-600 whitespace-nowrap">
                                {tag.postCount} 篇战报
                              </span>
                              <Link
                                href={`/tags/${tag.slug}`}
                                className={`btn-outline text-xs py-1 px-2.5 ${cityTagStyles[styleIndex].includes('gold') || cityTagStyles[styleIndex].includes('green') ? 'hover:!text-city-blue-700 hover:!border-city-blue-700' : '' }`}
                              >
                                查看 <ChevronRight className="w-3 h-3 inline-block" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 统计数据 */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-city-blue-800 mb-6 md:mb-8 text-center">
                    <PieChart className="inline-block w-7 h-7 mr-2 text-city-blue-600" /> 数据洞察
                </h2>
                <div className="bg-city-blue-700 pattern-background-dark rounded-xl shadow-lg text-white p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-4 bg-city-blue-600/50 rounded-lg">
                      <div className="text-4xl font-bold text-city-gold mb-2">{tagsWithCounts.length}</div>
                      <div className="text-city-blue-100">活跃标签总数</div>
                    </div>
                    <div className="p-4 bg-city-blue-600/50 rounded-lg">
                      <div className="text-4xl font-bold text-city-gold mb-2">
                        {tagsWithCounts.reduce((sum: number, tag: TagType & { postCount: number }) => sum + tag.postCount, 0)}
                      </div>
                      <div className="text-city-blue-100">总关联战报次数</div>
                    </div>
                    <div className="p-4 bg-city-blue-600/50 rounded-lg">
                      <div className="text-4xl font-bold text-city-gold mb-2">
                        {tagsWithCounts.length > 0 ? (tagsWithCounts.reduce((sum: number, tag: TagType & { postCount: number }) => sum + tag.postCount, 0) / tagsWithCounts.length).toFixed(1) : 0}
                      </div>
                      <div className="text-city-blue-100">平均战报关联数</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
