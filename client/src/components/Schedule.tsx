import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Plus, Zap, Target } from 'lucide-react';
import axios from 'axios';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScheduleItem {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  created_by_name: string;
}

const Schedule: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { scrollY } = useScrollAnimation();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex justify-between items-center"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">練習スケジュール</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          練習追加
        </button>
      </div>

      <div className="grid gap-6">
        {schedules.length === 0 ? (
          <div
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12 text-center"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          >
            <div className="mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-lg">
                <Calendar className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <p className="text-gray-600 text-xl font-medium mb-2">まだスケジュールがありません</p>
            <p className="text-gray-500 text-sm">新しい練習を追加して、チームのモチベーションを高めよう！</p>
          </div>
        ) : (
          schedules.map((schedule, index) => (
            <div
              key={schedule.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${scrollY * 0.03}px)`,
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {schedule.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 text-base leading-relaxed">{schedule.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50/80 rounded-lg">
                      <div className="p-1 bg-blue-500 rounded">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-blue-700">
                        {formatDate(schedule.date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50/80 rounded-lg">
                      <div className="p-1 bg-green-500 rounded">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-green-700">
                        {schedule.start_time} - {schedule.end_time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50/80 rounded-lg">
                      <div className="p-1 bg-purple-500 rounded">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-purple-700">
                        {schedule.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-8 w-full max-w-md animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">新しい練習を追加</h3>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">練習名</label>
                <input
                  type="text"
                  placeholder="例: スピード練習"
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">詳細説明</label>
                <textarea
                  placeholder="練習内容の詳細を入力..."
                  className="w-full p-4 border border-gray-200 rounded-lg h-24 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">日付</label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">開始時間</label>
                  <input
                    type="time"
                    className="w-full p-4 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">終了時間</label>
                  <input
                    type="time"
                    className="w-full p-4 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">場所</label>
                <input
                  type="text"
                  placeholder="例: 学校グラウンド"
                  className="w-full p-4 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200/80 backdrop-blur-sm text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-300/80 transition-all duration-300 transform hover:scale-105"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  追加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;