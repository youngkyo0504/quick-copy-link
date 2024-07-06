import { SpringPhysics } from './physics';

export const showing = new SpringPhysics({
  startAt: 0,
  options: {
    namespace: '--copy-url',
    mass: 1,
    tension: 200,
    friction: 100,
    start_velocity: 0,
  },
  update: ({ namespace, value }) => {
    document.documentElement.style.setProperty(namespace + '-y', `${10 - value * 10}%`);
    document.documentElement.style.setProperty(namespace + '-opacity', `${value}`);
  },
});

export const scale = new SpringPhysics({
  startAt: 1,
  options: {
    namespace: '--copy-url',
    mass: 1,
    tension: 200,
    friction: 100,
    start_velocity: 0,
  },
  update: ({ namespace, value }) => {
    document.documentElement.style.setProperty(namespace + '-scale', `${value}`);
  },
});
