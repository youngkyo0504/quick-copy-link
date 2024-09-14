import { CopyRuleStorage } from '@chrome-extension-boilerplate/storage';
import { runAtDocumentEnd } from './dom/runAtDocumentEnd';
import { getOS } from './getOS';
import { ToastUI } from './ui/toast';
import { glob } from './glob';

const IS_MAC_OS = getOS().type === 'macosx';

runAtDocumentEnd(() => {
  const toastUI = new ToastUI();
  window.addEventListener('keydown', copyHandler);

  async function copyHandler(event: KeyboardEvent) {
    if (!matchShortcut(event)) return;
    event.preventDefault();
    toastUI.createToast({ message: chrome.i18n.getMessage('whenAction'), duration: 1000 });

    const link = await getLink();
    await copyHTML(link);
  }
});

async function getTitle() {
  const rule = (await CopyRuleStorage.get()).rules
    .filter(rule => rule.domain)
    .filter(rule => glob(rule.domain, window.location.href))
    .at(0);

  if (rule) {
    return document.querySelector(rule.selector)?.textContent || document.title;
  }

  return document.title;
}

async function getLink() {
  const link = document.createElement('a');
  link.href = window.location.href;
  link.textContent = (await getTitle()).trim();
  return link;
}

async function copyHTML(element: HTMLElement) {
  const markdownLink = createMarkdownLink(element);

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([markdownLink], { type: 'text/plain' }),
    'text/html': new Blob([element.outerHTML], { type: 'text/html' }),
  });
  return navigator.clipboard.write([clipboardItem]);
}

function createMarkdownLink(element: HTMLElement): string {
  if (element.tagName.toLowerCase() === 'a') {
    const href = (element as HTMLAnchorElement).href;
    const text = element.textContent || '';
    return `[${text}](${href})`;
  }
  // 'a' 태그가 아닌 경우 그냥 텍스트 반환
  return element.textContent || '';
}

function matchShortcut(event: KeyboardEvent) {
  return event.key === '.' && controlOrMeta(event.metaKey, event.ctrlKey);
}

export function controlOrMeta(metaKey: boolean, ctrlKey: boolean): boolean {
  if (IS_MAC_OS) {
    return metaKey;
  }
  return ctrlKey;
}
