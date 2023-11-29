import { getGroupBuyListOption } from 'src/api/groupBuy/groupBuy';
import {
  GroupBuyCategoriesValues,
  GroupBuyCategoryShareValues,
  GroupBuySortValues,
  GroupBuyStatusValues
} from 'src/types/groupBuy/types';
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

export type GroupBuyCategory = 'ALL' | 'LIFE' | 'FOOD' | 'OTHER';
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

export interface getGroupBuyListOptionStore {
  category: GroupBuyCategoriesValues;
  category_share: GroupBuyCategoryShareValues;
  category_status: GroupBuyStatusValues;
  address: number;
  keyword: string;
  sort: GroupBuySortValues;
  setCategory: (category: GroupBuyCategoriesValues) => void;
  setCategoryShare: (categoryShare: GroupBuyCategoryShareValues) => void;
  setCategoryStatus: (categoryStatus: GroupBuyStatusValues) => void;
  setAddress: (address: number) => void;
  setKeyword: (keyword: string) => void;
  setSort: (sort: GroupBuySortValues) => void;
}

export const groupBuyAPIOptionStore = create<getGroupBuyListOptionStore>()(
  devtools((set) => ({
    category: 'ALL',
    category_share: 'ALL',
    category_status: 'ONGOING',
    address: 0,
    keyword: '',
    sort: 'desc',
    setCategory: (category: GroupBuyCategoriesValues) => {
      set({ category });
    },
    setCategoryShare: (categoryShare: GroupBuyCategoryShareValues) => {
      set({ category_share: categoryShare });
    },
    setCategoryStatus: (categoryStatus: GroupBuyStatusValues) => {
      set({ category_status: categoryStatus });
    },
    setAddress: (address: number) => {
      set({ address });
    },
    setKeyword: (keyword: string) => {
      set({ keyword });
    },
    setSort: (sort: GroupBuySortValues) => {
      set({ sort });
    }
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
