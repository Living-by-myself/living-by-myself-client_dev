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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGroupBuyPost = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('home/group-buying', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupBuyDetailData = async (id: any) => {
  const response = await axiosInstance.get(`/home/group-buying/${id}`);
  return response.data;
};
