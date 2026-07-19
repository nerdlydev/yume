import type { Transition } from 'motion/react';

// For snappy UI elements like tabs, dock selection, quick state changes
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 1,
};

// For fluid, gentle movements like bottom sheets or modal entrances
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// For subtle bouncy elements (e.g. icon tap reactions)
export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
  mass: 1,
};
