import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 公開済みの記事一覧を取得する（時間指定投稿対応）
 * - 開発環境（DEV）では未来の日付の記事もプレビュー可能
 * - 本番環境（PROD）では現在時刻を過ぎた記事のみを抽出
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  const now = new Date();

  return posts
    .filter((post) => {
      // ローカル開発環境では確認のために常に表示
      if (import.meta.env.DEV) {
        return true;
      }
      // 本番ビルドでは現在日時以前の記事のみ公開
      return new Date(post.data.pubDate) <= now;
    })
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
}

/**
 * 固定記事（pinned: true）を先頭に並べる。それ以外の順序はそのまま維持する。
 */
export function sortPinnedFirst<T extends CollectionEntry<'blog'>>(posts: T[]): T[] {
  return [...posts.filter((p) => p.data.pinned), ...posts.filter((p) => !p.data.pinned)];
}

/**
 * 関連記事を返す。タグの重なりが多い順（同点なら新しい順）に並べ、
 * 足りない分は新しい記事で補う。
 */
export function getRelatedPosts(
  current: CollectionEntry<'blog'>,
  posts: CollectionEntry<'blog'>[],
  limit = 4,
): CollectionEntry<'blog'>[] {
  const currentTags = new Set(current.data.tags);
  const others = posts
    .filter((p) => p.id !== current.id)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const related = others
    .map((post) => ({
      post,
      score: post.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .map(({ post }) => post);

  const rest = others.filter((p) => !related.includes(p));
  return [...related, ...rest].slice(0, limit);
}

/**
 * 公開中の記事からユニークなタグ一覧を取得する
 */
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
