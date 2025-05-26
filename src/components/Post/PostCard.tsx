'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Heart, MessageCircle, Clock, User } from 'lucide-react';
import { Post } from '@/types';
import { formatDate, formatRelativeTime, calculateReadingTime } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const isSticky = post.isSticky;
  const estimatedReadingTime = post.readingTime || calculateReadingTime(post.content);

  if (variant === 'compact') {
    return (
      <article className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        {post.coverImage && (
          <div className="flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={80}
              height={60}
              className="rounded-md object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Link href={`/posts/${post.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        {isSticky && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              置顶
            </span>
          </div>
        )}
        
        {post.coverImage && (
          <div className="relative h-64 md:h-80">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Link href={`/categories/${post.category.slug}`}>
                <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 hover:bg-primary-700 transition-colors">
                  {post.category.name}
                </span>
              </Link>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-primary-200 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-200 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author.username}
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

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {isSticky && (
        <div className="bg-red-50 border-l-4 border-red-500 p-2">
          <span className="text-red-700 text-sm font-medium">📌 置顶文章</span>
        </div>
      )}
      
      {post.coverImage && (
        <div className="relative h-48">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Link href={`/categories/${post.category.slug}`}>
            <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors">
              {post.category.name}
            </span>
          </Link>
          <span className="text-sm text-gray-500">
            {formatRelativeTime(post.publishedAt || post.createdAt)}
          </span>
        </div>
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <span 
                className="inline-block px-2 py-1 rounded text-xs font-medium hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: tag.color + '20', 
                  color: tag.color 
                }}
              >
                #{tag.name}
              </span>
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{post.tags.length - 3} 更多
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.username}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
            )}
            <span className="text-sm text-gray-600">{post.author.username}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.commentsCount}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {estimatedReadingTime}分钟
            </span>
          </div>
        </div>
      </div>
    </article>
  );
} 