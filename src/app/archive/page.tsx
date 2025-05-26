'use client'

import { useEffect, useState } from 'react'
// import { Metadata } from 'next' // Metadata 在客户端组件中通常由父级 Layout 处理或通过动态方式设置
import Link from 'next/link'
import { CalendarDays, BarChart3, ChevronDown, ChevronRight, History, Medal, Award } from 'lucide-react' // 更新的图标
import { useBlogStore } from '@/store'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types'
import Layout from '@/components/Layout/Layout'; // 引入布局组件
import { CityBadgeIcon, FootballIcon, TrophyIcon, StadiumIcon } from '@/components/Layout/CityIcons'; // 引入曼城主题图标

// 由于这是客户端组件，Metadata 通常在父组件 (如 layout.tsx) 中通过 generateMetadata 函数进行设置，
// 或者可以在 useEffect Hook 中动态设置 document.title。
// export const metadata: Metadata = {
//   title: '蓝月亮荣誉室 - 历史战报回顾',
//   description: '回顾 Cityzens 的每一个辉煌赛季和经典战报，见证冠军之路。',
//   keywords: ['曼城历史', '比赛回顾', '冠军赛季', 'Cityzens战报', '荣誉室'],
// }

interface MonthGroup {
  month: number
  monthName: string
  posts: Post[]
  count: number
}

interface ArchiveGroup {
  year: number
  months: MonthGroup[]
  totalPosts: number
}

