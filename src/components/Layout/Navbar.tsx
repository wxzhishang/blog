'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import UserAvatar from '@/components/User/UserAvatar';
import { CityBadgeIcon, FootballIcon, TacticsBoardIcon, TrophyIcon, StadiumIcon } from './CityIcons';

const navigation = [
  { 
    name: '主场', 
    href: '/', 
    icon: <StadiumIcon className="w-4 h-4" />,
    description: '首页'
  },
  { 
    name: '战报分析', 
    href: '/posts', 
    icon: <TacticsBoardIcon className="w-4 h-4" />,
    description: '文章'
  },
  { 
    name: '战术分类', 
    href: '/categories', 
    icon: <TacticsBoardIcon className="w-4 h-4" />,
    description: '分类'
  },
  { 
    name: '球员标签', 
    href: '/tags', 
    icon: <FootballIcon className="w-4 h-4" />,
    description: '标签'
  },
  { 
    name: '荣誉殿堂', 
    href: '/archive', 
    icon: <TrophyIcon className="w-4 h-4" />,
    description: '归档'
  },
  { 
    name: '更衣室', 
    href: '/about', 
    icon: <CityBadgeIcon className="w-4 h-4" />,
    description: '关于'
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-gradient-to-r from-city-blue-300 to-city-blue-900 shadow-football relative z-50">
      {/* 背景图案 */}
      <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo区域 - 曼城队徽与博客名称 */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="animate-sail-float">
              <CityBadgeIcon className="w-10 h-10" />
            </div>
            <div className="text-white">
              <span className="text-xl font-bold block leading-tight">Cityzens' Blog</span>
              <span className="text-xs text-city-blue-100 block">蓝月亮技术博客</span>
            </div>
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-city-gold bg-city-blue-800/50 shadow-trophy'
                        : 'text-white hover:text-city-gold hover:bg-city-blue-800/30'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                  
                  {/* 当前页面指示器 (小足球) */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <FootballIcon className="w-4 h-4 animate-football-bounce" />
                    </div>
                  )}
                  
                  {/* 菜单项悬停提示 */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-city-blue-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 桌面端搜索框与用户头像 */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索技术文章..."
                  className="w-64 pl-10 pr-12 py-2 rounded-full border-2 border-city-gold/30 bg-white/90 backdrop-blur-sm focus:border-city-gold focus:outline-none transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-city-blue-600" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-city-gold hover:bg-city-gold/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FootballIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
            
            {/* 用户头像组件 (包含在 relative 容器中以确保下拉菜单正确显示) */}
            <div className="relative z-50">
              <UserAvatar />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            {/* 确保用户头像在移动端菜单按钮之前，以便有足够空间显示下拉菜单 */}
            <div className="relative z-50 mr-2">
              <UserAvatar />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-city-gold hover:bg-city-blue-800/30 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isOpen && (
        <div className="md:hidden bg-city-blue-800/95 backdrop-blur-sm border-t border-city-gold/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* 移动端搜索框 */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索技术文章..."
                  className="w-full pl-10 pr-12 py-2 rounded-full border border-city-gold/30 bg-white/90 focus:border-city-gold focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-city-blue-600" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-city-gold hover:bg-city-gold/80 rounded-full flex items-center justify-center"
                >
                  <FootballIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
            
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-city-gold bg-city-blue-700/50'
                      : 'text-white hover:text-city-gold hover:bg-city-blue-700/30'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <span className="text-xs text-city-blue-200">({item.description})</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
} 