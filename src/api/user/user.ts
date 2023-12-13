import axios from 'axios';
import axiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';
import { LoginUserType } from 'src/types/user/types';

export const loginWithEmailPassword = async ({ username, password }: LoginUserType) => {
  try {
    const res = await axios.post('https://tracelover.shop/home/users/login', {
      username,
      password
    });
    localStorage.setItem('atk', res.data.atk);
    localStorage.setItem('rtk', res.data.rtk);

    toast('로그인이 완료되었습니다.');
    return res.data;
  } catch (error: any) {
    toast(error.response.data.msg);
  }
};

export const getAccessTokenWhenExpiration = async () => {
  try {
    const refreshToken = localStorage.getItem('rtk');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: refreshToken
    };

    const { data } = await axios.get('https://tracelover.shop/home/users/reissue', {
      withCredentials: true,
      headers
    });
    localStorage.setItem('atk', data.atk);

    return data;
  } catch (error) {}
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/home/profile', {
      responseType: 'json'
    });

    return response.data;
  } catch (error) {}
};

export const getOtherUserProfile = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/other/${userId}`, {});

    return response.data;
  } catch (error) {}
};

export const updateUserProfileImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.patch('/home/profile/image', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {}
};

export const getKakaoLoginToken = async (code: string) => {
  try {
    const response = await axios.get('https://tracelover.shop/home/oauth/kakao?code=', {
      params: {
        code: code
      }
    });

    localStorage.setItem('atk', response.data.atk);
    localStorage.setItem('rtk', response.data.rtk);
    return response.data;
  } catch (error) {}
};

export interface repostUserType {
  userId: string;
  description: string;
}

export const reportOtherUser = async (userId: string, description: string) => {
  try {
    const response = await axiosInstance.post(`/home/report/${userId}`, {
      description
    });
    return response.data;
  } catch (error) {}
};
