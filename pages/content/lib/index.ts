import { runAtDocumentEnd } from './dom/runAtDocumentEnd';
import { getOS } from './getOS';
import { ToastUI } from './ui/toast';

const IS_MAC_OS = getOS().type === 'macosx';

runAtDocumentEnd(() => {
  window.addEventListener('keydown', copyHandler);
  const toastUI = new ToastUI();

  async function copyHandler(event: KeyboardEvent) {
    if (!matchShortcut(event)) return;
    event.preventDefault();

    const link = getLink();
    await copyHTML(link);

    const messageWhenAction = chrome.i18n.getMessage('whenAction');
    toastUI.createToast({ message: messageWhenAction, duration: 1000 });
  }
});

function getLink() {
  const link = document.createElement('a');
  link.href = window.location.href;
  link.textContent = document.title;
  return link;
}

async function copyHTML(element: HTMLElement) {
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([element.innerHTML], { type: 'text/plain' }),
    'text/html': new Blob([element.outerHTML], { type: 'text/html' }),
  });
  return navigator.clipboard.write([clipboardItem]);
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
