import { User, Category, Tag, Post, Comment, Page, Media } from '@/types';
import { calculateReadingTime } from '@/lib/utils';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: '管理员',
    email: 'admin@blog.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: '博客系统管理员，负责内容审核和系统维护。',
    role: 'admin',
    isActive: true,
    postCount: 0,
    commentCount: 0,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    username: 'author1',
    name: '张三',
    email: 'author1@blog.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=author1',
    bio: '全栈开发工程师，专注于前端技术和用户体验设计。',
    role: 'author',
    isActive: true,
    postCount: 15,
    commentCount: 8,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    username: 'visitor1',
    name: '李四',
    email: 'visitor1@blog.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=visitor1',
    bio: '技术爱好者，喜欢学习新技术和分享经验。',
    role: 'visitor',
    isActive: true,
    postCount: 2,
    commentCount: 12,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: '技术',
    slug: 'technology',
    description: '技术相关文章',
    postCount: 15,
  },
  {
    id: '2',
    name: '前端开发',
    slug: 'frontend',
    description: '前端开发技术',
    parentId: '1',
    postCount: 8,
  },
  {
    id: '3',
    name: '后端开发',
    slug: 'backend',
    description: '后端开发技术',
    parentId: '1',
    postCount: 7,
  },
  {
    id: '4',
    name: '生活',
    slug: 'life',
    description: '生活感悟',
    postCount: 5,
  },
  {
    id: '5',
    name: '旅行',
    slug: 'travel',
    description: '旅行见闻',
    postCount: 3,
  },
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'React', slug: 'react', color: '#61DAFB', postCount: 12 },
  { id: '2', name: 'Next.js', slug: 'nextjs', color: '#000000', postCount: 8 },
  { id: '3', name: 'TypeScript', slug: 'typescript', color: '#3178C6', postCount: 10 },
  { id: '4', name: 'Node.js', slug: 'nodejs', color: '#339933', postCount: 6 },
  { id: '5', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', postCount: 15 },
  { id: '6', name: 'CSS', slug: 'css', color: '#1572B6', postCount: 7 },
  { id: '7', name: 'HTML', slug: 'html', color: '#E34F26', postCount: 5 },
  { id: '8', name: '生活感悟', slug: 'life-thoughts', color: '#FF6B6B', postCount: 4 },
];

// 文章内容常量
const post1Content = `# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性，让我们一起来看看这些改进如何提升开发体验。

## 主要新特性

### 1. Turbopack 稳定版
Turbopack 现在已经稳定，提供了更快的构建速度。

### 2. Server Actions 增强
Server Actions 现在支持更多的用例，包括：
- 表单处理
- 数据变更
- 文件上传

### 3. 改进的缓存策略
新的缓存策略让应用性能更上一层楼。

## 代码示例

\`\`\`typescript
// Server Action 示例
async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  // 处理数据...
}
\`\`\`

这些新特性让 Next.js 14 成为了一个更加强大和高效的全栈框架。`;

const post2Content = `# TypeScript 5.0 实用技巧

TypeScript 5.0 引入了许多实用的新特性，让我们的代码更加类型安全和高效。

## 新特性概览

### 1. Decorators 支持
现在可以使用标准的装饰器语法。

### 2. const 类型参数
新的 const 类型参数让类型推断更加精确。

### 3. 支持 export type *
更好的类型导出支持。

## 实用示例

\`\`\`typescript
// const 类型参数示例
function createArray<const T>(items: readonly T[]): T[] {
  return [...items]
}

const arr = createArray(['a', 'b', 'c'] as const)
// arr 的类型是 ('a' | 'b' | 'c')[]
\`\`\`

这些新特性让 TypeScript 开发体验更加流畅。`;

const post3Content = `# React 18 并发特性深度解析

React 18 引入了并发特性，这是 React 历史上最重要的更新之一。

## 并发特性

### 1. Automatic Batching
自动批处理让状态更新更加高效。

### 2. Transitions
使用 startTransition 来标记非紧急更新。

### 3. Suspense 改进
Suspense 现在支持更多场景。

## 代码示例

\`\`\`jsx
import { startTransition } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])

  const handleChange = (e) => {
    setInput(e.target.value)
    
    startTransition(() => {
      setList(generateList(e.target.value))
    })
  }

  return (
    <div>
      <input value={input} onChange={handleChange} />
      <List items={list} />
    </div>
  )
}
\`\`\`

并发特性让 React 应用的用户体验更加流畅。`;

