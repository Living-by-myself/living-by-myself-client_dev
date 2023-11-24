import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessTokenWhenExpiration } from './user/user';
import { Navigate, useNavigate } from 'react-router-dom';
const token = localStorage.getItem('atk');

export const axiosBaseInstance = axios.create({
  baseURL: 'https://tracelover.shop'
});

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://tracelover.shop'
});

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
    if (error) {
      const response = await getAccessTokenWhenExpiration();
      if (response) {
        error.config.headers['Authorization'] = response;
        const originalResponse = await axiosInstance.request(error.config);
        return originalResponse;
      } else {
        localStorage.clear();
        alert('로그인이 만료되어 재로그인이 필요합니다.');
        Navigate({ to: '/' });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
