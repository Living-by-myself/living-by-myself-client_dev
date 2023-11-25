import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';

interface ChatUser {
  id: number;
  nickname: string;
  address: string;
}

interface ChatRoom {
  id: number;
  users: ChatUser[];
  lastChatMsg: string;
  lastChatTime: string;
}

const ChatList = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatRoom[]>([]);
  const ChatRoomClick = (id: number) => {
    navigate(`/chat/${id}`);
  };

  const getChatList = async () => {
    try {
      const response = await axiosInstance.get(`/home/chats/rooms`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      console.log('ChatList에서 조회한 response.data', response.data);
      setChatList(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      {Array.isArray(chatList) && chatList?.length !== 0 ? (
        chatList.map((chat) => {
          return (
            // 마지막 메시지 보낸 시간과 내용은 담겨오지 않기 때문에 주석처리 후 텍스트 대체
            <S.ChatContainer key={chat.id} onClick={() => ChatRoomClick(chat.id)}>
              <S.ChatInfoBox>
                {/* 원래는 chat.title로 하고싶은데 그냥 아이디 값으로 대체해 놓음.. */}
                <S.ChatRoomName>{chat.id}</S.ChatRoomName>
                {chat.users.length > 2 && <S.ChatUserCount>{chat.users.length}</S.ChatUserCount>}
                {/* <S.ChattingRoomLastMessageTime>{chat.getCreatedAtAsString.slice(-8, -3)}</S.ChattingRoomLastMessageTime> */}
                {/* <S.ChatRoomLastMessageTime>{chat.lastChatTime.slice(-8, -3)}</S.ChatRoomLastMessageTime> */}
              </S.ChatInfoBox>
              {/* <S.ChatRoomLastMessage>{chat.lastChatMsg}</S.ChatRoomLastMessage> */}
              <S.ChatRoomLastMessage>안녕하세요</S.ChatRoomLastMessage>
            </S.ChatContainer>
          );
        })
      ) : (
        <div>채팅 내역이 없습니다.</div>
      )}
    </>
  );
};

export default ChatList;

const S = {
  ChatContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 13px;
    border-bottom: 1px solid ${COLORS.GRAY[500]};
    cursor: pointer;
  `,
  ChatInfoBox: styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
  `,
  ChatRoomName: styled.p`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
  `,
  ChatUserCount: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GREEN[400]};
  `,
  ChatRoomLastMessageTime: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[400]};
  `,
  ChatRoomLastMessage: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[900]};
  `
};
