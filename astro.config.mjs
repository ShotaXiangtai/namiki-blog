// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// カスタムドメイン（blog.vcmc.jp）運用の設定
// カスタムドメインの場合はルートパス '/' で配信されます
export default defineConfig({
  site: process.env.SITE_URL || 'https://blog.vcmc.jp',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
