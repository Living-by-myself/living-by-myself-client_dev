import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { getAccessTokenWhenExpiration } from './user/user';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosRetry from 'axios-retry';
import userStore from 'src/store/userStore';

const token = localStorage.getItem('atk');

export const axiosBaseInstance = axios.create({
  baseURL: 'https://tracelover.shop'
});

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://tracelover.shop'
});

axiosRetry(axiosInstance, { retries: 5 });

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
  (response) => response,
  async (error) => {
    console.log(error, '인터셉터 에러');
    // 에러나면 무적권 체크하셈 혹시 토큰 만료됐는지
    // const navigate = useNavigate();
    if (!axiosRetry.isRetryableError(error)) {
      // 재시도가 불가능한 경우에만 토큰 갱신 및 새로고침을 수행
      const response = await getAccessTokenWhenExpiration();

      if (response) {
        error.config.headers['Authorization'] = response;
        console.log(error.config, '에러컨피그');

        const originalResponse = await axiosInstance.request(error.config);
        console.log(originalResponse, '오리지널 리스폰스');
        return originalResponse;
      } else {
        localStorage.clear();
        userStore.getState().logout();
        alert('로그인이 만료되어 재로그인이 필요합니다.');
        Navigate({ to: '/login' });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
