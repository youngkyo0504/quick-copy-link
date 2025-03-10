import { CopyRuleStorage } from '@chrome-extension-boilerplate/storage';
import { runAtDocumentEnd } from './dom/runAtDocumentEnd';
import { getOS } from './getOS';
import { DomainRule } from '@chrome-extension-boilerplate/storage/lib/exampleThemeStorage';
import { Controller } from './controller';
import { Toast } from './ui/toast';
import { getLink, getSelectorFunc } from './link';
import { copyHTML, copyString } from './copy';

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
