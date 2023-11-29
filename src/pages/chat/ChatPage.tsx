import React, { useEffect, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import ChatList from './ChatList';
import axiosInstance from 'src/api/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoomTitleStore, useUsersIdStore } from 'src/store/chatStore';

interface ChatRoom {
  id: number;
  lastChatMessage: string;
  lastChatTime: string;
  userCount: number;
  title: string;
}

const ChatPage = () => {
  const [roomList, setRoomList] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();
  const [myNickname, setMyNickname] = useState(''); // 1:1 title로 보낼 내 닉네임
  const { currentRoomTitle, setCurrentRoomTitle } = useRoomTitleStore(); // 1:1 title로 보낼 상대 닉네임 or 공구 제목 set할 예정
  const { currentUsersId, setCurrentUsersId } = useUsersIdStore();
  // const param = useParams();
  // const groupBuyingRoomId = param.id;
  const groupBuyingRoomId = 1;

  // title로 보내기 위해 내 정보 조회
  const getMyProfile = async () => {
    try {
      const response = await axiosInstance.get('/home/profile');
      console.log('내 정보 : ', response.data);
      const myProfile = response.data;
      setMyNickname(myProfile.nickname);
    } catch (error) {
      console.log('내 프로필 가져오기 실패! ', error);
    }
  };

  // 채팅방 조회
  const getRoomList = async () => {
    try {
      const response = await axiosInstance.get('/home/chats/rooms');
      setRoomList(response.data);
      console.log('채팅방 전체 목록 조회 성공!', response.data);
      return response;
    } catch (error) {}
  };

  // 채팅방 생성
  const createChat = async () => {
    try {
      const response = await axiosInstance.post('/room', {
        usersId: currentUsersId,
        title: `${myNickname}, ${currentRoomTitle}`,
        groupBuyingRoomId: currentUsersId.length > 1 ? groupBuyingRoomId : null
      });
      console.log('채팅방 생성 성공!', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomList();
    getMyProfile();
    console.log('currentUsersId : ', currentUsersId);
    setCurrentRoomTitle(`test@naver.com, test1@naver.com, test2@naver.com`);
    setCurrentUsersId([2, 3]);
  }, []);

  const handleCreateChatButtonClick = async () => {
    // if (roomList.length > 0) {
    //   for (const room of roomList) {
    //     if (room.title === currentRoomTitle) {
    //       navigate(`/chat/${room.id!}`);
    //     } else {
    //       try {
    //         const newRoomId = await createChat();
    //         navigate(`/chat/${newRoomId}`);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // } else {
    //   // 채팅 내역이 하나도 없으면 비교 필요 없이 바로 생성
    //   const newRoomId = await createChat();
    //   navigate(`/chat/${newRoomId}`);
    // }

    // 새롭게 만드는 title을 가진 방이 이미 있는지 확인
    const existingRoom = roomList.find((room) => room.title === currentRoomTitle);

    if (existingRoom) {
      navigate(`/chat/${existingRoom.id!}`);
    } else {
      try {
        const newRoomId = await createChat();
        navigate(`/chat/${newRoomId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MobileContainer>
      <S.Container>
        <S.Label>
          채팅
          <button
            style={{ border: '2px solid skyblue', padding: '5px 10px', borderRadius: '5px', marginLeft: '5px' }}
            onClick={handleCreateChatButtonClick}
          >
            채팅방 생성하기
          </button>
        </S.Label>
        <ChatList />
      </S.Container>
    </MobileContainer>
  );
};

export default ChatPage;

const S = {
  Container: styled.div`
    padding-top: 10px;
    width: 100%;
    height: 100%;
  `,
  Label: styled.p`
    ${styleFont.h3};
    color: ${COLORS.GRAY[900]};
    margin-left: 13px;
  `
};
