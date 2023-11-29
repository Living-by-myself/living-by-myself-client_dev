import zustand, { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserStoreType {
  profile: UserProfile | null;
  token: string | null;
  setProfile: (user: UserProfile) => void;
  setToken: (token: string) => void;
  isLogged: boolean;
  clearToken: () => void;
  logout: () => void;
}

export interface UserProfile {
  nickname: string;
  profileImage: string | null;
  level: number;
  address: string | null;
  cash: number;
  userId: number;
  // beobJeongDong: string | null;
}

const initValue = {
  profile: {
    nickname: '김철수',
    profileImage: 'https://picsum.photos/100',
    level: 10,
    address: '서울 강남구',
    beobJeongDong: '11111',
    cash: 12345,
    userId: 0
  },
  token: '12345',
  isLogged: true
};

const initValue2 = {
  profile: null,
  token: null,
  isLogged: false
};

const userStore = create<UserStoreType>()(
  devtools((set) => ({
    ...initValue2,
    setProfile: (user) => set({ profile: user }),
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
    logout: () => set({ profile: null, token: null })
  }))
);

userStore.subscribe((state) => {
  state.isLogged = !!state.token;
});

interface UserStoreAction {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

interface findPasswordTokenAction {
  token: string;
  setToken: (token: string) => void;
}

export const UserStore = create<UserStoreAction>((set, get) => ({
  user: null,
  setUser: (user: UserProfile | null) => set({ user })
}));

export const findPasswordToken = create<findPasswordTokenAction>((set) => ({
  token: '',
  setToken: (token: string) => set({ token })
}));

export default userStore;
