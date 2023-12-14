import axiosInstance from '../AxiosInstance';

// 채팅방 조회
export const getRoomList = async () => {
  try {
    const response = await axiosInstance.get('/home/chats/rooms');
    return response.data;
  } catch (error) {}
};

export const createChat = async (
  currentUsersId: number[],
  myNickname: string,
  currentRoomTitle: string,
  groupBuyingRoomId: number | null
) => {
  try {
    const response = await axiosInstance.post('/room', {
      usersId: currentUsersId,
      title: `${myNickname}, ${currentRoomTitle}`,
      groupBuyingRoomId: currentUsersId.length > 0 ? groupBuyingRoomId : null
    });

    console.log('채팅방 생성 성공!', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
