import React from 'react';
import { Calendar, Bell, Trophy, Users, Zap, Target, Timer } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HologramCard from './HologramCard';
import NeonText from './NeonText';
import ParticleField from './ParticleField';

const Dashboard: React.FC = () => {
  const { scrollY } = useScrollAnimation();

  const stats = [
    {
      title: '今日の練習',
      value: '16:00-18:00',
      subtitle: 'トラック練習',
      icon: Calendar,
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-card-dark',
      textColor: 'text-accent-300',
      accentColor: 'text-accent-400',
    },
    {
      title: '新着お知らせ',
      value: '3件',
      subtitle: '未読あり',
      icon: Bell,
      color: 'from-glow-orange to-track-500',
      bgColor: 'bg-card-dark',
      textColor: 'text-glow-orange',
      accentColor: 'text-track-400',
    },
    {
      title: '部員数',
      value: '42名',
      subtitle: '活動中',
      icon: Users,
      color: 'from-glow-purple to-glow-pink',
      bgColor: 'bg-card-dark',
      textColor: 'text-glow-purple',
      accentColor: 'text-glow-pink',
    },
    {
      title: '今月の記録',
      value: '15件',
      subtitle: '更新済み',
      icon: Trophy,
      color: 'from-track-500 to-glow-pink',
      bgColor: 'bg-card-dark',
      textColor: 'text-track-400',
      accentColor: 'text-glow-pink',
    },
  ];

  const activities = [
    {
      message: '田中さんが100m走の記録を更新しました（12.50秒）',
      time: '2時間前',
      icon: Target,
      color: 'bg-gradient-to-r from-accent-500 to-accent-600',
      glowColor: 'shadow-accent-500/20',
    },
    {
      message: '明日の練習場所が変更されました',
      time: '4時間前',
      icon: Bell,
      color: 'bg-gradient-to-r from-glow-orange to-track-500',
      glowColor: 'shadow-glow-orange/20',
    },
    {
      message: '県大会の申込締切が近づいています',
      time: '1日前',
      icon: Timer,
      color: 'bg-gradient-to-r from-glow-purple to-glow-pink',
      glowColor: 'shadow-glow-purple/20',
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Particle Field Background */}
      <ParticleField
        particleCount={200}
        intensity="high"
        colors={['#00f3ff', '#bf00ff', '#ff0099', '#00ff41', '#ff8c00', '#60a5fa', '#a855f7']}
        interactive={true}
        className="fixed inset-0 z-0"
      />

      {/* Hero Section with Neon Title */}
      <div className="text-center mb-16 relative z-10">
        <NeonText
          text="雲雀丘学園陸上部"
          size="3xl"
          color="#00f3ff"
          glowIntensity="extreme"
          animation="wave"
          className="mb-6"
        />
        <NeonText
          text="限界を超えて、夢に向かって"
          size="lg"
          color="#bf00ff"
          glowIntensity="high"
          animation="pulse"
          className="opacity-90"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <HologramCard
              key={stat.title}
              intensity="intense"
              glowColor={stat.accentColor.replace('text-', '#').replace('-400', '')}
              className="transform transition-all duration-700 hover:scale-110 animate-quantum-leap"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`${stat.bgColor} backdrop-blur-xl rounded-xl shadow-2xl border border-dark-600/30 p-7 transform transition-all duration-500 group animate-hologram`}
                style={{
                  transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <NeonText
                      text={stat.title}
                      size="sm"
                      color={stat.accentColor.replace('text-', '#').replace('-400', '')}
                      glowIntensity="medium"
                      animation="flicker"
                      className="mb-3"
                      flickerChance={0.98}
                    />
                    <p className={`text-4xl font-bold ${stat.textColor} mb-2 group-hover:${stat.accentColor} transition-all duration-300 animate-glow-intense`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-dark-500 group-hover:text-dark-300 transition-colors animate-float">{stat.subtitle}</p>
                  </div>
                  <div className={`p-5 rounded-xl bg-gradient-to-r ${stat.color} shadow-2xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-float shadow-neon-blue/50`}>
                    <Icon className="w-8 h-8 text-white animate-pulse-neon" />
                  </div>
                </div>
              </div>
            </HologramCard>
          );
        })}
      </div>

      {/* Activity Feed */}
      <HologramCard
        intensity="extreme"
        glowColor="#bf00ff"
        className="relative z-10"
      >
        <div
          className="bg-card-dark backdrop-blur-xl rounded-xl shadow-2xl border border-dark-600/30 p-8 animate-aurora"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-glow-purple to-glow-pink rounded-xl shadow-2xl animate-magnetic-pull">
              <Zap className="w-7 h-7 text-white animate-cyber-glitch" />
            </div>
            <NeonText
              text="最近の活動"
              size="xl"
              color="#bf00ff"
              glowIntensity="high"
              animation="glitch"
              speed="slow"
            />
          </div>

          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <HologramCard
                  key={index}
                  intensity="medium"
                  glowColor={activity.color.includes('accent') ? '#60a5fa' : activity.color.includes('orange') ? '#f97316' : '#a855f7'}
                  className="transform hover:scale-105 transition-all duration-500"
                >
                  <div
                    className="flex items-start space-x-5 p-6 bg-dark-800/60 rounded-xl border border-dark-600/20 hover:border-accent-500/50 hover:shadow-2xl transition-all duration-700 group animate-slide-up"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className={`p-4 rounded-xl ${activity.color} shadow-2xl ${activity.glowColor} flex-shrink-0 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 animate-float`}>
                      <Icon className="w-6 h-6 text-white animate-pulse-neon" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <NeonText
                        text={activity.message}
                        size="sm"
                        color="#00f3ff"
                        glowIntensity="medium"
                        animation="flicker"
                        flickerChance={0.995}
                        className="mb-3"
                      />
                      <p className="text-xs text-dark-400 group-hover:text-dark-200 transition-colors animate-glow-intense">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </HologramCard>
              );
            })}
          </div>
        </div>
      </HologramCard>

      {/* Motivational Quote */}
      <HologramCard
        intensity="extreme"
        glowColor="#00ff41"
        className="relative z-10"
      >
        <div
          className="bg-gradient-to-r from-accent-500/10 to-glow-purple/10 backdrop-blur-xl rounded-xl border border-accent-500/20 p-12 text-center shadow-2xl animate-hologram"
          style={{
            transform: `translateY(${scrollY * 0.01}px)`,
          }}
        >
          <div className="mb-8">
            <div className="inline-flex p-6 bg-gradient-to-r from-accent-500 to-glow-purple rounded-full shadow-2xl shadow-accent-500/50 animate-magnetic-pull">
              <Target className="w-10 h-10 text-white animate-cyber-glitch" />
            </div>
          </div>
          <NeonText
            text="限界は破るためにある"
            size="2xl"
            color="#00ff41"
            glowIntensity="extreme"
            animation="typing"
            speed="medium"
            className="mb-6"
          />
          <NeonText
            text="今日も一歩ずつ、目標に向かって走り続けよう！"
            size="md"
            color="#00f3ff"
            glowIntensity="high"
            animation="wave"
            speed="slow"
            className="max-w-md mx-auto leading-relaxed mb-8"
          />
          <div className="mt-8 w-32 h-2 bg-gradient-to-r from-accent-500 via-glow-purple to-neon-green rounded-full mx-auto animate-pulse-neon shadow-lg shadow-accent-500/50"></div>

          {/* Additional cyberpunk elements */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-neon-green opacity-60 animate-pulse"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-neon-purple opacity-60 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-neon-blue opacity-60 animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-neon-pink opacity-60 animate-pulse"></div>
        </div>
      </HologramCard>
    </div>
  );
};

export default Dashboard;