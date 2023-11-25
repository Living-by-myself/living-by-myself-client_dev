import { create } from 'zustand';

interface roomTitleStore {
  currentRoomTitle: string;
  setCurrentRoomTitle: (roomTitle: string) => void;
}

export const useRoomTitleStore = create<roomTitleStore>()((set) => ({
  currentRoomTitle: '',
  setCurrentRoomTitle: (roomTitle) => set(() => ({ currentRoomTitle: roomTitle }))
}));
