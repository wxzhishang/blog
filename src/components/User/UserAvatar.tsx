'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useBlogStore } from '@/store';
import { User as UserIcon, LogOut, Settings, User as UserProfile, LayoutDashboard } from 'lucide-react';

export default function UserAvatar() {
  const { currentUser } = useBlogStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        <UserIcon className="w-5 h-5 mr-2" />
        登录
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-primary-600" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.email}</p>
          </div>
          
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <UserProfile className="w-4 h-4 mr-2" />
            个人中心
          </Link>
          
          {currentUser.role === 'admin' && (
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              管理面板
            </Link>
          )}
          
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4 mr-2" />
            设置
          </Link>
          
          <button
            onClick={() => {
              // TODO: 实现登出逻辑
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </button>
        </div>
      )}
    </div>
  );
} 