'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Rss, MapPin, Phone } from 'lucide-react';
import { 
  CityBadgeIcon, 
  FootballIcon, 
  TrophyIcon, 
  StadiumIcon,
  TacticsBoardIcon 
} from './CityIcons';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterLink[]> = {
    '球场导航': [
      { href: '/', label: '主场' },
      { href: '/posts', label: '战报分析' },
      { href: '/categories', label: '战术分类' },
      { href: '/tags', label: '球员标签' },
    ],
    '更衣室': [
      { href: '/about', label: '球队介绍' },
      { href: '/contact', label: '联系教练组' },
      { href: '/privacy', label: '球迷守则' },
      { href: '/terms', label: '球场规则' },
    ],
    '技术装备': [
      { href: 'https://nextjs.org', label: 'Next.js', external: true },
      { href: 'https://tailwindcss.com', label: 'Tailwind CSS', external: true },
      { href: 'https://zustand.js.org', label: 'Zustand', external: true },
      { href: 'https://echarts.apache.org', label: 'ECharts', external: true },
    ],
  };

  const socialLinks = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:contact@cityzensblog.com', icon: Mail, label: 'Email' },
    { href: '/rss.xml', icon: Rss, label: 'RSS' },
  ];

  return (
    <footer className="bg-gradient-to-t from-city-blue-900 via-city-blue-800 to-city-blue-700 text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-pitch-green/10"></div>
        <div className="absolute top-10 right-10 animate-stadium-pulse opacity-5">
          <StadiumIcon className="w-48 h-48" />
        </div>
        <div className="absolute bottom-10 left-10 animate-sail-float opacity-10">
          <CityBadgeIcon className="w-32 h-32" />
        </div>
        {/* 足球装饰 */}
        <div className="absolute top-20 left-1/4 animate-football-bounce opacity-10">
          <FootballIcon className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-football-bounce opacity-10" style={{ animationDelay: '1s' }}>
          <FootballIcon className="w-6 h-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand - 球队标识 */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="animate-sail-float">
                <CityBadgeIcon className="w-12 h-12" />
              </div>
              <div className="ml-3">
                <span className="block text-xl font-bold">Cityzens' Blog</span>
                <span className="text-city-blue-200 text-sm">蓝月亮技术博客</span>
              </div>
            </div>
            
            <p className="text-city-blue-100 mb-6 leading-relaxed">
              在技术的球场上，我们用代码征服每一次挑战，
              像曼城在绿茵场上夺取荣誉一样。💙
            </p>

            {/* 球队信息 */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-city-blue-200">
                <StadiumIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">主场：伊蒂哈德技术球场</span>
              </div>
              <div className="flex items-center text-city-blue-200">
                <TrophyIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">成立于 {currentYear - 3} 年</span>
              </div>
            </div>

            {/* 社交链接 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 bg-city-blue-600/30 hover:bg-city-gold/20 rounded-full flex items-center justify-center text-city-blue-200 hover:text-city-gold transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links - 导航区域 */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-bold mb-4 flex items-center text-city-gold">
                <TacticsBoardIcon className="w-5 h-5 mr-2" />
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-city-blue-200 hover:text-white transition-all duration-200 group"
                      >
                        <FootballIcon className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 group-hover:animate-football-bounce" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center text-city-blue-200 hover:text-white transition-all duration-200 group"
                      >
                        <FootballIcon className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 group-hover:animate-football-bounce" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar - 荣誉栏 */}
        <div className="border-t border-city-blue-600/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <TrophyIcon className="w-5 h-5 mr-2 text-city-gold animate-trophy-glow" />
              <p className="text-city-blue-200 text-sm">
                © {currentYear} Cityzens' Blog. 蓝月亮永远辉煌. ⚽
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <CityBadgeIcon className="w-4 h-4" />
                <span className="text-city-blue-200 text-sm">
                  由 Next.js 强力驱动
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pitch-green rounded-full animate-pulse"></div>
                <span className="text-city-blue-200 text-sm">球场状态良好</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-city-blue-600/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <FootballIcon className="w-3 h-3 text-city-gold animate-football-bounce" />
                <span className="text-city-blue-100 text-xs font-medium">CTID 💙</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部草皮效果 */}
      <div className="h-1 bg-gradient-to-r from-pitch-green via-city-gold to-pitch-green"></div>
    </footer>
  );
} 