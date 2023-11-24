import axios from 'axios';
import axiosInstance from '../AxiosInstance';

export const getGroupBuyList = async () => {
  try {
    const res = await axiosInstance.get('group-buying/search?page=0&size=6&sort=asc', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
