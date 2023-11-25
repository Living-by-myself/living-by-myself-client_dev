import { getGroupBuyListOption } from 'src/api/groupBuy/groupBuy';
import { GroupBuyCategoriesValues, GroupBuyCategoryShareValues } from 'src/types/groupBuy/types';
import zustand, { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GroupBuyWriteFormProps {
  title: string;
  description: string;
  itemLink: string;
  maxUser: number;
  perUserPrice: number;
  enumShare: GroupBuyCategoryShareValues;
  enumCategory: GroupBuyCategoriesValues;
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

export interface GroupBuyQueryOption {
  option: getGroupBuyListOption;
  setOption: (option: getGroupBuyListOption) => void;
}

export const useGroupBuyQuery = create<GroupBuyQueryOption>()(
  devtools((set) => ({
    option: {
      page: 1,
      category: 'LIFE',
      category_share: 'ALL',
      category_status: 'DEADLINE',
      address: 0,
      keyword: '',
      sort: 'desc'
    },
    setOption: (option: getGroupBuyListOption) => set(() => ({ option }))
  }))
);

export interface groupBuySizeStoreOption {
  size: number;
  setSize: (size: number) => void;
}

export const groupBuySizeStore = create((set) => ({
  size: 1,
  setSize: (size: number) => set(() => ({ size }))
}));
