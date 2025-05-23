'use client';

import { useState, useEffect } from 'react';
import { useBlogStore } from '@/store';
import { Comment } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { 
  MessageCircle, 
  Heart, 
  Reply, 
  Send, 
  User,
  AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  postId: string;
}

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSubmit: () => void;
  onCancel?: () => void;
}

function CommentForm({ postId, parentId, onSubmit, onCancel }: CommentFormProps) {
  const [formData, setFormData] = useState({
    content: '',
    authorName: '',
    authorEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addComment } = useBlogStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim() || !formData.authorName.trim() || !formData.authorEmail.trim()) {
      toast.error('请填写所有必填字段');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        content: formData.content.trim(),
        authorName: formData.authorName.trim(),
        authorEmail: formData.authorEmail.trim(),
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.authorEmail}`,
        postId,
        parentId,
        status: 'approved', // 在实际应用中可能需要审核
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
      };
      
      addComment(newComment);
      
      setFormData({
        content: '',
        authorName: '',
        authorEmail: '',
      });
      
      toast.success('评论发布成功！');
      onSubmit();
    } catch (error) {
      toast.error('评论发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
            姓名 *
          </label>
          <input
            type="text"
            id="authorName"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入您的姓名"
            required
          />
        </div>
        <div>
          <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-1">
            邮箱 *
          </label>
          <input
            type="email"
            id="authorEmail"
            value={formData.authorEmail}
            onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入您的邮箱"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          评论内容 *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="请输入您的评论..."
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>评论将在审核后显示</span>
        </div>
        <div className="flex items-center space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              取消
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? '发布中...' : '发布评论'}
          </button>
        </div>
      </div>
    </form>
  );
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  replyingTo: string | null;
  onCancelReply: () => void;
}

function CommentItem({ comment, onReply, replyingTo, onCancelReply }: CommentItemProps) {
  const { toggleCommentLike, getCommentsByPostId } = useBlogStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    toggleCommentLike(comment.id);
    setIsLiked(!isLiked);
  };

  const handleReply = () => {
    onReply(comment.id);
  };

  // 获取子评论
  const childComments = getCommentsByPostId(comment.postId).filter(
    c => c.parentId === comment.id
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <img
          src={comment.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorEmail}`}
          alt={comment.authorName}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{comment.authorName}</h4>
              <time className="text-sm text-gray-500">
                {formatRelativeTime(comment.createdAt)}
              </time>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>
            
            <button
              onClick={handleReply}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>回复</span>
            </button>
          </div>
          
          {/* 回复表单 */}
          {replyingTo === comment.id && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <CommentForm
                postId={comment.postId}
                parentId={comment.id}
                onSubmit={onCancelReply}
                onCancel={onCancelReply}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* 子评论 */}
      {childComments.length > 0 && (
        <div className="ml-14 space-y-4">
          {childComments.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              onReply={onReply}
              replyingTo={replyingTo}
              onCancelReply={onCancelReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { getCommentsByPostId, initializeData } = useBlogStore();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const comments = getCommentsByPostId(postId);
  const topLevelComments = comments.filter(comment => !comment.parentId);

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleFormSubmit = () => {
    setReplyingTo(null);
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          评论 ({comments.length})
        </h2>
      </div>

      {/* 评论表单 */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">发表评论</h3>
        <CommentForm postId={postId} onSubmit={handleFormSubmit} />
      </div>

      {/* 评论列表 */}
      {topLevelComments.length > 0 ? (
        <div className="space-y-6">
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              replyingTo={replyingTo}
              onCancelReply={handleCancelReply}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无评论</h3>
          <p className="text-gray-600">成为第一个评论的人吧！</p>
        </div>
      )}
    </section>
  );
} 