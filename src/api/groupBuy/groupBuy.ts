import axiosInstance from '../AxiosInstance';
import { getGroupBuyListURL, getGroupBuyPostListAPIOption } from 'src/utilities/getUrl';
import {
  GroupBuyCategoriesValues,
  GroupBuyCategoryShareValues,
  GroupBuyPreviewType,
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

export const getGroupBuyList = async ({ option, page }: getGroupBuyPostListAPIOption) => {
  try {
    const url = getGroupBuyListURL({ option, page });
    console.log(url);

    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = response.data.groupBuyingResponseDtoList as GroupBuyPreviewType[];

    // 전체 게시글 수
    const allPostCount = response.data.len;

    // 전체 페이징 수
    const allPageCount = Math.ceil(allPostCount / 6);
    const returnData = { data, totalPages: allPageCount, page };
    return returnData;
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
