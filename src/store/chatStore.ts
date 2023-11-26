import { create } from 'zustand';

interface roomTitleStore {
  currentRoomTitle: string;
  setCurrentRoomTitle: (roomTitle: string) => void;
}

export const useRoomTitleStore = create<roomTitleStore>()((set) => ({
  currentRoomTitle: '',
  setCurrentRoomTitle: (roomTitle) => set(() => ({ currentRoomTitle: roomTitle }))
}));

interface messageStore {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
}

export const useMesssageStore = create<messageStore>()((set) => ({
  currentMessage: '',
  setCurrentMessage: (message) => set(() => ({ currentMessage: message }))
}));

interface inputErrorStore {
  currentInputError: boolean;
  setCurrentInputError: (inputError: boolean) => void;
}

export const useInputErrorStore = create<inputErrorStore>()((set) => ({
  currentInputError: false,
  setCurrentInputError: (inputError) => set(() => ({ currentInputError: inputError }))
}));
