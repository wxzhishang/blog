import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Users, BookOpen, MessageCircle, Award, Github, Twitter, Mail, ShieldCheck, TrendingUp, Zap, MapPin, Briefcase, Users2, MessageSquare } from 'lucide-react'
import { CityBadgeIcon, FootballIcon, TrophyIcon, StadiumIcon, TacticsBoardIcon, JerseyNumberIcon, CaptainBandIcon } from '@/components/Layout/CityIcons';
import Layout from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: '更衣室 - Cityzens 技术博客',
  description: '了解 Cityzens 技术博客背后的团队、理念和故事，我们是曼城最忠实的技术球迷！',
  keywords: ['关于曼城', '更衣室文化', 'Cityzens团队', '曼城技术博客'],
}

const teamStats = [
  { icon: <StadiumIcon className="w-8 h-8 text-city-blue-300" />, label: '技术主场', value: '伊蒂哈德', color: 'text-city-blue-300' },
  { icon: <TrophyIcon className="w-8 h-8 text-city-gold" />, label: '冠军荣耀', value: '无数🏆', color: 'text-city-gold' },
  { icon: <Users2 className="w-8 h-8 text-pitch-green" />, label: '蓝月亮铁杆', value: '1M+', color: 'text-pitch-green' },
  { icon: <TacticsBoardIcon className="w-8 h-8 text-city-blue-600" />, label: '技术战报', value: '500+', color: 'text-city-blue-600' },
]

