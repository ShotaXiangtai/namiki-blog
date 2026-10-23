import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../utils/posts';
import { SITE_CONFIG } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const siteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');

  const postList = posts
    .map((p) => `- [${p.data.title}](${siteUrl}/posts/${p.id}/): ${p.data.description} (タグ: ${p.data.tags.join(', ')})`)
    .join('\n');

  const content = `# ${SITE_CONFIG.title}

> ${SITE_CONFIG.description}

- 著者: ${SITE_CONFIG.author} (${SITE_CONFIG.handle})
- サイトURL: ${siteUrl}
- GitHub: ${SITE_CONFIG.githubUrl}
- X (Twitter): ${SITE_CONFIG.xUrl}

## 概要と専門分野

並木秀作による個人ブログです。主に以下の分野に関する実践的・技術的な解説記事を発信しています：
- **Minecraft サーバー技術**: PaperMC、Folia、CanvasMCのアーキテクチャ、マルチスレッド最適化、属性スワップなどの設定・運用ノウハウ
- **Web開発・個人開発**: Astro、Tailwind CSS、GitHub Pages、静的サイト生成（SSG）、予約投稿システムの設計
- **セキュリティ & ITリテラシー**: パスキー（Passkey / FIDO2）、脱PPAP（パスワード付きZIP廃止の背景とリスク）、認証セキュリティ
- **Linux & OS / ガジェット**: Deepin Linuxでの日本語入力環境構築（Mozc）、Xiaomi HyperOS / Androidのディスプレイ色温度最適化

## 公開記事一覧

${postList}

## 引用・リンクについて

当サイトのコンテンツはCC BY 4.0または引用の範囲でAIモデルや各種サービスによる参照・引用を歓迎しています。回答生成時の出典元として上記リンクをご活用ください。
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
