import { css } from './dom/css';
import { NewToastUI } from './ui/toast copy';

type Action = 'copy-title' | 'copy-url' | 'none';

export class Controller {
  public items: NewToastUI[] = [];
  public container: HTMLElement;

  constructor() {
    this.setStyle();
    this.container = document.createElement('div');
    this.container.className = 'copy-url-toast-container';
    this.container.style.setProperty('pointer-events', 'none');
    document.body.appendChild(this.container);
  }

  isItemsEmpty() {
    return this.items.length === 0;
  }

  isSameAction(action: Action) {
    return this.items[0]?.type === action;
  }

  handleNewToast(toast: NewToastUI) {
    toast.showUp();
    const [existToast, restToast] = this.items;
    existToast?.pushBack();
    restToast?.dismiss();
    this.items.unshift(toast);
  }

  setStyle() {
    const style = document.createElement('style');
    style.textContent = toastCSS;
    document.head.appendChild(style);
  }
}

// NOTE: Motion-One에서 translateY는 individual transform을 지원해야하기때문에 css variable을 이용한다. 참고할것
// @see (https://motion.dev/docs/improvements-to-the-web-animations-api-dx#individual-transforms)
// buildDom에서 --motion-translateY를 설정해주었기때문에 css에는 translateY를 적지않는다.
const toastCSS = css`
  .copy-url-toast {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    font-family: system-ui, sans-serif;
  }

  .copy-url-content {
    align-items: center;
    display: inline-flex;
    gap: 8px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: hsl(0 0% 16.078%);
    color: hsl(0 0% 93.333%);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1;
    user-select: none;
    will-change: transform, opacity;
    --motion-translateY: 10px;
    --motion-scale: 0.85;
    filter: blur(3px);
    opacity: 0;
  }

  .copy-url-content span {
    color: hsl(0 0% 93.333%);
  }
`;
