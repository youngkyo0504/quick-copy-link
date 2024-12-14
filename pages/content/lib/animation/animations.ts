import { animate, timeline } from 'motion';

const keyframesLikeSpring = [0.32, 0.72, 0, 1] as const;

export const dismiss = (selector: string) => {
  return animate(selector, { y: 10, opacity: 0, filter: 'blur(3px)', scale: 0.95 }, { duration: 0.3 });
};

export const scaleAndShrink = (selector: string) =>
  timeline([
    [selector, { scale: 1.1 }, { duration: 0.7, easing: keyframesLikeSpring }],
    [selector, { scale: 1 }, { duration: 0.6, easing: 'ease-in-out' }],
  ]);

export const open = () => {
  return animate(
    '.copy-url-content',
    { y: '0px', opacity: 1, filter: 'blur(0px)', scale: 1 },
    {
      scale: {
        easing: keyframesLikeSpring,
        duration: 0.3,
      },
      y: {
        easing: keyframesLikeSpring,
        duration: 0.5,
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
