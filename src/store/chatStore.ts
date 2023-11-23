import { create } from 'zustand';

interface roomIdStore {
  currentRoomId: number;
  setCurrentRoomId: (roomId: number) => void;
}

export const useRoomIdStore = create<roomIdStore>()((set) => ({
  currentRoomId: 0,
  setCurrentRoomId: (roomId) => set(() => ({ currentRoomId: roomId }))
}));
