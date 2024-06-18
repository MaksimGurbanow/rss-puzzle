import { CallbackType } from '../types/types';
import BaseComponent from '../components/BaseComponent';

export const div = (content?: string) => {
  const divEl = new BaseComponent({ tag: 'div', txt: content });
  return divEl;
};

export const h3 = (content: string) => {
  const divEl = new BaseComponent({ tag: 'h3', txt: content });
  return divEl;
};

export const h2 = (content: string) => {
  const divEl = new BaseComponent({ tag: 'h2', txt: content });
  return divEl;
};

export const button = (contet: string, callback?: CallbackType) => {
  const buttonEl = new BaseComponent({
    tag: 'button',
    txt: contet,
    events: [
      {
        eventType: 'click',
        callback,
      },
    ],
  });
  return buttonEl;
};

export const img = (src: string) => {
  const imgEl = new BaseComponent({
    tag: 'img',
    txt: src,
  });

  return imgEl;
};
