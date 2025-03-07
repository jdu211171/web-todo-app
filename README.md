# タスク管理アプリ

シンプルでミニマリストなタスク管理アプリケーションで、ユーザーはタスクの作成、閲覧、更新、削除ができます。このプロジェクトは課題の一部として開発されました。

## 機能

- タスク名、説明、期限日、ステータスを含む新しいタスクの作成
- フィルタリングオプション付きのタスク一覧表示
- 既存タスクの編集
- タスクの削除
- タスクの完了/未完了の切り替え
- SQLiteを使用した永続的なデータ保存
- デスクトップとモバイルデバイスの両方で動作するレスポンシブデザイン

## 技術スタック

- **フロントエンド**: React, TypeScript
- **バックエンド**: Express.js, Node.js, TypeScript
- **データベース**: SQLite
- **バージョン管理**: Git, GitHub

## セットアップ手順

### 前提条件

- Node.js (v14以上)
- npm (v6以上)

### インストール

1. リポジトリをクローンする:
   ```
   git clone https://github.com/jdu211171/web-todo-app.git
   cd web-todo-app
   ```

2. サーバーの依存関係をインストールする:
   ```
   cd backend
   npm install
   ```

3. クライアントの依存関係をインストールする:
   ```
   cd ../frontend
   npm install
   ```

### アプリケーションの実行

1. バックエンドサーバーを起動する:
   ```
   cd backend
   npm run dev
   ```
   サーバーは http://localhost:5000 で実行されます

2. 別のターミナルで、フロントエンドを起動する:
   ```
   cd frontend
   npm start
   ```
   クライアントは http://localhost:3000 で実行されます

3. ブラウザを開いて http://localhost:3000 にアクセスし、アプリケーションを使用します

## APIエンドポイント

- `GET /api/tasks` - すべてのタスクを取得する（オプションのフィルタ付き）
- `GET /api/tasks/:id` - IDで特定のタスクを取得する
- `POST /api/tasks` - 新しいタスクを作成する
- `PUT /api/tasks/:id` - 既存のタスクを更新する
- `DELETE /api/tasks/:id` - タスクを削除する

## プロジェクト構造

```
web-todo-app/
├── frontend/                 # フロントエンド - React + TypeScript
│   ├── public/             # 静的ファイル
│   ├── src/                # ソースコード
│   │   ├── components/     # Reactコンポーネント
│   │   ├── services/       # APIサービスコール
│   │   ├── types/          # TypeScriptインターフェース
│   │   ├── App.tsx         # メインAppコンポーネント
│   │   └── index.tsx       # エントリーポイント
│
├── backend/                 # バックエンド - Express + TypeScript
│   ├── src/                # ソースコード
│   │   ├── controllers/    # リクエストハンドラー
│   │   ├── models/         # データベースモデル
│   │   ├── routes/         # APIルート
│   │   ├── db/             # データベースセットアップ
│   │   ├── types/          # TypeScriptインターフェース
│   │   ├── app.ts          # Expressアプリセットアップ
│   │   └── server.ts       # サーバーエントリーポイント
│
├── .gitignore
└── README.md
```
