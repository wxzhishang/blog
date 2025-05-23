'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Rss } from 'lucide-react';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterLink[]> = {
    '快速链接': [
      { href: '/', label: '首页' },
      { href: '/posts', label: '文章' },
      { href: '/categories', label: '分类' },
      { href: '/tags', label: '标签' },
    ],
    '关于我们': [
      { href: '/about', label: '关于我们' },
      { href: '/contact', label: '联系我们' },
      { href: '/privacy', label: '隐私政策' },
      { href: '/terms', label: '使用条款' },
    ],
    '技术栈': [
      { href: 'https://nextjs.org', label: 'Next.js', external: true },
      { href: 'https://tailwindcss.com', label: 'Tailwind CSS', external: true },
      { href: 'https://zustand.js.org', label: 'Zustand', external: true },
      { href: 'https://echarts.apache.org', label: 'ECharts', external: true },
    ],
  };

  const socialLinks = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:contact@blog.com', icon: Mail, label: 'Email' },
    { href: '/rss.xml', icon: Rss, label: 'RSS' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold">技术博客</span>
            </div>
            <p className="text-gray-400 mb-4">
              分享最新的技术知识和实践经验，帮助开发者们提升技能。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} 技术博客. 保留所有权利.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">
              由 Next.js 强力驱动
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">服务正常</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 