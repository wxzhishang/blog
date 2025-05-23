import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '技术博客 - 分享最新技术知识',
  description: '一个专注于技术分享的博客平台，涵盖前端、后端、全栈开发等技术内容',
  keywords: ['技术博客', '前端开发', '后端开发', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: '技术博客团队' }],
  creator: '技术博客',
  publisher: '技术博客',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blog.example.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.example.com',
    title: '技术博客',
    description: '分享最新技术知识和实践经验',
    siteName: '技术博客',
  },
  twitter: {
    card: 'summary_large_image',
    title: '技术博客',
    description: '分享最新技术知识和实践经验',
    creator: '@techblog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 