import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, Users, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Schedule as ScheduleType } from '../lib/supabase';

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    type: 'practice' as 'practice' | 'competition' | 'meeting' | 'other'
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const scheduleData = {
        ...formData,
        created_by: user.id,
      };

      if (editingId) {
        const { error } = await supabase
          .from('schedules')
          .update(scheduleData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('schedules')
          .insert([scheduleData]);
        if (error) throw error;
      }

      setFormData({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        type: 'practice'
      });
      setShowForm(false);
      setEditingId(null);
      fetchSchedules();
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleEdit = (schedule: ScheduleType) => {
    setFormData({
      title: schedule.title,
      description: schedule.description,
      date: schedule.date,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      location: schedule.location,
      type: schedule.type
    });
    setEditingId(schedule.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこのスケジュールを削除しますか？')) return;

    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'practice': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'competition': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'meeting': return 'text-purple-400 bg-purple-500/20 border-purple-500/50';
      case 'other': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'practice': return '練習';
      case 'competition': return '試合';
      case 'meeting': return '会議';
      case 'other': return 'その他';
      default: return '練習';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'practice': return Activity;
      case 'competition': return Users;
      case 'meeting': return Users;
      case 'other': return Calendar;
      default: return Activity;
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

  const canManageSchedules = user?.role === 'admin' || user?.role === 'coach';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">練習スケジュール</h1>
        </div>

        {canManageSchedules && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>新規作成</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? 'スケジュールを編集' : 'スケジュールを作成'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  種類
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="practice">練習</option>
                  <option value="competition">試合</option>
                  <option value="meeting">会議</option>
                  <option value="other">その他</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                内容
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  日付
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  開始時間
                </label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  終了時間
                </label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                場所
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                {editingId ? '更新' : '作成'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    description: '',
                    date: '',
                    start_time: '',
                    end_time: '',
                    location: '',
                    type: 'practice'
                  });
                }}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {schedules.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">スケジュールはありません</p>
          </div>
        ) : (
          schedules.map((schedule) => {
            const IconComponent = getTypeIcon(schedule.type);
            return (
              <div
                key={schedule.id}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(schedule.type)}`}>
                      {getTypeText(schedule.type)}
                    </span>
                    <h2 className="text-xl font-bold text-white">{schedule.title}</h2>
                  </div>

                  {canManageSchedules && schedule.created_by === user?.id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">
                  {schedule.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-400" />
                    <span className="text-sm text-white font-medium">
                      {formatDate(schedule.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-white font-medium">
                      {schedule.start_time} - {schedule.end_time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-white font-medium">
                      {schedule.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Schedule;