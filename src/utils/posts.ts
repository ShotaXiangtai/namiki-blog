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
