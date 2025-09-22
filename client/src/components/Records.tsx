import React, { useState, useEffect } from 'react';
import { Trophy, Plus, User, Calendar, Award } from 'lucide-react';
import axios from 'axios';

interface Record {
  id: number;
  user_id: number;
  event: string;
  record_value: string;
  record_date: string;
  meet_name?: string;
  notes?: string;
  created_at: string;
}

const Records: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('全種目');

  const events = [
    '全種目', '100m', '200m', '400m', '800m', '1500m', '3000m', '5000m',
    '110mH', '400mH', '3000mSC', '走高跳', '棒高跳', '走幅跳', '三段跳',
    '砲丸投', 'ハンマー投', 'やり投', '円盤投'
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      // サンプルデータ（実際のAPIが実装されるまで）
      const sampleRecords: Record[] = [
        {
          id: 1,
          user_id: 1,
          event: '100m',
          record_value: '11.50',
          record_date: '2024-09-10',
          meet_name: '県高校新人大会',
          notes: '自己ベスト更新！',
          created_at: '2024-09-10T15:30:00'
        },
        {
          id: 2,
          user_id: 2,
          event: '走幅跳',
          record_value: '6.20',
          record_date: '2024-09-08',
          meet_name: '地区大会',
          notes: '',
          created_at: '2024-09-08T16:20:00'
        },
        {
          id: 3,
          user_id: 3,
          event: '1500m',
          record_value: '4:25.30',
          record_date: '2024-09-05',
          meet_name: '校内記録会',
          notes: '雨天での好記録',
          created_at: '2024-09-05T17:00:00'
        }
      ];
      setRecords(sampleRecords);
    } catch (error) {
      console.error('Failed to fetch records:', error);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">記録管理</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          記録追加
        </button>
      </div>

      <div className="mb-6">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2"
        >
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {selectedEvent === '全種目' ? 'まだ記録がありません' : `${selectedEvent}の記録がありません`}
            </p>
            <p className="text-gray-400 text-sm">新しい記録を追加してみましょう</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {record.event}
                    </h3>
                    <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      {record.record_value}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(record.record_date)}
                      {record.meet_name && (
                        <span className="ml-2 text-gray-500">
                          - {record.meet_name}
                        </span>
                      )}
                    </div>

                    {record.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-gray-700">{record.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4">
                  <div className="text-right text-sm text-gray-500">
                    記録日: {formatDate(record.created_at)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">新しい記録を追加</h3>
            <form className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option value="">種目を選択</option>
                {events.slice(1).map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="記録（例: 11.50、6.20、4:25.30）"
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="date"
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="text"
                placeholder="大会名（任意）"
                className="w-full p-3 border rounded-lg"
              />

              <textarea
                placeholder="備考（任意）"
                className="w-full p-3 border rounded-lg h-20"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-3 rounded-lg"
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

export default Records;