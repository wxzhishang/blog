import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cityzens 技术博客 - 曼城球迷的技术交流中心',
  description: '一个专注于分享前沿技术、比赛分析、足球文化的曼城球迷专属博客平台。',
  keywords: ['曼城', '技术博客', 'Cityzens', '足球', '英超', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Cityzens 技术团队' }],
  creator: 'Cityzens 技术博客',
  publisher: 'Cityzens 技术博客',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cityzens-blog.example.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://cityzens-blog.example.com',
    title: 'Cityzens 技术博客',
    description: '分享曼城相关的技术见解、比赛分析与足球文化。',
    siteName: 'Cityzens 技术博客',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cityzens 技术博客',
    description: '分享曼城相关的技术见解、比赛分析与足球文化。',
    creator: '@ManCityTech',
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
  themeColor: '#6CABDD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-stadium text-city-blue-900 antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1C2C5C',
              color: '#FFFFFF',
              border: '1px solid #6CABDD',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#6CABDD',
                secondary: '#FFFFFF',
              },
              style: {
                background: '#00A859',
                color: '#FFFFFF',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#FFD700',
                secondary: '#1C2C5C',
              },
              style: {
                background: '#D32F2F',
                color: '#FFFFFF',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 