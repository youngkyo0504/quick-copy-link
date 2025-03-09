import { DomainRule } from '@chrome-extension-boilerplate/storage/lib/exampleThemeStorage';
import { glob } from './glob';

export function createMarkdownLink(element: HTMLElement): string {
  if (element.tagName.toLowerCase() === 'a') {
    const href = (element as HTMLAnchorElement).href;
    const text = element.textContent || '';
    return `[${text}](${href})`;
  }
  // 'a' 태그가 아닌 경우 그냥 텍스트 반환
  return element.textContent || '';
}

export function getSelectorFunc(rules: DomainRule[]) {
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

export function getLink(selectorFunc: () => string) {
  const link = document.createElement('a');
  link.href = window.location.href;
  link.textContent = selectorFunc().trim();
  return link;
}
