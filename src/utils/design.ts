import { SITE_CONFIG } from '../config';

const stripQuery = (src: string) => src.split('?')[0];

/**
 * 記事固有のアイキャッチ画像が設定されているか。
 * サイト共通のカバー画像（OGP 用のデフォルト）の場合は false を返す。
 */
export function hasCustomHeroImage(src?: string): src is string {
  if (!src) return false;
  return stripQuery(src) !== stripQuery(SITE_CONFIG.coverImage);
}

/**
 * 自動生成アイキャッチに載せる文字。
 * - 大きく表示：タイトル中の「」で囲まれた語（なければ先頭のタグ）
 * - 小さく表示：大きな文字と重ならない最初のタグ
 */
export function eyecatchText(title: string, tags: string[]): { main: string; sub?: string } {
  const quoted = title.match(/「([^」]{1,20})」/)?.[1];
  const main = quoted ?? tags[0] ?? SITE_CONFIG.title;
  const sub = tags.find((t) => t !== main && !main.includes(t));
  return { main, sub };
}

/** 自動生成アイキャッチの配色（0〜5）。同じタグの記事は同じ色になる */
export function eyecatchTone(key = ''): number {
  let hash = 0;
  for (const ch of key) {
    hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  }
  return hash % 6;
}
