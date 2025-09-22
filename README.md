# 雲雀丘学園陸上部コミュニケーションツール

雲雀丘学園陸上部の練習スケジュール管理、お知らせ配信、記録管理を行うWebアプリケーションです。

## 機能

- **ダッシュボード**: 今日の練習や新着情報の概要表示
- **練習スケジュール**: 練習予定の管理と確認
- **お知らせ**: 部員への連絡事項の配信
- **記録管理**: 陸上競技の記録の登録と管理

## 技術構成

### フロントエンド
- React 19 with TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (アイコン)

### バックエンド
- Node.js with Express
- SQLite データベース
- セッション管理

## セットアップ

### 1. 依存関係のインストール
```bash
npm run install:all
```

### 2. 開発サーバー起動
```bash
npm run dev
```

- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:5000

### 3. 個別実行
```bash
# サーバーのみ
npm run server:dev

# クライアントのみ
npm run client:dev
```

### 4. ビルド
```bash
npm run build
```

## データベース

初回実行時に自動的にSQLiteデータベース（`database/trackteam.db`）が作成され、以下のテーブルが初期化されます：

- `users`: ユーザー情報
- `announcements`: お知らせ
- `schedules`: 練習スケジュール
- `records`: 陸上記録

## API エンドポイント

### お知らせ
- `GET /api/announcements` - お知らせ一覧取得

### スケジュール
- `GET /api/schedules` - スケジュール一覧取得

### 認証
- `POST /api/register` - ユーザー登録
- `POST /api/login` - ログイン

## 開発状況

✅ プロジェクト構成とセットアップ
✅ 基本的なUI コンポーネント
✅ データベース設計
✅ API エンドポイント（基本）

## 今後の実装予定

- [ ] 認証機能の完全実装
- [ ] データの作成・編集・削除機能
- [ ] ファイルアップロード機能
- [ ] プッシュ通知
- [ ] レスポンシブデザインの最適化