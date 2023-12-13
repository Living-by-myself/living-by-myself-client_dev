import {
  GROUP_BUY_CATEGORIES,
  GROUP_BUY_CATEGORY_SHARE,
  GROUP_BUY_SORT,
  GROUP_BUY_STATUS
} from 'src/components/groupBuy/groupBuyConstants';

export type GroupBuyDetailType = {
  id: number;
  title: string;
  description: string;
  itemLink: string | null;
  maxUser: number;
  currentUserCount: number;
  createdAt: string;
  modifiedAt: string;
  fileUrls: string | null;
  perUserPrice: number;
  pickLike: boolean;
  enumStatus: 'ONGOING' | 'DEADLINE';
  enumShare: 'BUY' | 'SHARE';
  created_at: string;
  viewCnt: number;
  address: string;
  beobJeongDong: string;
  lat: number;
  lng: number;
};

export type GroupBuyPreviewType = Pick<
  GroupBuyDetailType,
  | 'address'
  | 'beobJeongDong'
  | 'createdAt'
  | 'currentUserCount'
  | 'enumShare'
  | 'enumStatus'
  | 'fileUrls'
  | 'id'
  | 'maxUser'
  | 'modifiedAt'
  | 'perUserPrice'
  | 'pickLike'
  | 'title'
  | 'viewCnt'
>;

export interface JoinUserType {
  id: number;
  nickname: string;
  fileUrls: string;
}

{
}
export type GroupBuyCategoryShare = (typeof GROUP_BUY_CATEGORY_SHARE)[keyof typeof GROUP_BUY_CATEGORY_SHARE];

export type GroupBuyCategoryShareValues = GroupBuyCategoryShare['value'];

export type GroupBuyCategories = (typeof GROUP_BUY_CATEGORIES)[keyof typeof GROUP_BUY_CATEGORIES];

export type GroupBuyCategoriesValues = GroupBuyCategories['value'];

export type GroupBuySort = (typeof GROUP_BUY_SORT)[keyof typeof GROUP_BUY_SORT];

export type GroupBuySortValues = GroupBuySort['value'];

export type GroupBuyStatus = (typeof GROUP_BUY_STATUS)[keyof typeof GROUP_BUY_STATUS];

export type GroupBuyStatusValues = GroupBuyStatus['value'];
