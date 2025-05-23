# 技术博客系统

一个功能完整的现代化博客系统，基于 Next.js 14、TypeScript、Tailwind CSS 和 Zustand 构建。

## 🚀 功能特性

### 核心功能
- **文章管理**: 完整的CRUD操作，支持Markdown编辑
- **分类系统**: 层级分类管理，支持嵌套分类
- **标签系统**: 灵活的标签管理和筛选
- **评论系统**: 嵌套评论，支持点赞和回复
- **搜索功能**: 全文搜索，支持高级筛选
- **用户系统**: 用户注册、登录、权限管理

### 展示功能
- **响应式设计**: 完美适配桌面端和移动端
- **SEO优化**: 完整的元数据和结构化数据
- **文章归档**: 按时间归档文章
- **热门推荐**: 基于浏览量和点赞的推荐算法
- **社交分享**: 支持多平台分享
- **代码高亮**: 支持多种编程语言语法高亮

### 管理功能
- **数据统计**: 使用ECharts展示各种统计图表
- **文章管理**: 批量操作、筛选、排序
- **用户管理**: 角色权限管理
- **系统设置**: 博客配置和主题设置

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **状态管理**: Zustand
- **图表库**: ECharts
- **Markdown**: react-markdown + remark/rehype
- **图标库**: Lucide React
- **代码高亮**: Prism.js

## 📦 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── about/             # 关于页面
│   ├── admin/             # 管理后台
│   ├── archive/           # 文章归档
│   ├── categories/        # 分类页面
│   ├── dashboard/         # 数据统计
│   ├── posts/             # 文章相关页面
│   ├── search/            # 搜索页面
│   ├── tags/              # 标签页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── Comment/           # 评论组件
│   ├── Layout/            # 布局组件
│   └── Post/              # 文章组件
├── data/                  # Mock 数据
├── lib/                   # 工具函数
├── store/                 # Zustand 状态管理
└── types/                 # TypeScript 类型定义
```

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm start
```

## 📱 页面功能

### 首页 (/)
- Hero 区域展示
- 精选文章轮播
- 最新文章列表
- 侧边栏（热门文章、分类、标签）

### 文章页面 (/posts)
- 文章列表展示
- 搜索和筛选功能
- 分页导航
- 多种视图模式

### 文章详情 (/posts/[slug])
- Markdown 内容渲染
- 代码语法高亮
- 作者信息展示
- 相关文章推荐
- 评论系统

### 分类页面 (/categories)
- 分类层级展示
- 分类统计信息
- 分类文章列表

### 标签页面 (/tags)
- 标签云展示
- 热门标签排行
- 标签文章列表

### 归档页面 (/archive)
- 按年份月份归档
- 可折叠的时间线视图
- 归档统计信息

### 搜索页面 (/search)
- 全文搜索功能
- 高级筛选选项
- 搜索结果排序
- 搜索建议

### 关于页面 (/about)
- 博客介绍
- 团队成员展示
- 联系方式
- 统计数据

### 数据统计 (/dashboard)
- 文章发布趋势图
- 分类分布饼图
- 热门标签排行
- 浏览量统计
- 最近活动列表

### 管理后台 (/admin)
- 文章管理表格
- 批量操作功能
- 高级筛选
- 统计概览

## 🎨 设计特色

### 现代化UI
- 简洁优雅的设计风格
- 一致的视觉语言
- 流畅的交互动画
- 深色/浅色主题支持

### 响应式布局
- 移动端优先设计
- 灵活的网格系统
- 自适应图片和媒体
- 触摸友好的交互

### 性能优化
- 图片懒加载
- 代码分割
- 静态生成
- 缓存策略

## 🔧 配置说明

### 环境变量
创建 `.env.local` 文件：
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=技术博客
```

### 自定义配置
- `tailwind.config.js`: Tailwind CSS 配置
- `next.config.js`: Next.js 配置
- `tsconfig.json`: TypeScript 配置

## 📊 数据结构

### 文章 (Post)
```typescript
interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  updatedAt: string
  author: User
  category: Category
  tags: Tag[]
  views: number
  likes: number
  comments: Comment[]
  readingTime: number
  featured: boolean
}
```

### 用户 (User)
```typescript
interface User {
  id: string
  username: string
  name: string
  email: string
  avatar: string
  bio: string
  role: 'admin' | 'author' | 'user'
  createdAt: string
}
```

### 分类 (Category)
```typescript
interface Category {
  id: string
  name: string
  slug: string
  description: string
  parentId?: string
  children?: Category[]
  postCount: number
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发计划

### 即将推出
- [ ] 用户认证系统
- [ ] 文章编辑器
- [ ] 图片上传功能
- [ ] RSS 订阅
- [ ] 邮件通知
- [ ] 多语言支持

### 长期规划
- [ ] 插件系统
- [ ] 主题定制
- [ ] API 接口
- [ ] 移动应用
- [ ] 性能监控
- [ ] 安全加固

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [ECharts](https://echarts.apache.org/)
- [Lucide](https://lucide.dev/)

## 📞 联系我们

- 邮箱: contact@techblog.com
- GitHub: [github.com/techblog](https://github.com/techblog)
- Twitter: [@techblog](https://twitter.com/techblog)

---

⭐ 如果这个项目对你有帮助，请给我们一个星标！ 