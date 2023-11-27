import React, { useEffect, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import ChatList from './ChatList';
import axiosInstance from 'src/api/AxiosInstance';
import { useNavigate } from 'react-router-dom';

interface ChatUser {
  id: number;
  nickname: string;
  address: string;
}

interface ChatRoom {
  id: number;
  users: ChatUser[];
  lastChatMessage: string;
  lastChatTime: string;
}

const ChatPage = () => {
  const [chatList, setChatList] = useState<ChatRoom[]>([]);
  const userId = 8; // 임의로 지정한 상대 id -> 클릭한 user의 id를 받도록 변경해야함
  const navigate = useNavigate();
  const token = localStorage.getItem('atk');

  // 채팅방 조회
  const getChatList = async () => {
    try {
      const response = await axiosInstance.get('/home/chats/rooms');
      setChatList(response.data);

      return response;
    } catch (error) {}
  };

  // 채팅방 생성 - 상대 id를 가지고 있어야 함
  const createChat = async () => {
    try {
      const response = await axiosInstance.post('/room', [userId]);

      return response.data;
    } catch (error) {}
  };

  useEffect(() => {
    getChatList();
  }, []);

  const handleCreateChatButtonClick = async () => {
    const oneOnOneRoom = chatList.find((room) => {
      const users = room.users;
      return users.length === 2 && users.some((user) => user.id === userId);
    });

    if (oneOnOneRoom?.id! !== undefined) {
      navigate(`/chat/${oneOnOneRoom?.id!}`);
    } else {
      try {
        const newRoomId = await createChat(); // 상대 id 담길 듯?
        navigate(`/chat/${newRoomId}`);
      } catch (error) {}
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