const coachingStaff = [
  {
    name: '佩普·瓜迪奥拉 (AI版)',
    role: '首席战术分析师',
    bio: '致力于将瓜帅的战术哲学融入技术世界，追求极致的控球与优雅的代码。',
    avatar: 'https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=PepGuardiola&backgroundColor=6cabdd&backgroundType=gradientLinear&accessoriesProbability=0', 
    social: {
      twitter: 'https://twitter.com/ManCity',
      website: 'https://www.mancity.com/',
    },
    icon: <CaptainBandIcon className="w-6 h-6 text-city-gold" />
  },
  {
    name: '技术哈兰德',
    role: '代码终结者',
    bio: '在禁区内是进球机器，在代码编辑器里是Bug粉碎机，效率至上。',
    avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=ErlingHaaland&backgroundColor=6cabdd&backgroundType=gradientLinear&primaryColor=1c2c5c&secondaryColor=ffd700',
    social: {
      github: 'https://github.com/erlinghaaland',
    },
    icon: <FootballIcon className="w-6 h-6 text-city-blue-300" />
  },
  {
    name: '中场指挥官 KDB',
    role: '架构设计师',
    bio: '拥有上帝视角的传球大师，在技术架构上同样能送出致命助攻。',
    avatar: 'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=KevinDeBruyne&backgroundColor=6cabdd&backgroundType=gradientLinear',
    social: {
      email: 'kdb@cityzens-blog.example.com',
    },
    icon: <JerseyNumberIcon number="17" className="w-8 h-8 bg-city-blue-300 text-white" />
  }
]

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-city-blue-50">
        {/* Hero Section - 更衣室 */}
        <section className="bg-city-gradient text-white py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-stadium-pattern opacity-10"></div>
          <div className="absolute -top-1/4 left-0 w-1/2 h-1/2 bg-city-blue-300/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/4 right-0 w-1/2 h-1/2 bg-city-gold/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="flex justify-center mb-8 animate-sail-float">
              <CityBadgeIcon className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              欢迎来到 <span className="text-city-gold">Cityzens</span> 更衣室
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-city-blue-100 max-w-3xl mx-auto">
              这里是蓝月亮技术博客的心脏地带，充满了激情、策略和对胜利的渴望。我们不仅是球迷，更是技术的信徒！
            </p>
            <div className="flex justify-center">
              <Image
                src="https://images.unsplash.com/photo-1588445621937-03098400a20e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="曼城荣耀时刻"
                width={800}
                height={500}
                className="rounded-xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </section>

        {/* Team Philosophy - 球队理念 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <TacticsBoardIcon className="w-12 h-12 text-city-blue-600 mx-auto mb-4 animate-football-bounce" />
              <h2 className="text-3xl md:text-4xl font-bold text-city-blue-900 mb-4">我们的足球哲学</h2>
              <p className="text-lg text-city-blue-700 max-w-2xl mx-auto">
                像曼城在球场上一样，我们追求卓越、创新和团队合作，将足球的激情融入每一行代码。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-city-blue-100 rounded-full mr-4 group-hover:bg-city-blue-200 transition-colors">
                    <Zap className="w-6 h-6 text-city-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-city-blue-900">闪电战术 (创新驱动)</h3>
                </div>
                <p className="text-city-blue-700 leading-relaxed pl-16">
                  在技术选型和解决方案上，我们如同德布劳内的直塞一样富有创造力，勇于尝试最前沿的技术，打破常规。
                </p>
              </div>
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-city-blue-100 rounded-full mr-4 group-hover:bg-city-blue-200 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-city-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-city-blue-900">钢铁防线 (代码质量)</h3>
                </div>
                <p className="text-city-blue-700 leading-relaxed pl-16">
                  如同鲁本·迪亚斯般稳固，我们对代码质量有极致追求，确保每一个项目都坚不可摧，可靠稳定。
                </p>
              </div>
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-city-blue-100 rounded-full mr-4 group-hover:bg-city-blue-200 transition-colors">
                    <Users className="w-6 h-6 text-city-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-city-blue-900">无缝传控 (团队协作)</h3>
                </div>
                <p className="text-city-blue-700 leading-relaxed pl-16">
                  我们的团队像罗德里一样梳理中场，无缝协作，信息流畅通达，确保每个项目都能高效推进。
                </p>
              </div>
              <div className="group">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-city-blue-100 rounded-full mr-4 group-hover:bg-city-blue-200 transition-colors">
                    <TrendingUp className="w-6 h-6 text-city-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-city-blue-900">持续进攻 (学习成长)</h3>
                </div>
                <p className="text-city-blue-700 leading-relaxed pl-16">
                  永不满足，持续学习新的技术和战术，像福登一样不断突破，追求更高的技术境界。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - 荣誉室 */}
        <section className="py-16 md:py-24 bg-city-blue-50 pattern-background"> 
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <TrophyIcon className="w-12 h-12 text-city-gold mx-auto mb-4 animate-trophy-glow" />
              <h2 className="text-3xl md:text-4xl font-bold text-city-blue-900 mb-4">我们的荣誉室</h2>
              <p className="text-lg text-city-blue-700">
                每一次技术的突破，都像赢得一座冠军奖杯！
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {teamStats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-football hover:shadow-trophy transition-shadow duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-city-blue-100 mb-4`}>
                    {stat.icon} 
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-city-blue-800 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching Staff & Key Players - 教练组与核心球员 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Users2 className="w-12 h-12 text-city-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-city-blue-900 mb-4">教练组 & 技术核心</h2>
              <p className="text-lg text-city-blue-700 max-w-2xl mx-auto">
                由经验丰富的战术大师和才华横溢的技术球员组成，共同打造属于Cityzens的辉煌。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {coachingStaff.map((member) => (
                <div key={member.name} className="bg-gradient-to-br from-city-blue-50 to-white rounded-xl shadow-football overflow-hidden transform hover:scale-105 transition-transform duration-300 group p-1 hover:shadow-trophy">
                  <div className="bg-white rounded-lg h-full flex flex-col p-6 text-center">
                    <div className="relative mx-auto mb-4">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="w-28 h-28 rounded-full mx-auto border-4 border-city-blue-200 group-hover:border-city-gold transition-colors duration-300"
                      />
                      <div className="absolute bottom-0 right-0 bg-city-blue-700 p-1.5 rounded-full border-2 border-white group-hover:bg-city-gold transition-colors duration-300">
                        {member.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-city-blue-900 mb-1">{member.name}</h3>
                    <p className="text-city-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-city-blue-700 text-sm mb-4 flex-grow">{member.bio}</p>
                    
                    <div className="flex justify-center space-x-4 mt-auto">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="text-city-blue-400 hover:text-city-blue-800 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-6 h-6" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="text-city-blue-400 hover:text-[#1DA1F2] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Twitter`}
                        >
                          <Twitter className="w-6 h-6" />
                        </a>
                      )}
                       {member.social.website && (
                        <a
                          href={member.social.website}
                          className="text-city-blue-400 hover:text-city-gold transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Website`}
                        >
                          <Briefcase className="w-6 h-6" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-city-blue-400 hover:text-city-blue-600 transition-colors"
                          aria-label={`${member.name} Email`}
                        >
                          <Mail className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - 球迷信箱 */}
        <section className="py-16 md:py-24 bg-city-blue-800 text-white pattern-background-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="w-12 h-12 text-city-gold mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">球迷信箱 & 合作洽谈</h2>
            <p className="text-lg text-city-blue-200 mb-10 max-w-2xl mx-auto">
              有任何关于战术的疑问、技术的探讨，或者想与我们一同建设最好的曼城技术社区？随时联系我们！
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-city-blue-700/50 p-6 rounded-xl shadow-lg hover:shadow-football transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <Mail className="w-7 h-7 text-city-gold mr-3" />
                  <h3 className="text-xl font-semibold text-white">邮件联系教练组</h3>
                </div>
                <p className="text-city-blue-200 mb-1">技术问题咨询、战术建议、合作机会</p>
                <a href="mailto:coaches@cityzens-blog.example.com" className="text-city-blue-100 hover:text-city-gold font-medium transition-colors">
                  coaches@cityzens-blog.example.com
                </a>
              </div>
              <div className="bg-city-blue-700/50 p-6 rounded-xl shadow-lg hover:shadow-football transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <Github className="w-7 h-7 text-city-gold mr-3" />
                  <h3 className="text-xl font-semibold text-white">技术开源基地 (GitHub)</h3>
                </div>
                <p className="text-city-blue-200 mb-1">关注我们的开源项目，贡献代码与智慧</p>
                <a href="https://github.com/cityzens-tech" target="_blank" rel="noopener noreferrer" className="text-city-blue-100 hover:text-city-gold font-medium transition-colors">
                  github.com/cityzens-tech
                </a>
              </div>
              <div className="bg-city-blue-700/50 p-6 rounded-xl shadow-lg hover:shadow-football transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <Twitter className="w-7 h-7 text-city-gold mr-3" />
                  <h3 className="text-xl font-semibold text-white">蓝月亮动态 (Twitter)</h3>
                </div>
                <p className="text-city-blue-200 mb-1">获取最新球队动态、技术分享和球迷互动</p>
                <a href="https://twitter.com/ManCityTech" target="_blank" rel="noopener noreferrer" className="text-city-blue-100 hover:text-city-gold font-medium transition-colors">
                  @ManCityTech
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
} 