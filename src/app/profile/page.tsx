'use client';

import { useState, useEffect } from 'react';
import { useBlogStore } from '@/store';
import { User, Post, Comment } from '@/types';
import { 
  User as UserIcon, 
  Edit, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Settings,
  BarChart2,
  Clock
} from 'lucide-react';
import PostCard from '@/components/Post/PostCard';
import { formatDate } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'posts', label: '我的文章', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'favorites', label: '我的收藏', icon: <Heart className="w-5 h-5" /> },
  { id: 'comments', label: '我的评论', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'stats', label: '数据统计', icon: <BarChart2 className="w-5 h-5" /> },
];

export default function ProfilePage() {
  const { currentUser, posts, comments } = useBlogStore();
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      setEditedUser(currentUser);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h1>
          <p className="text-gray-600">登录后即可查看个人中心</p>
        </div>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.authorId === currentUser.id);
  const userComments = comments.filter(comment => comment.authorEmail === currentUser.email);

  const handleSaveProfile = () => {
    // TODO: 实现保存用户信息的逻辑
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            {userPosts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">暂无发布的文章</p>
              </div>
            )}
          </div>
        );
      
      case 'favorites':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: 实现收藏文章列表 */}
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">暂无收藏的文章</p>
            </div>
          </div>
        );
      
      case 'comments':
        return (
          <div className="space-y-6">
            {userComments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900 font-medium mb-2">{comment.content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{comment.likes} 赞</span>
                  </div>
                </div>
              </div>
            ))}
            {userComments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">暂无评论记录</p>
              </div>
            )}
          </div>
        );
      
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">文章数</h3>
              <p className="text-3xl font-bold text-primary-600">{userPosts.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">评论数</h3>
              <p className="text-3xl font-bold text-primary-600">{userComments.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">获赞数</h3>
              <p className="text-3xl font-bold text-primary-600">
                {userPosts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">总浏览量</h3>
              <p className="text-3xl font-bold text-primary-600">
                {userPosts.reduce((sum, post) => sum + post.views, 0)}
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-primary-600" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm border border-gray-200">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editedUser?.name || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="用户名"
                    />
                    <textarea
                      value={editedUser?.bio || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { ...prev, bio: e.target.value } : null)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="个人简介"
                      rows={3}
                    />
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                    <p className="text-gray-600 mb-4">{currentUser.bio || '这个人很懒，什么都没写~'}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>注册于 {formatDate(currentUser.createdAt)}</span>
                      <span>•</span>
                      <span>最后登录 {currentUser.lastLoginAt ? formatDate(new Date(currentUser.lastLoginAt)) : formatDate(currentUser.createdAt)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="w-5 h-5 mr-2" />
                编辑资料
              </button>
            )}
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 标签页内容 */}
        {renderTabContent()}
      </div>
    </div>
  );
} 