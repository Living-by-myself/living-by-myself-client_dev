import axios from 'axios';
import { set } from 'react-hook-form';
import { UserStore } from 'src/store/userStore';
const token = localStorage.getItem('atk');

export const getUserProfile = async () => {
  try {
    const response = await axios.get('https://tracelover.shop/home/profile', {
      withCredentials: true,
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBasicProfile = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`https://tracelover.shop/home/profile/other/${userId}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
