import axios from 'axios';
import { LoginUserType } from 'src/components/auth/Login';
import axiosInstance from '../AxiosInstance';

export const loginWithEmailPassword = async ({ username, password }: LoginUserType) => {
  try {
    const res = await axios.post('https://tracelover.shop/home/users/login', {
      username,
      password
    });
    localStorage.setItem('atk', res.data.atk);
    localStorage.setItem('rtk', res.data.rtk);

    alert('로그인 성공');
    return res.data;
  } catch (error: any) {
    alert(error.response.data.msg);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/home/profile', {});

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBasicProfile = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/other/${userId}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put('/home/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
