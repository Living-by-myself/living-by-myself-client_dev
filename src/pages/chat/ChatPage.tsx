import React, { useEffect, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import ChatList from './ChatList';
import axiosInstance from 'src/api/AxiosInstance';
import { useNavigate } from 'react-router-dom';
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
  const token = localStorage.getItem('atk');
  const [myNickname, setMyNickname] = useState(''); // 1:1 title로 보낼 내 닉네임
  const { currentRoomTitle } = useRoomTitleStore(); // 1:1 title로 보낼 상대 닉네임 or 공구 제목 set할 예정
  const { currentUsersId } = useUsersIdStore();

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
    if (currentUsersId.length > 1) {
      try {
        const response = await axiosInstance.post('/room', {
          usersId: currentUsersId,
          title: `${currentRoomTitle}`
        });
        console.log('공구 채팅방 생성 성공!', response.data); // response로 newRoomId를 받는다?
        return response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axiosInstance.post('/room', {
          usersId: currentUsersId,
          title: `${myNickname}, ${currentRoomTitle}`
        });
        console.log('1:1 채팅방 생성 성공!', response.data); // response로 newRoomId를 받는다?
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getRoomList();
    getMyProfile();
  }, []);

  const handleCreateChatButtonClick = async () => {
    if (roomList.length > 0) {
      for (const room of roomList) {
        if ('room.title에 상대 유저 닉네임(currentRoomtitle)이 포함되어 있는지?') {
          navigate(`/chat/${room.id!}`);
        } else {
          try {
            const newRoomId = await createChat(); // 상대 id 담길 듯?
            console.log('2');
            navigate(`/chat/${newRoomId}`);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      // 채팅 내역이 하나도 없으면 비교 필요 없이 바로 생성
      const newRoomId = await createChat(); // 상대 id 담길 듯?
      navigate(`/chat/${newRoomId}`);
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
