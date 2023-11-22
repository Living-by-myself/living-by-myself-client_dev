import axios from 'axios';
import axiosInstance, { axiosBaseInstance } from './AxiosInstance';

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (error.response.code === "403") {
      const response = await postRefreshToken();

      if (response) {
        localStorage.setItem('atk', response.accessToken);
        localStorage.setItem('rtk', response.refreshToken);
        error.config.headers['authorization'] = response;
        const originalResponse = await axios.request(error.config);
        return originalResponse;
      } else {
        localStorage.clear();
        window.location.href = '/login';
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
    console.log("토큰 검사중",data)

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
