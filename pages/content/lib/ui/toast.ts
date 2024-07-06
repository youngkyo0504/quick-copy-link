import { css } from '../dom/css';
import { linkIcon } from './linkIcon';
import { text } from '../dom/text';

interface Toast {
  message: string;
  duration?: number;
}

export class ToastUI {
  private container: HTMLElement;
  private existToastId: string | null = null;

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

  createToast({ message, duration = 2000 }: Toast) {
    if (this.existToastId) {
      // const toastElement = document.getElementById(this.existToastId);
      // this.scale(toastElement!);
      return;
    }
    const id = `toast-${Math.random().toString(36).substr(2, 9)}`;
    const toastElement = document.createElement('div');
    toastElement.className = `copy-url-toast copy-url-content`;
    toastElement.id = id;
    toastElement.appendChild(linkIcon());
    toastElement.appendChild(text(message));
    this.existToastId = id;
    this.container.appendChild(toastElement);
    this.show(toastElement);

    setTimeout(() => this.dismissToast(id), duration);
  }

  private show(toastElement: HTMLElement) {
    // Add animation for showing the toast
    toastElement.dataset.side = 'top';
  }

  private scale(toastElement: HTMLElement) {
    toastElement.dataset.scale = 'true';
  }
  dismissToast(id: string) {
    const toastElement = document.getElementById(id);
    if (toastElement) {
      // Add animation for hiding the toast before removing
      toastElement.dataset.side = 'down';
      toastElement.addEventListener('animationend', () => {
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
    display: inline-flex;
    align-items: center;
    font-family: system-ui, sans-serif;
    gap: 8px;
  }

  .copy-url-content {
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
  }

  .copy-url-content[data-side='top'] {
    animation: slideUpAndFade 0.3s ease-out forwards;
  }

  .copy-url-content[data-side='down'] {
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
