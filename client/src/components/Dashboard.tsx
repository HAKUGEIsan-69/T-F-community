import React from 'react';
import { Calendar, Bell, Trophy, Users, Zap, Target, Timer } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: '今日の練習',
      value: '16:00-18:00',
      subtitle: 'トラック練習',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '新着お知らせ',
      value: '3件',
      subtitle: '未読あり',
      icon: Bell,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: '部員数',
      value: '42名',
      subtitle: '活動中',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '今月の記録',
      value: '15件',
      subtitle: '更新済み',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
    },
  ];

  const activities = [
    {
      message: '田中さんが100m走の記録を更新しました（12.50秒）',
      time: '2時間前',
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      message: '明日の練習場所が変更されました',
      time: '4時間前',
      icon: Bell,
      color: 'bg-orange-500',
    },
    {
      message: '県大会の申込締切が近づいています',
      time: '1日前',
      icon: Timer,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">雲雀丘学園陸上部</h1>
        <p className="text-xl text-slate-300">限界を超えて、夢に向かって</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-400 mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.subtitle}</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Feed */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">最近の活動</h2>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200"
              >
                <div className={`p-3 rounded-lg ${activity.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white mb-1">{activity.message}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">限界は破るためにある</h2>
        <p className="text-lg text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
          今日も一歩ずつ、目標に向かって走り続けよう！
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default Dashboard;