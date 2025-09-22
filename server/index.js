const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// データベース初期化
const db = new sqlite3.Database('./database/trackteam.db');

// ミドルウェア
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'hibarigaoka-track-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24時間
}));

// 静的ファイル提供
app.use(express.static(path.join(__dirname, '../client/dist')));

// データベーステーブル初期化
db.serialize(() => {
  // ユーザーテーブル
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    grade INTEGER,
    event TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // お知らせテーブル
  db.run(`CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id)
  )`);

  // 練習スケジュールテーブル
  db.run(`CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users (id)
  )`);

  // 記録テーブル
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    event TEXT NOT NULL,
    record_value TEXT NOT NULL,
    record_date DATE NOT NULL,
    meet_name TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
});

// API Routes

// ユーザー登録
app.post('/api/register', (req, res) => {
  const { name, email, password, grade, event } = req.body;
  // 実装は後ほど
  res.json({ message: 'Registration endpoint' });
});

// ログイン
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // 実装は後ほど
  res.json({ message: 'Login endpoint' });
});

// お知らせ取得
app.get('/api/announcements', (req, res) => {
  db.all(`SELECT a.*, u.name as author_name
          FROM announcements a
          LEFT JOIN users u ON a.author_id = u.id
          ORDER BY a.created_at DESC`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// スケジュール取得
app.get('/api/schedules', (req, res) => {
  db.all(`SELECT s.*, u.name as created_by_name
          FROM schedules s
          LEFT JOIN users u ON s.created_by = u.id
          ORDER BY s.date ASC, s.start_time ASC`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});