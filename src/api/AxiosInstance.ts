import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

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
    // 에러나면 무적권 체크하셈 토큰 만료됐는지
    if (error) {
      const response = await postRefreshToken();

      if (response) {
        localStorage.setItem('atk', response.accessToken);
        localStorage.setItem('rtk', response.refreshToken);
        error.config.headers['authorization'] = response;
        const originalResponse = await axios.request(error.config);
        return originalResponse;
      } else {
        // 에러나면 무조건 토큰을 체크하기 때문에 이 로직은 일단 주석처리
        // localStorage.clear();
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const postRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('rtk');
    const headers = {
      'Content-Type': 'application/json',
      rtk: refreshToken
    };

    const { data } = await axiosBaseInstance.post(
      '/home/users/reissue',
      {},
      {
        headers
      }
    );
    console.log('토큰 검사중', data);

    if (data.flag === 'success') {
      return data.data[0];
    } else if (data.flag === 'fail') {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export default axiosInstance;
