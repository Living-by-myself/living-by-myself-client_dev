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

export const getAccessTokenWhenExpiration = async () => {
  try {
    const refreshToken = localStorage.getItem('rtk');
    console.log('만료됨 액세스 토큰', localStorage.getItem('atk'));
    console.log(localStorage.getItem('atk') === refreshToken);
    console.log('리프레시 토큰', refreshToken);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: refreshToken
    };

    const { data } = await axios.get('https://tracelover.shop/home/users/reissue', {
      withCredentials: true,
      headers
    });
    localStorage.setItem('atk', data.atk);
    console.log(data, '토큰 재발급 성공');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/home/profile', {
      responseType: 'json'
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUserProfile = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/other/${userId}`, {});

    return response.data;
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
};

export const getKakaoLoginToken = async (code: string) => {
  try {
    const response = await axios.get('https://tracelover.shop/home/oauth/kakao?code=', {
      params: {
        code: code
      }
    });
    console.log(response.data);
    localStorage.setItem('atk', response.data.atk);
    localStorage.setItem('rtk', response.data.rtk);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
