import axiosInstance from '../AxiosInstance';

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('https://tracelover.shop/home/profile', {});

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
