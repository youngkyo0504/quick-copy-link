import { createMarkdownLink } from './link';

export async function copyHTML(element: HTMLElement) {
  const markdownLink = createMarkdownLink(element);

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([markdownLink], { type: 'text/plain' }),
    'text/html': new Blob([element.outerHTML], { type: 'text/html' }),
  });
  return navigator.clipboard.write([clipboardItem]);
}

export async function copyString(text: string) {
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([text], { type: 'text/plain' }),
  });
  return navigator.clipboard.write([clipboardItem]);
}
