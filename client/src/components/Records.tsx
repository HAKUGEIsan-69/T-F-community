import React, { useState, useEffect } from 'react';
import { Trophy, Plus, User, Calendar, Award, Edit2, Trash2, Target, Medal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Record as RecordType } from '../lib/supabase';

const Records: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState('全種目');
  const [formData, setFormData] = useState({
    event: '',
    record_value: '',
    date: '',
    location: '',
    competition_name: '',
    unit: 'seconds'
  });

  const events = [
    '全種目', '100m', '200m', '400m', '800m', '1500m', '3000m', '5000m',
    '110mH', '400mH', '3000mSC', '走高跳', '棒高跳', '走幅跳', '三段跳',
    '砲丸投', 'ハンマー投', 'やり投', '円盤投'
  ];

  const units = [
    { value: 'seconds', label: '秒' },
    { value: 'meters', label: 'm' },
    { value: 'minutes', label: '分' }
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('records')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const recordData = {
        ...formData,
        student_id: user.student_id,
        student_name: user.name,
        is_personal_best: false // TODO: Calculate this based on existing records
      };

      if (editingId) {
        const { error } = await supabase
          .from('records')
          .update(recordData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('records')
          .insert([recordData]);
        if (error) throw error;
      }

      setFormData({
        event: '',
        record_value: '',
        date: '',
        location: '',
        competition_name: '',
        unit: 'seconds'
      });
      setShowForm(false);
      setEditingId(null);
      fetchRecords();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleEdit = (record: RecordType) => {
    setFormData({
      event: record.event,
      record_value: record.record_value,
      date: record.date,
      location: record.location,
      competition_name: record.competition_name || '',
      unit: record.unit
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの記録を削除しますか？')) return;

    try {
      const { error } = await supabase
        .from('records')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredRecords = selectedEvent === '全種目'
    ? records
    : records.filter(record => record.event === selectedEvent);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUnitLabel = (unit: string) => {
    const unitObj = units.find(u => u.value === unit);
    return unitObj ? unitObj.label : unit;
  };

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
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-white">記録管理</h1>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>記録追加</span>
        </button>
      </div>

      {/* Event Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-slate-300 font-medium">種目:</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
        >
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? '記録を編集' : '記録を追加'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  種目
                </label>
                <select
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  required
                >
                  <option value="">種目を選択</option>
                  {events.slice(1).map((event) => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  記録
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.record_value}
                    onChange={(e) => setFormData({ ...formData, record_value: e.target.value })}
                    placeholder="例: 11.50, 6.20, 4:25.30"
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    required
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    {units.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  記録日
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  場所
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="例: 学校グラウンド"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                大会名（任意）
              </label>
              <input
                type="text"
                value={formData.competition_name}
                onChange={(e) => setFormData({ ...formData, competition_name: e.target.value })}
                placeholder="例: 県高校新人大会"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                {editingId ? '更新' : '追加'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    event: '',
                    record_value: '',
                    date: '',
                    location: '',
                    competition_name: '',
                    unit: 'seconds'
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
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">
              {selectedEvent === '全種目' ? '記録はありません' : `${selectedEvent}の記録はありません`}
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {record.is_personal_best && (
                    <Medal className="w-5 h-5 text-yellow-400" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white">{record.event}</h2>
                    <p className="text-slate-300">{record.student_name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400">
                      {record.record_value}
                      <span className="text-sm text-slate-400 ml-1">
                        {getUnitLabel(record.unit)}
                      </span>
                    </p>
                    {record.is_personal_best && (
                      <p className="text-xs text-yellow-400 font-medium">自己ベスト</p>
                    )}
                  </div>

                  {record.student_id === user?.student_id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 p-3 bg-slate-700/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300">{formatDate(record.date)}</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-slate-700/50 rounded-lg">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">{record.location}</span>
                </div>
                {record.competition_name && (
                  <div className="flex items-center space-x-2 p-3 bg-slate-700/50 rounded-lg">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">{record.competition_name}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Records;