export default function ArchivePage() {
  const { posts } = useBlogStore()
  const [archiveGroups, setArchiveGroups] = useState<ArchiveGroup[]>([])
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([new Date().getFullYear()]))

  useEffect(() => {
    // 动态设置页面标题
    document.title = '蓝月亮荣誉室 - Cityzens 技术博客';

    const groups = posts.reduce((acc: ArchiveGroup[], post: Post) => {
      const date = new Date(post.publishedAt || post.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const monthName = new Date(year, month - 1).toLocaleDateString('zh-CN', { month: 'long' })

      let yearGroup = acc.find(g => g.year === year)
      if (!yearGroup) {
        yearGroup = { year, months: [], totalPosts: 0 }
        acc.push(yearGroup)
      }

      let monthGroup = yearGroup.months.find(m => m.month === month)
      if (!monthGroup) {
        monthGroup = { month, monthName, posts: [], count: 0 }
        yearGroup.months.push(monthGroup)
      }

      monthGroup.posts.push(post)
      monthGroup.count = monthGroup.posts.length
      yearGroup.totalPosts += 1
      return acc
    }, [])

    groups.sort((a: ArchiveGroup, b: ArchiveGroup) => b.year - a.year)
    groups.forEach((group: ArchiveGroup) => {
      group.months.sort((a: MonthGroup, b: MonthGroup) => b.month - a.month)
      group.months.forEach((month: MonthGroup) => {
        month.posts.sort((a: Post, b: Post) => 
          new Date(b.publishedAt || b.createdAt).getTime() - 
          new Date(a.publishedAt || a.createdAt).getTime()
        )
      })
    })

    setArchiveGroups(groups)
  }, [posts])

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  const totalPosts = posts.length
  const totalYears = archiveGroups.length

  return (
    <Layout>
      <div className="min-h-screen bg-city-blue-50 pattern-background">
        {/* 头部 - 荣誉室 */}
        <header className="bg-city-gradient text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-center mb-6 animate-sail-float">
              <TrophyIcon className="w-20 h-20 md:w-24 md:h-24 text-city-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              蓝月亮<span className="text-city-gold">荣誉室</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-city-blue-100 max-w-3xl mx-auto">
              回顾 Cityzens 的每一个辉煌赛季和经典战报，共同见证冠军之路的点点滴滴。
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-city-blue-200">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-city-blue-300" />
                <span>跨越 {totalYears} 个赛季</span>
              </div>
              <div className="flex items-center">
                <History className="w-5 h-5 mr-2 text-city-blue-300" />
                <span>共 {totalPosts} 篇辉煌战报</span>
              </div>
            </div>
          </div>
        </header>

        {/* 归档内容 - 历史回顾 */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          {archiveGroups.length === 0 ? (
            <div className="text-center py-16">
              <StadiumIcon className="w-20 h-20 text-city-blue-200 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-city-blue-800 mb-3">荣誉室正在建设中...</h3>
              <p className="text-city-blue-600">很快这里将填满辉煌的记录！</p>
            </div>
          ) : (
            <div className="space-y-8">
              {archiveGroups.map((yearGroup) => (
                <div key={yearGroup.year} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-football border border-city-blue-100 overflow-hidden">
                  {/* 年度头部 - 赛季回顾 */}
                  <button
                    onClick={() => toggleYear(yearGroup.year)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-city-blue-50 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center">
                      {expandedYears.has(yearGroup.year) ? (
                        <ChevronDown className="w-6 h-6 text-city-blue-500 mr-3" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-city-blue-500 mr-3" />
                      )}
                      <h2 className="text-2xl font-bold text-city-blue-700 flex items-center">
                        <Award className="w-7 h-7 mr-2 text-city-gold opacity-80" /> 
                        {yearGroup.year} <span className="text-lg ml-1 font-medium text-city-blue-600 hidden sm:inline">赛季</span>
                      </h2>
                    </div>
                    <span className="text-sm text-city-blue-600 bg-city-blue-100 px-3 py-1.5 rounded-full font-medium">
                      {yearGroup.totalPosts} 篇战报
                    </span>
                  </button>

                  {/* 年度内容 - 月度战报 */}
                  {expandedYears.has(yearGroup.year) && (
                    <div className="border-t border-city-blue-100">
                      {yearGroup.months.map((monthGroup) => (
                        <div key={monthGroup.month} className="border-b border-city-blue-100 last:border-b-0">
                          {/* 月度头部 */}
                          <div className="px-6 py-3 bg-city-blue-50/70 border-b border-city-blue-100">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-city-blue-800 text-lg">
                                {monthGroup.monthName}
                              </h3>
                              <span className="text-xs text-city-blue-700 bg-white px-2 py-1 rounded-md shadow-sm">
                                {monthGroup.count} 篇
                              </span>
                            </div>
                          </div>

                          {/* 文章列表 - 战报列表 */}
                          <div className="divide-y divide-city-blue-100">
                            {monthGroup.posts.map((post) => (
                              <article key={post.id} className="px-6 py-5 hover:bg-city-blue-50/50 transition-colors duration-150 group">
                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                  <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                                    <Link
                                      href={`/posts/${post.slug}`}
                                      className="block"
                                    >
                                      <h4 className="text-lg md:text-xl font-semibold text-city-blue-800 group-hover:text-city-blue-600 transition-colors mb-1.5">
                                        {post.title}
                                      </h4>
                                      <p className="text-city-blue-700 text-sm line-clamp-2 mb-2 leading-relaxed">
                                        {post.excerpt}
                                      </p>
                                      <div className="flex items-center text-xs text-city-blue-500 space-x-3">
                                        <span>{formatDate(post.publishedAt)}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="hidden sm:inline">{post.readingTime} 分钟阅读</span>
                                        <span className="hidden md:inline">•</span>
                                        <span className="hidden md:inline">{post.views} 次浏览</span>
                                        {post.category && (
                                            <>
                                              <span className="hidden sm:inline">•</span>
                                              <span className="font-medium text-city-blue-600 hidden sm:inline">{post.category.name}</span>
                                            </>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                  
                                  {/* 标签 - 战术标签 */}
                                  {post.tags && post.tags.length > 0 && (
                                    <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex flex-wrap gap-2 items-start shrink-0">
                                      {post.tags.slice(0, 2).map((tag: any) => (
                                        <Link
                                          key={tag.id}
                                          href={`/tags/${tag.slug}`}
                                          className="btn-secondary text-xs px-2.5 py-1" // 使用现有主题按钮样式的小号版本
                                        >
                                          {tag.name}
                                        </Link>
                                      ))}
                                      {post.tags.length > 2 && (
                                        <span className="inline-block px-2.5 py-1 text-xs bg-city-blue-100 text-city-blue-700 rounded-md font-medium">
                                          +{post.tags.length - 2}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* 统计区域 - 荣誉数据 */}
        <section className="bg-city-blue-700 pattern-background-dark text-white mt-12 md:mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-10">
              <BarChart3 className="w-10 h-10 text-city-gold mx-auto mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">荣誉数据总览</h3>
              <p className="text-city-blue-200">量化 Cityzens 的辉煌历程</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: '总战报数', value: totalPosts, icon: <History className="w-7 h-7 text-city-blue-300 group-hover:text-city-gold transition-colors" /> },
                { label: '辉煌赛季', value: totalYears, icon: <CalendarDays className="w-7 h-7 text-city-blue-300 group-hover:text-city-gold transition-colors" /> },
                { label: '记录月份', value: archiveGroups.reduce((sum, year) => sum + year.months.length, 0), icon: <Medal className="w-7 h-7 text-city-blue-300 group-hover:text-city-gold transition-colors" /> },
                { label: '赛季平均战报', value: Math.round(totalPosts / Math.max(totalYears, 1)) || 0, icon: <Award className="w-7 h-7 text-city-blue-300 group-hover:text-city-gold transition-colors" /> }
              ].map(stat => (
                <div key={stat.label} className="text-center p-4 bg-city-blue-600/50 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-city-blue-500 mx-auto mb-3 group-hover:bg-city-gold/20 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-city-gold mb-1">{stat.value}</div>
                  <div className="text-sm text-city-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
} 