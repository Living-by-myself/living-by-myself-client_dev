import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type OverlayItem = React.ReactNode;

interface OverlayStore {
  overlays: Map<string, OverlayItem>;
  addOverlay: (overlayId: string, overlayItem: OverlayItem) => void;
  deleteOverlay: (overlayId: string) => void;
}

const overlayStore = create<OverlayStore>()(
  devtools((set) => ({
    overlays: new Map(),
    addOverlay: (overlayId, overlayItem) => {
      set((state) => {
        const overlays = new Map(state.overlays);
        overlays.set(overlayId, overlayItem);
        return { overlays };
      });
    },
    deleteOverlay: (overlayId) => {
      set((state) => {
        const overlays = new Map(state.overlays);
        overlays.delete(overlayId);
        return { overlays };
      });
    }
  }))
);

export default overlayStore;
