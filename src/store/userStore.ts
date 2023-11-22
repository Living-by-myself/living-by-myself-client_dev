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
  // beobJeongDong: string | null;
}

const initValue = {
  profile: {
    nickname: '김철수',
    profileImage: 'https://picsum.photos/100',
    level: 10,
    address: '서울 강남구',
    beobJeongDong: '11111',
    cash: 12345
  },
  token: '12345',
  isLogged: true
};

const initValue2 = {
  profile: null,
  token: null,
  isLogged: false
};

const userStore = create(
  devtools<UserStoreType>((set) => ({
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

export default userStore;
