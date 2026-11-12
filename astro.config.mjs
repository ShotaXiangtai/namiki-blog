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
    // コードブロックは note と同じく明るい背景（ダークモードでは暗い配色に切り替え）
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
    // 日本語の括弧に隣接した **太字** が効かない問題を補正
    processor: satteri({
      mdastPlugins: [cjkFriendlyStrong, scrollableTables],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
