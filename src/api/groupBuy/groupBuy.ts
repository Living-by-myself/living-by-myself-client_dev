import axios from 'axios';
import axiosInstance from '../AxiosInstance';
import { get } from 'http';

interface getGroupBuyListProps {
  page: number;
  size: number;
  sort: string;
}

export const getGroupBuyList = async ({ page, size, sort }: getGroupBuyListProps) => {
  console.log(page, size, sort);
  try {
    const res = await axiosInstance.get(`home/group-buying/search?page=${page}&size=${size}&sort=${sort}`, {
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
