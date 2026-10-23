# 並木秀作のブログ (namiki-blog)

並木秀作の個人ブログです。  
白と余白を大切にしたシンプルで清潔感のあるデザインを採用し、Astro で構築された超高速な静的ブログです。  
カスタムドメイン **[https://blog.vcmc.jp/](https://blog.vcmc.jp/)**（GitHub Pages）にて自動公開・運用されています。

---

## 🌐 公開サイト

- **ブログ URL**: [https://blog.vcmc.jp/](https://blog.vcmc.jp/)
- **GitHub リポジトリ**: [https://github.com/ShotaXiangtai/namiki-blog](https://github.com/ShotaXiangtai/namiki-blog)

---

## 🌟 特徴

- ✍️ **シンプルで美しいタイポグラフィ**
  - 白と余白を活かしたミニマルで落ち着いたデザイン
  - 長文でも心地よく読めるフォント・行間・余白設計
- ❤️ **オリジナル「いいね（♡）」機能**
  - 記事末尾のハートボタンをクリックするとアニメーションとともにカウントアップ
  - LocalStorage に状態が保存され、再訪時もいいね状態をキープ
- 👤 **個人専用プロフィール**
  - カバー画像、丸型アバター、自己紹介、X (Twitter)・GitHub へのリンク
- 🏷️ **ハッシュタグ・タグ別分類**
  - `#ブログ` などのタグで記事を分類し、タグ一覧から絞り込み可能
- 🔍 **高速インクリメンタル検索**
  - ヘッダーの虫眼鏡アイコンまたは `Ctrl + K`（Macは `Cmd + K`）で全記事を瞬時に検索
- 🚀 **GitHub Actions による完全自動デプロイ**
  - `main` ブランチに push するだけで、自動的にビルドされ `https://blog.vcmc.jp/` へ即時反映

---

## 📝 新しい記事の書き方

記事を追加・編集する手順はとてもシンプルです。

### 1. Markdown ファイルを作成
[`src/content/blog/`](src/content/blog/) ディレクトリに新しい `.md` ファイル（例: `my-article.md`）を作成します。

### 2. 記事のテンプレート

```markdown
---
title: "記事のタイトルをここに書きます"
description: "記事の概要や抜粋を1〜2行で記述します。"
pubDate: 2026-10-24
heroImage: "/images/cover.jpg"
tags: ["ブログ", "日常"]
pinned: false
likes: 0
---

ここから本文を書きます。

## 見出し（H2）

通常の Markdown 記法がそのまま使用できます。

- 箇条書きリスト
- **太字テキスト**
- > 引用ブロック

```

### 3. GitHub に push して公開
ファイルを保存し、ターミナルで以下を実行します：

```bash
git add .
git commit -m "新しい記事を追加: 記事のタイトル"
git push origin main
```

push 後、約30秒〜1分で自動的にビルドされ公開サイトへ反映されます。

---

## 🖼️ 画像の変更方法

- **アバター画像（アイコン）**:  
  [`public/images/avatar.jpg`](public/images/avatar.jpg) を新しい画像ファイルで上書きします。
- **ヘッダー（カバー）画像**:  
  [`public/images/cover.jpg`](public/images/cover.jpg) を新しい画像ファイルで上書きします。

※画像を差し替えた後は、ブラウザのキャッシュ対策として [`src/config.ts`](src/config.ts) の `?v=2` の数字を `?v=3` のように更新してコミットすると、閲覧者全員に即時反映されます。

---

## ⚙️ プロフィールや設定の変更

[`src/config.ts`](src/config.ts) を編集することで、著者名や自己紹介文、SNSリンクなどを簡単に変更できます：

```typescript
export const SITE_CONFIG = {
  title: '並木秀作のブログ',
  description: '並木秀作の個人ブログです。日々の思考や技術、好きなモノについて綴っています。',
  author: '並木 秀作',
  handle: '@ShusakuNamiki',
  bio: '日々の思考や技術、好きなモノについて綴る個人ブログです。',
  avatar: '/images/avatar.jpg?v=2',
  coverImage: '/images/cover.jpg?v=2',
  githubUrl: 'https://github.com/ShotaXiangtai/namiki-blog',
  xUrl: 'https://x.com/ShusakuNamiki',
  license: 'CC BY 4.0 / MIT',
};
```

---

## 💻 ローカル開発コマンド

```bash
# 開発サーバー起動 (http://localhost:4321 で確認可能)
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
