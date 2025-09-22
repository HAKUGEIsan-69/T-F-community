import React, { useState, useEffect } from 'react';
import { Bell, Plus, User, Calendar } from 'lucide-react';
import axios from 'axios';

interface Announcement {
  id: number;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">お知らせ</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          お知らせ追加
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">まだお知らせがありません</p>
            <p className="text-gray-400 text-sm">新しいお知らせを追加してみましょう</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {announcement.title}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  新着
                </span>
              </div>

              <div className="text-gray-600 mb-4 whitespace-pre-wrap">
                {announcement.content}
              </div>

              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {announcement.author_name || '管理者'}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(announcement.created_at)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">新しいお知らせを追加</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="お知らせタイトル"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="お知らせ内容"
                className="w-full p-3 border rounded-lg h-32"
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

export default Announcements;