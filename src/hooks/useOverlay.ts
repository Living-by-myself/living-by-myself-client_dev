import useOverlayStore from 'src/store/overlayStore';
import { useId } from 'react';

export type OverlayElement = ({ close }: { close: () => void }) => React.ReactNode;

const useOverlay = () => {
  const { addOverlay, deleteOverlay } = useOverlayStore((state) => state);
  const overlayId = useId();

  return {
    open: (OverlayElement: OverlayElement) => {
      setTimeout(() => addOverlay(overlayId, OverlayElement({ close: () => deleteOverlay(overlayId) })), 0);
    },
    close: () => {
      deleteOverlay(overlayId);
    }
  };
};

export default useOverlay;
