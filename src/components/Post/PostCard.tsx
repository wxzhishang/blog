'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Heart, MessageCircle, Clock, User, Zap, Tag, Star } from 'lucide-react'; // 添加了 Zap, Tag, Star 图标
import { Post } from '@/types';
import { formatDate, formatRelativeTime, calculateReadingTime } from '@/lib/utils';
import { FootballIcon, TrophyIcon, CaptainBandIcon, JerseyNumberIcon } from '@/components/Layout/CityIcons'; // 曼城主题图标

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
  className?: string; // 允许传递额外的 class
}

export default function PostCard({ post, variant = 'default', className = '' }: PostCardProps) {
  const isSticky = post.isSticky;
  const estimatedReadingTime = post.readingTime || calculateReadingTime(post.content);
  const categoryName = post.category?.name || '战术分析';
  const categorySlug = post.category?.slug || 'general';

  const cardBaseClasses = "transition-all duration-300 transform";
  const cardHoverClasses = "hover:shadow-trophy hover:-translate-y-1 hover:border-city-blue-300";

  if (variant === 'compact') {
    return (
      <article className={`flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-football border border-city-blue-100/50 ${cardBaseClasses} ${cardHoverClasses} ${className}`}>
        {post.coverImage && (
          <div className="flex-shrink-0 w-20 h-16 md:w-24 md:h-20 relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Link href={`/posts/${post.slug}`}>
            <h3 className="text-base md:text-lg font-semibold text-city-blue-800 hover:text-city-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-3 mt-2 text-xs md:text-sm text-city-blue-500">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-city-blue-400" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center">
              <Eye className="w-3.5 h-3.5 mr-1 text-city-blue-400" />
              {post.views || 0}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className={`relative bg-city-blue-800 rounded-xl shadow-lg overflow-hidden ${cardBaseClasses} hover:shadow-xl hover:-translate-y-1.5 ${className}`}>
        {isSticky && (
          <div className="absolute top-3 left-3 z-10 flex items-center bg-city-gold text-city-blue-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            <CaptainBandIcon className="w-4 h-4 mr-1.5" /> 置顶推荐
          </div>
        )}
        
        {post.coverImage && (
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
              <Link href={`/categories/${categorySlug}`}>
                <span className="inline-block bg-city-gold text-city-blue-900 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 hover:bg-yellow-300 transition-colors shadow">
                  {categoryName}
                </span>
              </Link>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 hover:text-city-gold transition-colors line-clamp-2 sm:line-clamp-3">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && <p className="text-city-blue-100 mb-3 text-sm sm:text-base line-clamp-2">{post.excerpt}</p>}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-3 text-city-blue-200">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author?.username || '蓝月亮小编'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatRelativeTime(post.publishedAt || post.createdAt)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {estimatedReadingTime} 分钟阅读
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }

  // 默认变体
  return (
    <article className={`bg-white rounded-xl shadow-football overflow-hidden border border-city-blue-100/70 ${cardBaseClasses} ${cardHoverClasses} ${className}`}>
      {isSticky && (
        <div className="bg-city-gold/10 border-l-4 border-city-gold p-3 flex items-center">
          <CaptainBandIcon className="w-5 h-5 mr-2 text-city-gold" /> 
          <span className="text-city-gold text-sm font-semibold">置顶战报</span>
        </div>
      )}
      
      {post.coverImage && (
        <div className="relative h-48 md:h-52 w-full group">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
        </div>
      )}
      
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <Link href={`/categories/${categorySlug}`}>
            <span className="inline-block bg-city-blue-100 text-city-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-city-blue-200 hover:text-city-blue-800 transition-colors">
              {categoryName}
            </span>
          </Link>
          <span className="text-xs text-city-blue-500">
            {formatRelativeTime(post.publishedAt || post.createdAt)}
          </span>
        </div>
        
        <Link href={`/posts/${post.slug}
`}>
          <h2 className="text-lg md:text-xl font-bold text-city-blue-900 mb-2 hover:text-city-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {post.excerpt && <p className="text-city-blue-700 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <span 
                  className="btn-secondary text-xs px-2.5 py-1 flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1 opacity-70"/> {tag.name}
                </span>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-city-blue-500 bg-city-blue-50 px-2 py-1 rounded-md">
                +{post.tags.length - 3} 更多
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-city-blue-100">
          <div className="flex items-center space-x-2 mb-3 sm:mb-0">
            {post.author?.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.username || 'author'}
                width={28}
                height={28}
                className="rounded-full border-2 border-city-blue-200"
              />
            ) : (
              <div className="w-7 h-7 bg-city-blue-200 rounded-full flex items-center justify-center border-2 border-city-blue-300">
                <User className="w-4 h-4 text-city-blue-600" />
              </div>
            )}
            <span className="text-sm text-city-blue-700 font-medium">{post.author?.username || '蓝月亮小编'}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-city-blue-500">
            <span className="flex items-center" title="浏览量">
              <Eye className="w-4 h-4 mr-1 text-city-blue-400" />
              {post.views || 0}
            </span>
            <span className="flex items-center" title="点赞数">
              <Heart className="w-4 h-4 mr-1 text-city-blue-400" />
              {post.likes || 0}
            </span>
            {/* <span className="flex items-center" title="评论数">
              <MessageCircle className="w-4 h-4 mr-1 text-city-blue-400" />
              {post.commentsCount || 0}
            </span> */}
            <span className="flex items-center" title="阅读时间">
              <Clock className="w-4 h-4 mr-1 text-city-blue-400" />
              {estimatedReadingTime}分钟
            </span>
          </div>
        </div>
      </div>
    </article>
  );
} 
