import { linkIcon } from './linkIcon';
import { text } from '../dom/text';
import * as animation from '@lib/animation/animations';

export class NewToastUI {
  private id = `toast-${Math.random().toString(36).substr(2, 9)}`;
  private timer: number | null = null;
  public state: 'open' | 'close' = 'close';
  private toastElement: HTMLDivElement;
  private container: HTMLElement;
  private onDismiss: () => void;
  private duration: number;
  private message: string;

  constructor({
    container,
    duration = 2000,
    message,
    onDismiss,
  }: {
    message: string;
    duration?: number;
    container: HTMLElement;
    onDismiss: () => void;
  }) {
    this.container = container;
    this.duration = duration;
    this.message = message;
    this.onDismiss = onDismiss;
    this.toastElement = this.buildDom(this.message);
  }

  // FIXME: It is not queueing
  private queueDismiss() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.dismiss();
      this.timer = null;
    }, this.duration);
  }

  showUp() {
    this.container.appendChild(this.toastElement);
    this.open();
  }

  buildDom(message: string) {
    const toastElement = document.createElement('div');
    toastElement.className = `copy-url-toast`;
    toastElement.id = this.id;
    const toastElementContent = document.createElement('div');
    toastElement.appendChild(toastElementContent);
    toastElementContent.appendChild(linkIcon());
    toastElementContent.appendChild(text(message));
    toastElementContent.className = 'copy-url-content';

    // toastElementContent.style.setProperty('--motion-translateY', '10px');
    return toastElement;
  }

  open() {
    this.state = 'open';
    animation.open();
    this.queueDismiss();
  }

  scale() {
    animation.scaleAndShrink(`#${this.id} .copy-url-content`);
    this.queueDismiss();
  }

  pushBack() {
    return;
  }

  dismiss() {
    this.state = 'close';

    animation.dismiss(`#${this.id} .copy-url-content`).finished.then(() => {
      if (this.state === 'open') return;
      this.toastElement.remove();
      this.onDismiss();
    });
  }
}
