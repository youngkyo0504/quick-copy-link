import { CopyRuleStorage } from '@chrome-extension-boilerplate/storage';
import { runAtDocumentEnd } from './dom/runAtDocumentEnd';
import { getOS } from './getOS';
import { ToastUI } from './ui/toast';
import { glob } from './glob';
import { DomainRule } from '@chrome-extension-boilerplate/storage/lib/exampleThemeStorage';

const IS_MAC_OS = getOS().type === 'macosx';
const BUILT_IN_RULES: DomainRule[] = [{ domain: 'https://github.com/*/issues/*', selector: '.gh-header-title' }];

runAtDocumentEnd(async () => {
  const toastUI = new ToastUI();
  const rules = (await CopyRuleStorage.get()).rules.concat(BUILT_IN_RULES);

  const copyHandler = async (event: KeyboardEvent) => {
    if (!matchShortcut(event)) return;
    event.preventDefault();
    toastUI.createToast({ message: chrome.i18n.getMessage('whenAction'), duration: 1000 });
    const link = await getLink(await getSelectorFunc(rules));
    await copyHTML(link);
  };

  window.addEventListener('keydown', copyHandler);
});

async function getSelectorFunc(rules: DomainRule[]) {
  const rule = rules
    .filter(rule => rule.domain)
    .filter(rule => glob(rule.domain, window.location.href))
    .at(0);

  if (rule) {
    return () => document.querySelector(rule.selector)?.textContent?.trim() || document.title;
  }

  // if no rule matched
  const h1List = document.querySelectorAll('h1');

  if (h1List.length === 1) {
    return () => h1List.item(0).textContent?.trim() || document.title;
  }

  return () => document.title;
}

async function getLink(selectorFunc: () => string) {
  const link = document.createElement('a');
  link.href = window.location.href;
  link.textContent = selectorFunc().trim();
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
