import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../utils/posts';
import { SITE_CONFIG } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const siteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');

  const articles = posts
    .map((post) => {
      return `---
## [${post.data.title}](${siteUrl}/posts/${post.id}/)
- 公開日: ${post.data.pubDate.toISOString().split('T')[0]}
- 著者: ${SITE_CONFIG.author}
- タグ: ${post.data.tags.join(', ')}
- 概要: ${post.data.description}

### 本文:
${post.body || ''}
`;
    })
    .join('\n\n');

  const content = `# ${SITE_CONFIG.title} (Full Content)

> ${SITE_CONFIG.description}
> 著者: ${SITE_CONFIG.author} (${SITE_CONFIG.handle})
> URL: ${siteUrl}

本ファイルはLLM・AIエージェント向けの全文コンテキストファイルです。

${articles}
`.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
