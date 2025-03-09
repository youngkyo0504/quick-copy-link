import { CopyRuleStorage } from '@chrome-extension-boilerplate/storage';
import { runAtDocumentEnd } from './dom/runAtDocumentEnd';
import { getOS } from './getOS';
import { glob } from './glob';
import { DomainRule } from '@chrome-extension-boilerplate/storage/lib/exampleThemeStorage';
import { Controller } from './controller';
import { Toast } from './ui/toast';

const IS_MAC_OS = getOS().type === 'macosx';
const BUILT_IN_RULES: DomainRule[] = [{ domain: 'https://github.com/*/issues/*', selector: '.gh-header-title' }];

runAtDocumentEnd(async () => {
  const controller = new Controller();
  const rules = (await CopyRuleStorage.get()).rules.concat(BUILT_IN_RULES);

  const copyHandler = async (event: KeyboardEvent) => {
    const matchedAction = matchShortcut(event);
    if (!matchedAction) return;

    event.preventDefault();

    if (controller.isSameAction(matchedAction)) {
      const currentItem = controller.items[0];
      if (currentItem.state === 'open') currentItem.scale();
      if (currentItem.state === 'close') currentItem.open();
    } else {
      const id = `toast-${Math.random().toString(36).substr(2, 9)}`;

      controller.handleNewToast(
        new Toast({
          id,
          container: controller.container,
          duration: 1000,
          message:
            matchedAction === 'copy-title'
              ? chrome.i18n.getMessage('whenCopyTitleAsLink')
              : chrome.i18n.getMessage('whenCopyLink'),
          onDismiss() {
            controller.items = controller.items.filter(item => item.id !== id);
          },
          type: matchedAction,
        }),
      );
    }

    if (matchedAction === 'copy-title') {
      const link = getLink(getSelectorFunc(rules));
      await copyHTML(link);
    } else {
      const url = window.location.href;
      await copyString(url);
    }
  };

  window.addEventListener('keydown', copyHandler);
});

function getSelectorFunc(rules: DomainRule[]) {
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

function getLink(selectorFunc: () => string) {
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

async function copyString(text: string) {
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([text], { type: 'text/plain' }),
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
  if (event.key === '.' && controlOrMeta(event.metaKey, event.ctrlKey)) {
    return 'copy-title';
  }

  if (event.key === '/' && controlOrMeta(event.metaKey, event.ctrlKey)) {
    return 'copy-url';
  }

  return null;
}

export function controlOrMeta(metaKey: boolean, ctrlKey: boolean): boolean {
  if (IS_MAC_OS) {
    return metaKey;
  }
  return ctrlKey;
}
