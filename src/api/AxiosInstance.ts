import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const token = localStorage.getItem('atk');

export const axiosBaseInstance = axios.create({
  baseURL: 'https://tracelover.shop'
})

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

export default axiosInstance;
