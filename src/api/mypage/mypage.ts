import axiosInstance from '../AxiosInstance';

export const getMyBadge = async () => {
  try {
    const response = await axiosInstance.get('/home/profile/badge');
    const badges = [...response.data];
    if (response.data.length < 9) {
      const length = response.data.length;

      for (let i = 0; i < 9 - length; i++) {
        badges.push({ type: 'none' });
      }
    }
    return badges;
  } catch (error) {}
};

//슬기님과 엔드포인트 협의
export const getMyCommunity = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/community/${userId}`);

    return response.data;
  } catch (error) {}
};

export const getMyGroupBuyByMe = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/${userId}`);

    return response.data;
  } catch (error) {}
};

export const getMyBookmark = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/pick/${userId}`);

    return response.data;
  } catch (error) {}
};

export const getMyGroupBuy = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/application/${userId}`);

    return response.data;
  } catch (error) {}
};
