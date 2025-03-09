import { linkIcon } from './linkIcon';
import { text } from '../dom/text';
import * as animation from '@lib/animation/animations';

export class NewToastUI {
  public id: string;
  private timer: number | null = null;
  public state: 'open' | 'close' | 'pushed' = 'close';
  private toastElement: HTMLDivElement;
  private container: HTMLElement;
  private onDismiss: () => void;
  private duration: number;
  private message: string;
  public type: 'copy-title' | 'copy-url';

  constructor({
    id,
    container,
    duration = 2000,
    message,
    onDismiss,
    type,
  }: {
    id: string;
    message: string;
    duration?: number;
    container: HTMLElement;
    onDismiss: () => void;
    type: 'copy-title' | 'copy-url';
  }) {
    this.id = id;
    this.type = type;
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
    animation.open(`#${this.id} .copy-url-content`);
    this.queueDismiss();
  }

  scale() {
    animation.scaleAndShrink(`#${this.id} .copy-url-content`);
    this.queueDismiss();
  }

  pushBack() {
    this.state = 'pushed';
    animation.pushback(`#${this.id} .copy-url-content`);
    return;
  }

  dismiss() {
    if (this.state === 'pushed') {
      animation.dismissPushedBack(`#${this.id} .copy-url-content`).finished.then(() => {
        if (this.state === 'open') return;
        this.toastElement.remove();
        this.onDismiss();
      });
    } else {
      animation.dismiss(`#${this.id} .copy-url-content`).finished.then(() => {
        if (this.state === 'open') return;
        this.toastElement.remove();
        this.onDismiss();
      });
    }

    this.state = 'close';
  }
}