const post4Content = `# 我的日本旅行记录

这次日本之行让我收获满满，想和大家分享一些美好的回忆。

## 行程安排

### 第一天：东京
- 浅草寺
- 东京塔
- 银座购物

### 第二天：京都
- 清水寺
- 金阁寺
- 祇园

### 第三天：大阪
- 大阪城
- 道顿堀
- 环球影城

## 美食体验

日本的美食真的让人难忘：
- 寿司
- 拉面
- 天妇罗
- 和牛

每一样都让人回味无穷！

## 文化感受

日本的文化礼仪给我留下了深刻印象，人们的礼貌和秩序感让人敬佩。`;

const post5Content = `# Node.js 性能优化实践

在生产环境中，Node.js 应用的性能优化至关重要。

## 优化策略

### 1. 内存管理
- 避免内存泄漏
- 合理使用缓存
- 监控内存使用

### 2. 异步处理
- 使用 Promise 和 async/await
- 避免回调地狱
- 合理使用 Worker Threads

### 3. 数据库优化
- 连接池管理
- 查询优化
- 索引设计

## 实践案例

\`\`\`javascript
// 使用连接池
const pool = new Pool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydb',
  max: 20,
  idleTimeoutMillis: 30000,
})

// 异步处理示例
async function processData(data) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [data.id])
    return result.rows[0]
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}
\`\`\`

通过这些优化策略，可以显著提升 Node.js 应用的性能。`;

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Next.js 14 新特性详解',
    slug: 'nextjs-14-new-features',
    content: post1Content,
    excerpt: 'Next.js 14 带来了许多令人兴奋的新特性，包括 Turbopack 稳定版、Server Actions 增强等...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    status: 'published',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    authorId: '2',
    author: mockUsers[1],
    categoryId: '2',
    category: mockCategories[1],
    tags: [mockTags[1], mockTags[2]],
    views: 1250,
    likes: 89,
    commentsCount: 12,
    readingTime: calculateReadingTime(post1Content),
    isSticky: true,
    seoTitle: 'Next.js 14 新特性详解 - 技术博客',
    seoDescription: '深入了解 Next.js 14 的新特性，包括 Turbopack、Server Actions 等重要更新',
    seoKeywords: ['Next.js', 'React', 'Web开发', '前端'],
  },
  {
    id: '2',
    title: 'TypeScript 5.0 实用技巧',
    slug: 'typescript-5-practical-tips',
    content: post2Content,
    excerpt: 'TypeScript 5.0 引入了许多实用的新特性，包括装饰器支持、const 类型参数等...',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    status: 'published',
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    authorId: '2',
    author: mockUsers[1],
    categoryId: '2',
    category: mockCategories[1],
    tags: [mockTags[2], mockTags[4]],
    views: 980,
    likes: 67,
    commentsCount: 8,
    readingTime: calculateReadingTime(post2Content),
    isSticky: false,
  },
  {
    id: '3',
    title: 'React 18 并发特性深度解析',
    slug: 'react-18-concurrent-features',
    content: post3Content,
    excerpt: 'React 18 引入了并发特性，包括自动批处理、Transitions、Suspense 改进等...',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    publishedAt: new Date('2024-01-05'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    authorId: '1',
    author: mockUsers[0],
    categoryId: '2',
    category: mockCategories[1],
    tags: [mockTags[0], mockTags[4]],
    views: 1500,
    likes: 120,
    commentsCount: 15,
    readingTime: calculateReadingTime(post3Content),
    isSticky: false,
  },
  {
    id: '4',
    title: '我的日本旅行记录',
    slug: 'my-japan-travel-diary',
    content: post4Content,
    excerpt: '分享我的日本旅行经历，包括东京、京都、大阪的美景和美食...',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop',
    status: 'published',
    publishedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    authorId: '1',
    author: mockUsers[0],
    categoryId: '5',
    category: mockCategories[4],
    tags: [mockTags[7]],
    views: 750,
    likes: 45,
    commentsCount: 6,
    readingTime: calculateReadingTime(post4Content),
    isSticky: false,
  },
  {
    id: '5',
    title: 'Node.js 性能优化实践',
    slug: 'nodejs-performance-optimization',
    content: post5Content,
    excerpt: 'Node.js 性能优化的实践经验，包括内存管理、异步处理、数据库优化等...',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    status: 'published',
    publishedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    authorId: '2',
    author: mockUsers[1],
    categoryId: '3',
    category: mockCategories[2],
    tags: [mockTags[3], mockTags[4]],
    views: 890,
    likes: 72,
    commentsCount: 9,
    readingTime: calculateReadingTime(post5Content),
    isSticky: false,
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    content: '这篇文章写得很好，对 Next.js 14 的新特性介绍很详细！',
    authorName: '张三',
    authorEmail: 'zhangsan@example.com',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    postId: '1',
    status: 'approved',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    likes: 5,
  },
  {
    id: '2',
    content: '感谢分享，学到了很多！',
    authorName: '李四',
    authorEmail: 'lisi@example.com',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    postId: '1',
    parentId: '1',
    status: 'approved',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    likes: 3,
  },
  {
    id: '3',
    content: '期待更多关于 TypeScript 的文章',
    authorName: '王五',
    authorEmail: 'wangwu@example.com',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    postId: '2',
    status: 'approved',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    likes: 2,
  },
];

