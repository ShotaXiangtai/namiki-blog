// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { cjkFriendlyStrong, scrollableTables } from './src/plugins/markdown.mjs';

// カスタムドメイン（blog.vcmc.jp）運用の設定
// カスタムドメインの場合はルートパス '/' で配信されます
export default defineConfig({
  site: process.env.SITE_URL || 'https://blog.vcmc.jp',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  markdown: {
    // 日本語の括弧に隣接した **太字** が効かない問題を補正
    processor: satteri({
      mdastPlugins: [cjkFriendlyStrong, scrollableTables],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
