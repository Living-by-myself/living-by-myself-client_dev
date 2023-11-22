import { MODAL_SIDES } from './modalConstants';
import { ModalSides } from 'src/types/button/types';

export const ModalWrapperMotionVariants = {
  open: (side: ModalSides) => ({
    opacity: 1,
    x: side === MODAL_SIDES.CENTER ? '-50%' : 0,
    y: side === MODAL_SIDES.CENTER ? '-50%' : 0,
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  }),
  closed: (side: ModalSides) => ({
    opacity: 0,
    x:
      side === MODAL_SIDES.LEFT
        ? '-100%'
        : side === MODAL_SIDES.RIGHT
          ? '100%'
          : side === MODAL_SIDES.CENTER
            ? '-50%'
            : 0,
    y:
      side === MODAL_SIDES.TOP
        ? '-100%'
        : side === MODAL_SIDES.BOTTOM
          ? '100%'
          : side === MODAL_SIDES.CENTER
            ? '-50%'
            : 0
  })
};

export const ModalBGMotionVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  },
  closed: {
    opacity: 0
  }
};