// Mock Pages
export const mockPages: Page[] = [
  {
    id: '1',
    title: '关于我们',
    slug: 'about',
    content: `# 关于我们

欢迎来到我们的技术博客！

## 我们的使命

我们致力于分享最新的技术知识和实践经验，帮助开发者们提升技能。

## 团队介绍

我们是一群热爱技术的开发者，专注于前端、后端和全栈开发。

## 联系我们

如果您有任何问题或建议，欢迎通过以下方式联系我们：

- 邮箱：contact@blog.com
- 微信：blog_team
- QQ群：123456789`,
    template: 'default',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    authorId: '1',
    author: mockUsers[0],
    seoTitle: '关于我们 - 技术博客',
    seoDescription: '了解我们的技术博客团队和使命',
  },
  {
    id: '2',
    title: '联系我们',
    slug: 'contact',
    content: `# 联系我们

我们很乐意听到您的声音！

## 联系方式

### 邮箱
- 商务合作：business@blog.com
- 技术支持：support@blog.com
- 投稿邮箱：submit@blog.com

### 社交媒体
- 微博：@技术博客
- Twitter：@techblog
- GitHub：github.com/techblog

### 地址
北京市朝阳区科技园区123号

## 工作时间
周一至周五：9:00 - 18:00
周末：10:00 - 16:00`,
    template: 'contact',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    authorId: '1',
    author: mockUsers[0],
    seoTitle: '联系我们 - 技术博客',
    seoDescription: '联系我们的技术博客团队',
  },
];

// Mock Media
export const mockMedia: Media[] = [
  {
    id: '1',
    filename: 'nextjs-cover.jpg',
    originalName: 'nextjs-14-cover.jpg',
    mimeType: 'image/jpeg',
    size: 245760,
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=100&fit=crop',
    alt: 'Next.js 14 封面图',
    caption: 'Next.js 14 新特性',
    uploadedBy: '2',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    filename: 'typescript-cover.jpg',
    originalName: 'typescript-5-cover.jpg',
    mimeType: 'image/jpeg',
    size: 198432,
    url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=100&fit=crop',
    alt: 'TypeScript 5.0 封面图',
    caption: 'TypeScript 5.0 特性',
    uploadedBy: '2',
    createdAt: new Date('2024-01-10'),
  },
];

// 添加层级关系
mockCategories[1].children = [];
mockCategories[2].children = [];
mockCategories[0].children = [mockCategories[1], mockCategories[2]];

// 添加评论的嵌套关系
mockComments[0].children = [mockComments[1]]; 