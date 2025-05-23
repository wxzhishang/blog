import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Users, BookOpen, MessageCircle, Award, Github, Twitter, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '关于我们 - 技术博客',
  description: '了解我们的技术博客，我们的使命和团队成员',
  keywords: ['关于', '团队', '技术博客', '使命'],
}

const stats = [
  { icon: BookOpen, label: '发布文章', value: '150+', color: 'text-blue-600' },
  { icon: Users, label: '注册用户', value: '2.5K+', color: 'text-green-600' },
  { icon: MessageCircle, label: '评论数量', value: '8.9K+', color: 'text-purple-600' },
  { icon: Award, label: '获得点赞', value: '15K+', color: 'text-orange-600' },
]

const teamMembers = [
  {
    name: '张伟',
    role: '首席技术官',
    bio: '10年全栈开发经验，专注于React、Node.js和云原生技术',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'zhangwei@example.com'
    }
  },
  {
    name: '李娜',
    role: '前端架构师',
    bio: '专注于现代前端技术栈，UI/UX设计和性能优化',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lina',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'lina@example.com'
    }
  },
  {
    name: '王强',
    role: '后端工程师',
    bio: '专注于微服务架构、数据库优化和DevOps实践',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangqiang',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'wangqiang@example.com'
    }
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            关于我们的技术博客
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            分享最新技术趋势，传播编程知识，构建开发者社区
          </p>
          <div className="flex justify-center">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="团队协作"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的使命</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              致力于为开发者提供高质量的技术内容，促进知识分享和技术交流，
              帮助每一位开发者在技术道路上不断成长。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">技术分享</h3>
              <p className="text-gray-600">
                我们专注于分享最新的技术趋势、最佳实践和实用教程，
                涵盖前端、后端、移动开发、DevOps等多个领域。
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">社区建设</h3>
              <p className="text-gray-600">
                通过评论互动、技术讨论和经验分享，我们致力于建设一个
                活跃、友好、互助的开发者社区。
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">持续学习</h3>
              <p className="text-gray-600">
                技术日新月异，我们鼓励持续学习的理念，
                为开发者提供系统性的学习路径和资源。
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">开源精神</h3>
              <p className="text-gray-600">
                我们支持开源文化，鼓励代码分享和协作开发，
                为开源社区的发展贡献力量。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的成就</h2>
            <p className="text-lg text-gray-600">
              感谢每一位读者的支持，让我们一起成长
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的团队</h2>
            <p className="text-lg text-gray-600">
              由经验丰富的开发者组成的专业团队
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p className="text-lg text-gray-600 mb-8">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">邮箱联系</h3>
              <p className="text-gray-600">contact@techblog.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Github className="w-8 h-8 text-gray-800 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600">github.com/techblog</p>
            </div>
            <div className="flex flex-col items-center">
              <Twitter className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Twitter</h3>
              <p className="text-gray-600">@techblog</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 