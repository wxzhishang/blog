'use client'

import { useState, useMemo } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ChevronDown, ChevronRight } from 'lucide-react'
import { useBlogStore } from '@/store'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types'

// 由于这是客户端组件，我们需要在父组件中设置metadata
// export const metadata: Metadata = {
//   title: '文章归档 - 技术博客',
//   description: '按时间浏览所有技术文章',
//   keywords: ['归档', '文章列表', '技术博客', '时间线'],
// }

interface ArchiveGroup {
  year: number
  months: {
    month: number
    monthName: string
    posts: Post[]
    count: number
  }[]
  totalPosts: number
}

export default function ArchivePage() {
  const { posts } = useBlogStore()
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([new Date().getFullYear()]))

  // 按年份和月份分组文章
  const archiveData = useMemo(() => {
    const grouped: { [year: number]: { [month: number]: Post[] } } = {}
    
    posts.forEach((post: Post) => {
      const date = new Date(post.publishedAt || post.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      
      if (!grouped[year]) {
        grouped[year] = {}
      }
      if (!grouped[year][month]) {
        grouped[year][month] = []
      }
      
      grouped[year][month].push(post)
    })

    // 转换为排序的数组格式
    const archiveGroups: ArchiveGroup[] = Object.keys(grouped)
      .map(year => parseInt(year))
      .sort((a, b) => b - a) // 按年份降序
      .map(year => {
        const months = Object.keys(grouped[year])
          .map(month => parseInt(month))
          .sort((a, b) => b - a) // 按月份降序
          .map(month => ({
            month,
            monthName: new Date(year, month - 1).toLocaleDateString('zh-CN', { month: 'long' }),
            posts: grouped[year][month].sort((a, b) => 
              new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
            ),
            count: grouped[year][month].length
          }))

        return {
          year,
          months,
          totalPosts: months.reduce((sum, m) => sum + m.count, 0)
        }
      })

    return archiveGroups
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
  const totalYears = archiveData.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">文章归档</h1>
            <p className="text-lg text-gray-600 mb-6">
              按时间浏览所有技术文章，探索我们的知识历程
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>共 {totalYears} 年</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>总计 {totalPosts} 篇文章</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archive Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {archiveData.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
            <p className="text-gray-500">还没有发布任何文章</p>
          </div>
        ) : (
          <div className="space-y-6">
            {archiveData.map((yearGroup) => (
              <div key={yearGroup.year} className="bg-white rounded-lg shadow-sm border">
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(yearGroup.year)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    {expandedYears.has(yearGroup.year) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-900">
                      {yearGroup.year} 年
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {yearGroup.totalPosts} 篇文章
                  </span>
                </button>

                {/* Year Content */}
                {expandedYears.has(yearGroup.year) && (
                  <div className="border-t">
                    {yearGroup.months.map((monthGroup) => (
                      <div key={monthGroup.month} className="border-b last:border-b-0">
                        {/* Month Header */}
                        <div className="px-6 py-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                              {monthGroup.monthName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {monthGroup.count} 篇
                            </span>
                          </div>
                        </div>

                        {/* Posts List */}
                        <div className="divide-y">
                          {monthGroup.posts.map((post) => (
                            <article key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <Link
                                    href={`/posts/${post.slug}`}
                                    className="block group"
                                  >
                                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                      {post.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                      {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                                      <span>{formatDate(post.publishedAt)}</span>
                                      <span>•</span>
                                      <span>{post.readingTime} 分钟阅读</span>
                                      <span>•</span>
                                      <span>{post.views} 次浏览</span>
                                    </div>
                                  </Link>
                                </div>
                                
                                {/* Tags */}
                                <div className="ml-4 flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map((tag: any) => (
                                    <Link
                                      key={tag.id}
                                      href={`/tags/${tag.slug}`}
                                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                                    >
                                      {tag.name}
                                    </Link>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                      +{post.tags.length - 2}
                                    </span>
                                  )}
                                </div>
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
      </div>

      {/* Statistics */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">归档统计</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPosts}</div>
                <div className="text-sm text-gray-500">总文章数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalYears}</div>
                <div className="text-sm text-gray-500">活跃年份</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {archiveData.reduce((sum, year) => sum + year.months.length, 0)}
                </div>
                <div className="text-sm text-gray-500">活跃月份</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(totalPosts / Math.max(totalYears, 1))}
                </div>
                <div className="text-sm text-gray-500">年均文章</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 