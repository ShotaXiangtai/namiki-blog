// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pagesのリポジトリ名（例: /namiki-blog/）
// ユーザー名.github.io の場合は base: '/' に設定します。
const repoName = 'namiki-blog';
const base = process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? `/${repoName}` : '/');

export default defineConfig({
  site: process.env.SITE_URL || 'https://shusaku-namiki.github.io',
  base: base,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
