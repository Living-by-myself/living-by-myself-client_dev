import React, { useEffect, useRef } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';
import { ModalSides } from 'src/types/button/types';
import { ModalBGMotionVariants, ModalWrapperMotionVariants } from './motion';

import { MODAL_SIDES } from './modalConstants';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  side?: ModalSides;
}

const getFocusableElements = (target: Element) => {
  const focusableElements = 'a[href], button:not([disabled]), textarea, input, select';
  return target.querySelectorAll(focusableElements);
};

const BaseModal: React.FC<ModalProps> = ({ children, onClose, side = 'center', ...props }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useClickOutside(modalRef, () => onClose());

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      // only execute if tab is pressed
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;
      if (!modalRef.current) return;
      // here we query all focusable elements, customize as your own need
      const focusableModalElements = getFocusableElements(modalRef.current);
      const firstElement = focusableModalElements[0] as HTMLElement;
      const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement;

      // if going forward by pressing tab and lastElement is active shift focus to first focusable element
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }

      // if going backward by pressing tab and firstElement is active shift focus to last focusable element
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [onClose]);

  useEffect(() => {
    const focusedElementBeforeModal = document.activeElement as HTMLElement;
    if (modalRef.current) {
      const focusableModalElements = getFocusableElements(modalRef.current);
      const firstElement = focusableModalElements[0] as HTMLElement;
      if (firstElement) firstElement.focus();
    }
    previousFocusRef.current = focusedElementBeforeModal;

    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  return (
    <div>
      <S.ModalBackground initial="closed" animate="open" exit="closed" variants={ModalBGMotionVariants} />
      <S.ModalWrapper
        custom={side}
        initial="closed"
        animate="open"
        exit="closed"
        variants={ModalWrapperMotionVariants}
        side={side}
        {...props}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </S.ModalWrapper>
    </div>
  );
};

export default BaseModal;

type ModalWrapperProps = {
  side: ModalSides;
};

const S = {
  ModalWrapper: styled(motion.div)<ModalWrapperProps>`
    position: fixed;
    ${({ side }) => {
      switch (side) {
        case MODAL_SIDES.LEFT:
          return `
            top: 0;
            left: 0;
            height: 100vh;
          `;
        case MODAL_SIDES.RIGHT:
          return `
            top: 0;
            right: 0;
            height: 100vh;
          `;
        case MODAL_SIDES.TOP:
          return `
            top: 0;
            left: 0;
            width: 100vw;
          `;
        case MODAL_SIDES.BOTTOM:
          return `
            bottom: 0;
            left: 0;
            width: 100vw;
          `;
        case MODAL_SIDES.CENTER:
          return `
            top: 50%;
            left: 50%;
          `;
      }
    }}
  `,
  ModalBackground: styled(motion.div)`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(6px);
  `
};
