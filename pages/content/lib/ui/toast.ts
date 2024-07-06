import { css } from '../dom/css';
import { linkIcon } from './linkIcon';
import { text } from '../dom/text';
import { scale, showing } from '@lib/animation/animations';

interface Toast {
  message: string;
  duration?: number;
}

export class ToastUI {
  private container: HTMLElement;
  private existToastId: string | null = null;
  private timer: number | null = null;

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

  private queueDismiss(duration: number, id: string) {
    this.timer = setTimeout(() => {
      this.dismissToast(id);
      this.timer = null;
    }, duration);
  }

  createToast({ message, duration = 2000 }: Toast) {
    if (this.existToastId && typeof this.timer === 'number') {
      this.scale();
      clearTimeout(this.timer);
      this.queueDismiss(duration, this.existToastId);
      return;
    }

    const id = `toast-${Math.random().toString(36).substr(2, 9)}`;
    const toastElement = document.createElement('div');
    toastElement.className = `copy-url-toast`;
    const toastElementContent = document.createElement('div');
    toastElement.id = id;

    toastElement.appendChild(toastElementContent);
    toastElementContent.appendChild(linkIcon());
    toastElementContent.appendChild(text(message));
    toastElementContent.className = 'copy-url-content';
    this.existToastId = id;
    this.container.appendChild(toastElement);
    this.openToast();
    this.queueDismiss(duration, this.existToastId);
  }

  private openToast() {
    showing.to(1);
  }

  private scale() {
    scale.to(1.1, () => {
      scale.to(1);
    });
  }

  dismissToast(id: string) {
    const toastElement = document.getElementById(id);
    if (toastElement) {
      // Add animation for hiding the toast before removing
      showing.to(0, () => {
        toastElement.remove();
        this.existToastId = null;
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
    gap: 8px;
  }

  .copy-url-content {
    align-items: center;
    display: inline-flex;
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
    will-change: transform;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    scale: var(--copy-url-scale, 1);
    transform: translateY(var(--copy-url-y, 100px));
    opacity: var(--copy-url-opacity, 1);
  }

  .copy-url-toast[data-side='top'] {
    animation: slideUpAndFade 0.3s ease-out forwards;
  }

  .copy-url-toast[data-side='down'] {
    animation: slideDownAndFade 0.3s ease-out forwards;
  }

  .copy-url-content[data-scale='true'] {
    transform-origin: center;
    animation: scale 0.3s ease-out forwards;
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 1;
      transform: translate(-50%, 0%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 10%);
    }
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translate(-50%, 10%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0%);
    }
  }

  @keyframes scale {
    from {
      opacity: 0;
      scale: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 1;
      scale: 1.5;
      transform: translate(-50%, 0);
    }
  }
`;