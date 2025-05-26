'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useBlogStore } from '@/store';
import { User as UserIcon, LogOut, Settings, User as UserProfile, LayoutDashboard, Crown } from 'lucide-react';
import { CityBadgeIcon, FootballIcon, TrophyIcon, CaptainBandIcon } from '@/components/Layout/CityIcons';

export default function UserAvatar() {
  const { currentUser } = useBlogStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 使用 useCallback 优化点击外部区域关闭下拉菜单的事件处理函数
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // 使用 useCallback 优化切换下拉菜单显示状态的函数
  const toggleDropdown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  // 处理菜单项点击事件，点击后关闭下拉菜单
  const handleMenuItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="flex items-center px-4 py-2 bg-white/90 hover:bg-white text-city-blue-800 hover:text-city-blue-900 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105 shadow-sm"
      >
        <UserIcon className="w-5 h-5 mr-2" />
        <span className="font-medium">加入球队</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-city-gold"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-city-blue-600 flex items-center justify-center border-2 border-city-gold">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* 用户角色徽章 (例如管理员的皇冠) */}
          {currentUser.role === 'admin' && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-city-gold rounded-full flex items-center justify-center">
              <Crown className="w-2 h-2 text-city-blue-900" />
            </div>
          )}
        </div>
        
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">{currentUser.name}</p>
          <p className="text-xs text-city-blue-100">
            {currentUser.role === 'admin' ? '主教练' : '球员'}
          </p>
        </div>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-trophy border-l-4 border-city-blue-300 py-2 z-50 backdrop-blur-sm"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          {/* 下拉菜单头部 - 用户信息 */}
          <div className="px-4 py-3 border-b border-city-blue-100 bg-gradient-to-r from-city-blue-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-city-blue-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-city-blue-300 flex items-center justify-center border-2 border-city-blue-400">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                
                {currentUser.role === 'admin' && (
                  <div className="absolute -bottom-1 -right-1">
                    <CaptainBandIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-bold text-city-blue-900">{currentUser.name}</p>
                <p className="text-xs text-city-blue-600">{currentUser.email}</p>
                <div className="flex items-center mt-1">
                  <FootballIcon className="w-3 h-3 mr-1 text-city-blue-400" />
                  <span className="text-xs text-city-blue-500">
                    {currentUser.role === 'admin' ? '主教练' : '球员'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 下拉菜单项 */}
          <div className="py-1" role="none">
            <Link
              href="/profile"
              className="flex items-center px-4 py-3 text-sm text-city-blue-800 hover:bg-city-blue-50 hover:text-city-blue-900 transition-all duration-200 group"
              onClick={handleMenuItemClick}
              role="menuitem"
            >
              <UserProfile className="w-4 h-4 mr-3 text-city-blue-600 group-hover:text-city-blue-800" />
              <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">球员档案</span>
              <CityBadgeIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            
            {currentUser.role === 'admin' && (
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-3 text-sm text-city-blue-800 hover:bg-gradient-to-r hover:from-city-gold/10 hover:to-city-blue-50 hover:text-city-blue-900 transition-all duration-200 group"
                onClick={handleMenuItemClick}
                role="menuitem"
              >
                <LayoutDashboard className="w-4 h-4 mr-3 text-city-gold group-hover:text-city-gold" />
                <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200 font-medium">教练席</span>
                <TrophyIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-city-gold" />
              </Link>
            )}
            
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-sm text-city-blue-800 hover:bg-city-blue-50 hover:text-city-blue-900 transition-all duration-200 group"
              onClick={handleMenuItemClick}
              role="menuitem"
            >
              <Settings className="w-4 h-4 mr-3 text-city-blue-600 group-hover:text-city-blue-800" />
              <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">训练设置</span>
              <FootballIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            
            <hr className="my-2 border-city-blue-200" />
            
            <button
              onClick={() => {
                // TODO: 实现登出逻辑
                handleMenuItemClick();
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 mr-3 group-hover:text-red-700" />
              <span className="flex-1 text-left group-hover:translate-x-1 transition-transform duration-200">离开球队</span>
              <div className="w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
          
          {/* 下拉菜单底部装饰 */}
          <div className="px-4 py-2 border-t border-city-blue-100 bg-gradient-to-r from-city-blue-50 to-transparent">
            <div className="flex items-center justify-center space-x-2 text-xs text-city-blue-500">
              <FootballIcon className="w-3 h-3 animate-football-bounce" />
              <span>Cityzens Forever</span>
              <span className="text-city-gold">💙</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 