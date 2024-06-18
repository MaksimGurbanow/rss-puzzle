import { Props } from '../types/types';

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected element: T | null;

  constructor(
    props: Props<T>,
    ...children: (BaseComponent | HTMLElement | null)[]
  ) {
    this.element = null;
    this.createElement(props);
    if (children) {
      this.appendChildren(...children);
    }
  }

  public appendChildren(
    ...children: (BaseComponent | HTMLElement | null)[]
  ) {
    children
      .filter((child) => child !== null)
      .forEach((child) => {
        if (child instanceof BaseComponent) {
          const childElement = child.getElement();
          if (childElement) {
            this.element?.appendChild(childElement);
          }
        } else if (child instanceof HTMLElement) {
          this.element?.appendChild(child);
        }
      });
  }

  protected createElement(props: Props<T>) {
    const tag = props.tag ?? 'div';
    this.element = document.createElement(tag) as T;
    this.addClasses(props.classes);
    this.setTextContent(props.txt);
    this.setCallback(props.events);
  }

  protected addClasses(classes?: string[]) {
    classes?.map((className) => this.element?.classList.add(className));
  }

  public addClass(className: string) {
    this.element?.classList.add(className);
  }

  public removeClass(className: string) {
    this.element?.classList.remove(className);
  }

  public toggleClass(className: string) {
    this.element?.classList.toggle(className);
  }

  public setTextContent(text: string = '') {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  protected setCallback(events: Props['events']) {
    events?.forEach((event) => {
      const { callback, eventType } = event;
      if (typeof callback === 'function' && eventType) {
        this.element?.addEventListener(eventType, callback);
      }
    });
  }

  getElement(): T | null {
    return this.element;
  }

  public deleteElement() {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
      this.element = null;
    }
  }

  public setStyle(styleProperty: string, value: string) {
    if (this.element) {
      this.element.style.setProperty(styleProperty, value);
    }
  }

  public hasChild(target: HTMLElement) {
    return this.element?.contains(target);
  }

  public isEmpty() {
    return !this.element?.hasChildNodes();
  }
}
