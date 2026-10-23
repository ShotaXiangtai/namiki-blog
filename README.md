# 並木秀作のブログ (namiki-blog)

note風のシンプルで洗練されたデザインの静的ブログです。  
Astro + Tailwind CSS で構築されており、GitHub Pages で高速かつ完全に無料で公開・運用できます。

---

## 🌟 特徴

- ✍️ **note風の洗練されたUI/UX**
  - 白と余白を活かしたミニマルで美しいデザイン
  - noteの象徴的なグリーンアクセント（`#2cb696`）
  - 心地よいフォント・行間・タイポグラフィ
- ❤️ **note風「スキ（♡）」ボタン**
  - クリックするとハートが弾けるアニメーション
  - カウントアップ＆LocalStorage保存（再読時もスキ済み状態を保持）
- 👤 **クリエイタープロフィール & フォロー機能**
  - カバー画像、丸アバター、自己紹介
  - フォローボタン（トグル切り替え＆状態保存）
- 🏷️ **タグ・ハッシュタグ機能**
  - noteのような `#タグ` による記事の分類・一覧絞り込み
- 🔍 **高速インクリメンタル検索**
  - ヘッダーの虫眼鏡アイコンまたは `Ctrl + K` / `Cmd + K` で瞬時に記事を検索
- 📱 **完全レスポンシブ対応**
  - PC・タブレット・スマートフォンすべてで読みやすいレイアウト
- 🚀 **GitHub Pages & GitHub Actions 完全対応**
  - `main` ブランチに push するだけで自動ビルド＆自動デプロイ

---

## 🚀 GitHub Pages への公開手順

以下の4ステップで、すぐに世界中にブログを公開できます！

### 1. GitHub で新しいリポジトリを作成
1. GitHub にログインし、[新しいリポジトリを作成 (New repository)](https://github.com/new) を開きます。
2. リポジトリ名を `namiki-blog` にします（※パブリック: Public 推奨）。
3. 「README」や「.gitignore」の追加チェックは**外した状態（空のリポジトリ）**で作成します。

### 2. ローカルからリポジトリを push
ターミナル（PowerShell等）で以下のコマンドを実行します：

```bash
# GitHubのURLを設定（ユーザー名をあなたのGitHubユーザー名に置き換えてください）
git remote add origin https://github.com/<あなたのGitHubユーザー名>/namiki-blog.git

# mainブランチをpush
git branch -M main
git push -u origin main
```

### 3. GitHub Pages の設定を有効化
1. GitHubの該当リポジトリの **Settings** タブを開きます。
2. 左メニューの **Pages** を選択します。
3. **Build and deployment** の **Source** を **`GitHub Actions`** に変更します。

これだけで、`.github/workflows/deploy.yml` が自動起動し、数分で `https://<あなたのGitHubユーザー名>.github.io/namiki-blog/` にブログが公開されます！

---

## 📝 新しい記事の書き方

`src/content/blog/` ディレクトリの中に新しい Markdown ファイル（例: `my-new-post.md`）を作成するだけです。

### 記事テンプレート:

```markdown
---
title: "記事のタイトルをここに書きます"
description: "記事の要約や抜粋を1〜2行で記述します。"
pubDate: 2026-10-24
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
tags: ["日常", "読書", "雑記"]
pinned: false
likes: 0
---

ここから本文を書きます。

## 見出し

通常の Markdown 記法がそのまま利用できます。

- 箇条書きリスト
- **太字**
- > 引用文

```

ファイルを保存して git commit & push すれば、自動的にブログへ反映されます。

---

## ⚙️ カスタマイズ設定

### ブログ情報・著者プロフィールの変更
[`src/config.ts`](file:///c:/プロジェクト/ぶろぐ/並木秀作のぶろぐ/src/config.ts) でプロフィールやURLを簡単に変更できます：

```typescript
export const SITE_CONFIG = {
  title: '並木秀作のブログ',
  description: '思考の断片、読書記録、日々の暮らしと道具についてのnote風ブログです。',
  author: '並木 秀作',
  bio: '日々の思考や感じたこと、好きな本や暮らしの道具について綴っています。',
  avatar: 'アバター画像のURL',
  coverImage: 'カバー画像のURL',
  githubUrl: 'https://github.com/<あなたのユーザー名>/namiki-blog',
  xUrl: 'https://x.com',
  license: 'CC BY 4.0 / MIT',
};
```

### リポジトリ名やURLの変更
[`astro.config.mjs`](file:///c:/プロジェクト/ぶろぐ/並木秀作のぶろぐ/astro.config.mjs) 内で `repoName` や `site` を変更できます。
もし `<ユーザー名>.github.io` という名前のリポジトリ（ユーザーサイト）にする場合は、`base: '/'` に変更してください。

---

## 💻 ローカル開発コマンド

```bash
# 開発サーバー起動 (http://localhost:4321)
npm run dev

# 本番用静的ビルド
npm run build

# ビルド結果のローカルプレビュー
npm run preview
```

---

## 📜 ライセンス

- **ブログ記事・コンテンツ**: [CC BY 4.0 (Creative Commons 表示 4.0 国際)](https://creativecommons.org/licenses/by/4.0/deed.ja)
- **ソースコード・テンプレート**: [MIT License](LICENSE)
