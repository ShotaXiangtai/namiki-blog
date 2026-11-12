let timer: ReturnType<typeof setTimeout> | undefined;

/** 画面下部に短いメッセージを表示する（BaseLayout の #toast を使用） */
export function showToast(message: string): void {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.setAttribute('data-show', '');
  clearTimeout(timer);
  timer = setTimeout(() => el.removeAttribute('data-show'), 2200);
}

/** 記事の正規URL（canonical）を返す */
export function pageUrl(): string {
  return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? location.href;
}
