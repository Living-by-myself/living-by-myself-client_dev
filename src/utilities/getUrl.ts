import { CommunityCategoryValues, CommunitySortValues } from 'src/types/community/types';
import {
  GroupBuyCategoriesValues,
  GroupBuyCategoryShareValues,
  GroupBuySortValues,
  GroupBuyStatusValues
} from 'src/types/groupBuy/types';

export const getGroupBuyListURL = ({ page, option }: getGroupBuyPostListAPIOption): string => {
  const base_url = 'home/group-buying';

  let url = `${base_url}/search?page=${page}&size=6&sort=${option.sort}`;

  if (option.category && option.category !== 'ALL') {
    url += `&category=${option.category}`;
  }

  if (option && option.category_share !== 'ALL') {
    url += `&category_share=${option.category_share}`;
  }

  if (option.category_status === 'ONGOING') {
    url += `&category_status=${option.category_status}`;
  }

  if (option.address) {
    url += `&address=${option.address}`;
  }

  if (option.keyword) {
    url += `&keyword=${option.keyword}`;
  }

  url += `&sort=${option.sort}`;

  return url;
};

export interface getGroupBuyPostListOption {
  category?: GroupBuyCategoriesValues;
  keyword?: string;
  category_share: GroupBuyCategoryShareValues;
  category_status: GroupBuyStatusValues;
  sort: GroupBuySortValues;
  address?: string;
}

export interface getGroupBuyPostListAPIOption {
  page: number;
  option: getGroupBuyPostListOption;
}

export interface getCommunityPostListOption {
  category?: CommunityCategoryValues;
  keyword?: string;
  sort: CommunitySortValues;
}

export interface getCommunityPostListAPIOption {
  page: number;
  option: getCommunityPostListOption;
}

export const getCommunityPostListURL = ({ page, option }: getCommunityPostListAPIOption): string => {
  const base_url = 'https://tracelover.shop/home/communities';

  let url = `${base_url}/search?page=${page}&size=10&sort=${option.sort}`;

  if (option.category !== 'ALL') {
    url += `&category=${option.category}`;
  }

  if (option.keyword!.length > 2) {
    url += `&keyword=${option.keyword}`;
  }

  return url;
};
