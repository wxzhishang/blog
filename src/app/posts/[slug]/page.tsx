'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import MarkdownRenderer from '@/components/Post/MarkdownRenderer';
import PostCard from '@/components/Post/PostCard';
import CommentSection from '@/components/Comment/CommentSection';
import { useBlogStore } from '@/store';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Tag, 
  User,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const {
    posts,
    currentPost,
    setCurrentPost,
    getPostBySlug,
    incrementPostViews,
    togglePostLike,
    initializeData
  } = useBlogStore();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    if (slug && posts.length > 0) {
      const post = getPostBySlug(slug);
      if (post) {
        setCurrentPost(post);
        incrementPostViews(post.id);
      }
    }
  }, [slug, posts, getPostBySlug, setCurrentPost, incrementPostViews]);

  const handleLike = () => {
    if (currentPost) {
      togglePostLike(currentPost.id);
      setIsLiked(!isLiked);
    }
  };

  const handleShare = async () => {
    if (currentPost) {
      try {
        await navigator.share({
          title: currentPost.title,
          text: currentPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
      }
    }
  };

  if (!currentPost) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>
      </Layout>
    );
  }

  // 获取相关文章（同分类或同标签）
  const relatedPosts = posts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.categoryId === currentPost.categoryId || 
       post.tags.some(tag => currentPost.tags.some(currentTag => currentTag.id === tag.id)))
    )
    .slice(0, 3);

  return (
    <Layout>
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回文章列表
          </Link>
        </div>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {currentPost.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {currentPost.excerpt}
          </p>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{currentPost.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(currentPost.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{currentPost.readingTime} 分钟阅读</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{currentPost.views} 次阅读</span>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentPost.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: tag.color + '20',
                  color: tag.color,
                }}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag.name}
              </Link>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isLiked
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              <span>{currentPost.likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </button>
          </div>
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none mb-12">
          <MarkdownRenderer content={currentPost.content} />
        </div>

        {/* 文章底部信息 */}
        <footer className="border-t pt-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={currentPost.author.avatar}
                alt={currentPost.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{currentPost.author.name}</h3>
                <p className="text-sm text-gray-600">{currentPost.author.bio}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">发布于</p>
              <p className="font-medium text-gray-900">{formatDate(currentPost.publishedAt)}</p>
            </div>
          </div>
        </footer>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-primary-600" />
              相关文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* 评论区 */}
        <CommentSection postId={currentPost.id} />
      </article>
    </Layout>
  );
} 