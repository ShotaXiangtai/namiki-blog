import { getPublishedPosts } from '../utils/posts';

export async function GET() {
  const posts = await getPublishedPosts();
  const searchIndex = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.id,
    tags: post.data.tags,
    date: post.data.pubDate,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
