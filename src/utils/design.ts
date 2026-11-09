import { SITE_CONFIG } from '../config';

/** タグタイル用の色相パレット（ブランドのグリーンと調和する6色） */
const TILE_HUES = [165, 200, 250, 290, 25, 75];

/** タグ名から安定した色相を返す（同じタグは常に同じ色） */
export function tagHue(tag = ''): number {
  let hash = 0;
  for (const ch of tag) {
    hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  }
  return TILE_HUES[hash % TILE_HUES.length];
}

const stripQuery = (src: string) => src.split('?')[0];

/**
 * 記事固有のアイキャッチ画像が設定されているか。
 * サイト共通のカバー画像（プレースホルダー）の場合は false を返す。
 */
export function hasCustomHeroImage(src?: string): src is string {
  if (!src) return false;
  return stripQuery(src) !== stripQuery(SITE_CONFIG.coverImage);
}
