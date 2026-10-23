/**
 * Astroのbaseパスに対応したURLを生成するユーティリティ
 */
export function getRelativeUrl(path: string = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return base || '/';
  }
  return `${base}${cleanPath}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 500; // 日本語の平均読書速度（分あたり500文字）
  const charCount = text.replace(/\s+/g, '').length;
  return Math.max(1, Math.ceil(charCount / wordsPerMinute));
}
