import axiosInstance from '../AxiosInstance';

const userId = localStorage.getItem('id');

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
  } catch (error) {
    console.log(error);
  }
};

//슬기님과 엔드포인트 협의
export const getMyCommunity = async () => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(`/home/profile/community/${userId}`);
    console.log(response.data, '내가 쓴 커뮤니티 글');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyGroupBuyByMe = async () => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/${userId}`);
    console.log(response.data, '내가 쓴 공동구매 글');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyBookmark = async () => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/pick/${userId}`);
    console.log(response.data, '내가 찜한 공동구매 글');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyGroupBuy = async () => {
  console.log(userId);

  try {
    const response = await axiosInstance.get(`/home/profile/group-buying/application/${userId}`);
    console.log(response.data, '내가 신청한 공동구매 글');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
