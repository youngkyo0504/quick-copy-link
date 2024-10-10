import { animate } from 'motion';

const keyframesLikeSpring = [0.32, 0.72, 0, 1] as const;

export const dismiss = (selector: string) => {
  return animate(selector, { y: 10, opacity: 0, filter: 'blur(2px)' }, { duration: 0.3 });
};

export const scale = (selector: string) => {
  return animate(selector, { scale: 1.1 }, { duration: 0.7, easing: keyframesLikeSpring });
};

export const shrink = (selector: string) => {
  return animate(selector, { scale: 1 }, { duration: 0.6, easing: 'ease-in-out' });
};

export const open = (selector: string) => {
  return animate(
    '.copy-url-content',
    { y: '0px', opacity: 1, filter: 'blur(0px)' },
    {
      y: {
        easing: keyframesLikeSpring,
        duration: 0.3,
      },
      filter: {
        duration: 0.3,
      },
      opacity: {
        easing: 'ease-in-out',
        duration: 0.3,
      },
    },
  );
};
