import axiosInstance from '../AxiosInstance';
import { getGroupBuyListURL } from 'src/utilities/getUrl';
import {
  GroupBuyCategoriesValues,
  GroupBuyCategoryShareValues,
  GroupBuySortValues,
  GroupBuyStatusValues
} from 'src/types/groupBuy/types';

export interface getGroupBuyListOption {
  page: number;
  sort: GroupBuySortValues;
  address: number;
  category: GroupBuyCategoriesValues;
  category_share: GroupBuyCategoryShareValues;
  category_status: GroupBuyStatusValues;
  keyword?: string;
}

export const getGroupBuyList = async (option: getGroupBuyListOption) => {
  const url = getGroupBuyListURL(option);

  try {
    const res = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res.data;
  } catch (error) {}
};

export const addGroupBuyPost = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('home/group-buying', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (error) {}
};

export const getGroupBuyDetailData = async (id: any) => {
  const response = await axiosInstance.get(`/home/group-buying/${id}`);
  return response.data;
};

// 북마크 등록
export const addGroupBuyPostBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.post(`/home/group-buying/${id}/pick-like`);
  } catch (error) {}
};

// 북마크 취소
export const deleteGroupBuyPostBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/home/group-buying/${id}/pick-like`);
  } catch (error) {}
};
