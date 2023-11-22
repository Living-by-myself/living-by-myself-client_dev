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
