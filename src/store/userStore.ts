import zustand, { create } from 'zustand';

interface UserStore {
  nickname: string;
  profileImage: string;
  level: number;
  address: string | null;
  cash: number;
}



interface UserStoreAction {
  user: UserStore | null;
  setUser: (user: UserStore | null) => void;
}

interface findPasswordTokenAction {
  token : string;
  setToken:(token:string) => void;
}

export const UserStore = create<UserStoreAction>((set, get) => ({
  user: null,
  setUser: (user: UserStore | null) => set({ user })
}));

export const findPasswordToken = create<findPasswordTokenAction>((set)=>({
  token:'',
  setToken:(token: string) => set({token})
}))
