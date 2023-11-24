import zustand, { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GroupBuyWriteFormProps {
  title: string;
  description: string;
  itemLink: string;
  maxUser: number;
  perUserPrice: number;
  enumShare: GroupBuyShare;
  enumCategory: GroupBuyCategory;
  address: string;
  lat: number;
  lng: number;
  beobJeongDong: string;
  images: FileList | null;
}
export interface GroupBuyWriteFormImageProps {
  image: File[] | null;
}

export type GroupBuyCategory = 'LIFE' | 'FOOD' | 'OTHER';
export type GroupBuyFilter = 'asc' | 'desc';
export type GroupBuyShare = 'SHARE' | 'BUY';
export type GroupBuyStatus = 'ONGOING' | 'DEADLINE';

interface GroupBuyWriteStore {
  title: string;
  description: string;
  enumCategory: GroupBuyCategory;
  enumShare: GroupBuyShare;
  itemLink: string;
  maxUser: number;
  perUserPrice: number;
  address: string;
  lat: number;
  lng: number;
  // beobJeongDong: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: GroupBuyCategory) => void;
  setShare: (share: GroupBuyShare) => void;
  setItemLink: (itemLink: string) => void;
  setMaxUser: (maxUser: number) => void;
  setPerUserPrice: (perUserPrice: number) => void;
  setAddress: (address: string) => void;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  // setBeobJeongDong: (beobJeongDong: string) => void;
}

interface GroupBuyWriteImageStore {
  files: File[];
  setFiles: (files: File[]) => void;
  removeFile: (file: File) => void;
}

export const groupBuyWriteStore = create<GroupBuyWriteStore>()(
  devtools((set) => ({
    title: '',
    description: '',
    enumCategory: 'LIFE',
    enumShare: 'SHARE',
    itemLink: '',
    maxUser: 0,
    perUserPrice: 0,
    address: '',
    lat: 0,
    lng: 0,
    // beobJeongDong: '',
    setTitle: (title: string) => set({ title }),
    setDescription: (description: string) => set({ description }),
    setCategory: (enumCategory: GroupBuyCategory) => set({ enumCategory }),
    setShare: (enumShare: GroupBuyShare) => set({ enumShare }),
    setItemLink: (itemLink: string) => set({ itemLink }),
    setMaxUser: (maxUser: number) => set({ maxUser }),
    setPerUserPrice: (perUserPrice: number) => set({ perUserPrice }),
    setAddress: (address: string) => set({ address }),
    setLat: (lat: number) => set({ lat }),
    setLng: (lng: number) => set({ lng })
  }))
);

export const groupBuyWriteImageStore = create<GroupBuyWriteImageStore>()(
  devtools((set, get) => ({
    files: [],
    setFiles: (files: File[]) => set({ files }),
    removeFile: (file: File) => {
      const { files } = get();
      const newFiles = files!.filter((f) => f !== file);
      set({ files: newFiles });
    }
  }))
);
