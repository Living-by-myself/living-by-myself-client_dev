import useOverlayStore from 'src/store/overlayStore';
import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

const ModalView = () => {
  const { overlays, deleteOverlay } = useOverlayStore();
  const location = useLocation();
  const overlaysRef = useRef<Map<string, React.ReactNode> | null>(null);

  useEffect(() => {
    overlaysRef.current = overlays;
    if (overlays.size > 0) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [overlays]);

  useEffect(() => {
    if (!overlaysRef.current) return;
    const array = overlaysRef.current?.entries();
    [...array].forEach(([id]) => {
      deleteOverlay(id);
    });
  }, [location.pathname, deleteOverlay]);

  return (
    <>
      {createPortal(
        <AnimatePresence mode="wait">
          {[...overlays.entries()].map(([id, element]) => (
            <Fragment key={id}>{element}</Fragment>
          ))}
        </AnimatePresence>,
        document.querySelector('#modal')!
      )}
    </>
  );
};

export default ModalView;
