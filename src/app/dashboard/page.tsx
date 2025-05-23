'use client'

import { useState, useEffect, useMemo } from 'react'
import { BarChart, LineChart, PieChart, TrendingUp, Users, BookOpen, MessageCircle, Eye, Heart, Calendar } from 'lucide-react'
import { useBlogStore } from '@/store'
import { formatDate } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { Post, Category, Tag } from '@/types'

// 动态导入 ECharts 组件
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface StatCard {
  title: string
  value: string | number
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: any
  color: string
}

export default function DashboardPage() {
  const { posts, categories, tags, users, initializeData } = useBlogStore()
  const [timeRange, setTimeRange] = useState('month')

  useEffect(() => {
    initializeData()
  }, [initializeData])

  const stats = useMemo(() => {
    const totalPosts = posts.length
    const totalViews = posts.reduce((sum: number, post: Post) => sum + post.views, 0)
    const totalLikes = posts.reduce((sum: number, post: Post) => sum + post.likes, 0)
    const totalComments = posts.reduce((sum: number, post: Post) => sum + (post.commentsCount || 0), 0)

    const statCards: StatCard[] = [
      {
        title: '总文章数',
        value: totalPosts,
        change: '+12%',
        changeType: 'increase',
        icon: BookOpen,
        color: 'text-blue-600'
      },
      {
        title: '总浏览量',
        value: totalViews.toLocaleString(),
        change: '+8%',
        changeType: 'increase',
        icon: Eye,
        color: 'text-green-600'
      },
      {
        title: '总点赞数',
        value: totalLikes.toLocaleString(),
        change: '+15%',
        changeType: 'increase',
        icon: Heart,
        color: 'text-red-600'
      },
      {
        title: '总评论数',
        value: totalComments.toLocaleString(),
        change: '+5%',
        changeType: 'increase',
        icon: MessageCircle,
        color: 'text-purple-600'
      }
    ]

    return statCards
  }, [posts])

  // 文章发布趋势数据
  const publishTrendData = useMemo(() => {
    const monthlyData: { [key: string]: number } = {}
    
    posts.forEach((post: Post) => {
      const date = new Date(post.publishedAt || post.createdAt)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1
    })

    const sortedMonths = Object.keys(monthlyData).sort()
    const last6Months = sortedMonths.slice(-6)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: last6Months.map(month => {
          const [year, monthNum] = month.split('-')
          return `${year}年${monthNum}月`
        })
      },
      yAxis: {
        type: 'value',
        name: '文章数量'
      },
      series: [
        {
          name: '发布文章',
          type: 'line',
          data: last6Months.map(month => monthlyData[month] || 0),
          smooth: true,
          itemStyle: {
            color: '#3B82F6'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
              ]
            }
          }
        }
      ]
    }
  }, [posts])

  // 分类分布数据
  const categoryDistributionData = useMemo(() => {
    const categoryStats = categories.map((category: Category) => {
      const count = posts.filter((post: Post) => post.category.id === category.id).length
      return {
        name: category.name,
        value: count
      }
    }).filter((item: any) => item.value > 0)

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '分类分布',
          type: 'pie',
          radius: '50%',
          data: categoryStats,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }, [posts, categories])

  // 热门标签数据
  const popularTagsData = useMemo(() => {
    const tagStats: { [key: string]: number } = {}
    
    posts.forEach((post: Post) => {
      post.tags.forEach((tag: Tag) => {
        tagStats[tag.name] = (tagStats[tag.name] || 0) + 1
      })
    })

    const sortedTags = Object.entries(tagStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: sortedTags.map(([name]) => name),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '使用次数'
      },
      series: [
        {
          name: '标签使用次数',
          type: 'bar',
          data: sortedTags.map(([, count]) => count),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#10B981' },
                { offset: 1, color: '#059669' }
              ]
            }
          }
        }
      ]
    }
  }, [posts])

  // 热门文章数据
  const popularPostsData = useMemo(() => {
    const sortedPosts = [...posts]
      .sort((a: Post, b: Post) => b.views - a.views)
      .slice(0, 10)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'value',
        name: '浏览量'
      },
      yAxis: {
        type: 'category',
        data: sortedPosts.map((post: Post) => 
          post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title
        ),
        axisLabel: {
          width: 150,
          overflow: 'truncate'
        }
      },
      series: [
        {
          name: '浏览量',
          type: 'bar',
          data: sortedPosts.map((post: Post) => post.views),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#8B5CF6' },
                { offset: 1, color: '#7C3AED' }
              ]
            }
          }
        }
      ]
    }
  }, [posts])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">数据统计</h1>
              <p className="text-gray-600 mt-1">博客数据分析和统计信息</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">最近一周</option>
                <option value="month">最近一月</option>
                <option value="year">最近一年</option>
                <option value="all">全部时间</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className={`flex items-center mt-2 text-sm ${
                      stat.changeType === 'increase' ? 'text-green-600' : 
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 文章发布趋势 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">文章发布趋势</h3>
              <LineChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ReactECharts option={publishTrendData} style={{ height: '100%' }} />
            </div>
          </div>

          {/* 分类分布 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">分类分布</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ReactECharts option={categoryDistributionData} style={{ height: '100%' }} />
            </div>
          </div>

          {/* 热门标签 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">热门标签</h3>
              <BarChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ReactECharts option={popularTagsData} style={{ height: '100%' }} />
            </div>
          </div>

          {/* 热门文章 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">热门文章</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ReactECharts option={popularPostsData} style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">最近活动</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(post.publishedAt || post.createdAt)} • {post.views} 次浏览
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.commentsCount || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 