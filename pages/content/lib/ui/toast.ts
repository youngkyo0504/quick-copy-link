import { css } from '../dom/css';
import { linkIcon } from './linkIcon';
import { text } from '../dom/text';
import * as animation from '@lib/animation/animations';

interface Toast {
  message: string;
  duration?: number;
}

export class ToastUI {
  private container: HTMLElement;
  private existToastId: string | null = null;
  private timer: number | null = null;
  private state: 'open' | 'close' = 'close';
  private scaleAnimationControl: any;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
    this.setStyle();
  }

  setStyle() {
    const style = document.createElement('style');
    style.textContent = toastCSS;
    document.head.appendChild(style);
  }

  // FIXME: It is not queueing
  private queueDismiss(duration: number, id: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.dismiss(id);
      this.timer = null;
    }, duration);
  }

  showToast({ message, duration = 2000 }: Toast) {
    if (this.existToastId) {
      if (this.state === 'open') {
        this.scale();
      }

      if (this.state === 'close') {
        this.open();
      }

      this.queueDismiss(duration, this.existToastId);
      return;
    }

    this.createToast({
      message,
      duration,
    });
  }

  createToast({ message, duration = 2000 }: Toast) {
    const id = `toast-${Math.random().toString(36).substr(2, 9)}`;
    const toastEl = this.buildDom(message);
    toastEl.id = id;
    this.existToastId = id;
    this.container.appendChild(toastEl);
    this.queueDismiss(duration, this.existToastId);
    this.open();
  }

  buildDom(message: string) {
    const toastElement = document.createElement('div');
    toastElement.className = `copy-url-toast`;
    const toastElementContent = document.createElement('div');
    toastElement.appendChild(toastElementContent);
    toastElementContent.appendChild(linkIcon());
    toastElementContent.appendChild(text(message));
    toastElementContent.className = 'copy-url-content';
    // NOTE: Motion-One에서 translateY는 individual transform을 지원해야하기때문에 css variable을 이용한다. 참고할것
    // @see (https://motion.dev/docs/improvements-to-the-web-animations-api-dx#individual-transforms)
    toastElementContent.style.setProperty('--motion-translateY', '10px');
    return toastElement;
  }

  private open() {
    this.state = 'open';
    animation.open('.copy-url-content');
  }

  private async scale() {
    const control = animation.scale('.copy-url-content');
    this.scaleAnimationControl = control;
    control.finished.then(() => {
      // NOTE: animate() 함수가 실행될때마다 기존 animation이 멈추고 새로운 애니메이션이 실행된다.
      if (this.scaleAnimationControl.playState === 'running') {
        return;
      }
      animation.shrink('.copy-url-content');
    });
  }

  dismiss(id: string) {
    const toastElement = document.getElementById(id);
    if (toastElement) {
      this.state = 'close';
      animation.dismiss('.copy-url-content').finished.then(() => {
        if (this.state === 'open') return;
        this.existToastId = null;
        toastElement.remove();
      });
    }
  }
}

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
    scale: 1;
    // buildDom에서 --motion-translateY를 설정해주었기때문에 css에는 translateY를 적지않는다.
    filter: blur(2px);
    opacity: 0;
  }

  .copy-url-content span {
    color: hsl(0 0% 93.333%);
  }
`;
