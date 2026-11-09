// @ts-check

/**
 * 日本語の括弧・句読点に隣接した `**太字**` を <strong> に変換する Sätteri mdast プラグイン。
 *
 * CommonMark の emphasis 判定（left/right-flanking）では、
 * `そんな**「限界」**として` のように「文字 + ** + 約物」の並びになると
 * `**` が強調として解釈されず、そのまま本文に表示されてしまう。
 * パース後のテキストノードに残った `**…**` を拾って strong ノードに置き換える。
 */
const PATTERN = /\*\*([^*\n]+?)\*\*/g;

/** @type {import('satteri').MdastPluginDefinition} */
export const cjkFriendlyStrong = {
  name: 'cjk-friendly-strong',
  text(node, ctx) {
    const value = node.value;
    if (!value.includes('**')) return;

    /** @type {any[]} */
    const parts = [];
    let last = 0;
    for (const match of value.matchAll(PATTERN)) {
      const start = match.index ?? 0;
      if (start > last) parts.push({ type: 'text', value: value.slice(last, start) });
      parts.push({ type: 'strong', children: [{ type: 'text', value: match[1] }] });
      last = start + match[0].length;
    }
    if (parts.length === 0) return;
    if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });

    ctx.replaceNode(node, parts);
  },
};

/**
 * 表を横スクロール可能なラッパーで囲む（スマホで表が潰れないように）。
 */
/** @type {import('satteri').MdastPluginDefinition} */
export const scrollableTables = {
  name: 'scrollable-tables',
  table(node, ctx) {
    ctx.replaceNode(node, [
      { type: 'html', value: '<div class="table-scroll" tabindex="0" role="region" aria-label="表">' },
      node,
      { type: 'html', value: '</div>' },
    ]);
  },
};
