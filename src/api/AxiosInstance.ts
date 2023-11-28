import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { getAccessTokenWhenExpiration } from './user/user';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosRetry from 'axios-retry';
import userStore from 'src/store/userStore';

export const axiosBaseInstance = axios.create({
  baseURL: 'https://tracelover.shop'
});
axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://tracelover.shop',
  headers: {
    Authorization: localStorage.getItem('atk')
  }
});
axiosRetry(axiosInstance, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('atk');

    if (!token) {
      return Promise.reject('No token');
    } else {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status }
    } = error;

    if (error) {
      const originalRequest = config;
      const newAtk = await getAccessTokenWhenExpiration();
      if (newAtk) {
        console.log('newAtk', newAtk);
        originalRequest.headers['Authorization'] = newAtk.atk;
        localStorage.setItem('atk', newAtk.atk);
        return axiosInstance(originalRequest);
      } else {
        localStorage.removeItem('atk');
        localStorage.removeItem('rtk');
        localStorage.removeItem('id');
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        // userStore.logout();
        Navigate({ to: '/login' });
      }
    }
  }
);

export default axiosInstance;
