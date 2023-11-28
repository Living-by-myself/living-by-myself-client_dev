import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';
import { useRoomTitleStore } from 'src/store/chatStore';

interface ChatUser {
  id: number;
  nickname: string;
  address: string;
}

interface ChatRoom {
  id: number;
  title: string;
  userCount: number;
  lastChatMsg: string;
  lastChatTime: string;
}

const ChatList = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatRoom[] | null>(null);
  const { setCurrentRoomTitle } = useRoomTitleStore();

  const ChatRoomClick = (id: number, title: string) => {
    setCurrentRoomTitle(title);
    navigate(`/chat/${id}`);
  };

  const getChatList = async () => {
    try {
      const response = await axiosInstance.get(`/home/chats/rooms`);

      setChatList(response.data);
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      {chatList !== null && chatList?.length !== 0 ? (
        chatList.map((chat) => {
          return (
            // 마지막 메시지 보낸 시간과 내용은 담겨오지 않기 때문에 주석처리 후 텍스트 대체
            <S.ChatContainer key={chat.id} onClick={() => ChatRoomClick(chat.id, chat.title)}>
              <S.ChatInfoBox>
                <S.ChatRoomName>{chat.title}</S.ChatRoomName>
                {chat.userCount > 2 && <S.ChatUserCount>{chat.userCount}</S.ChatUserCount>}
                {/* <S.ChatRoomLastMessageTime>{chat.lastChatTime.slice(-8, -3) || '기록없음'}</S.ChatRoomLastMessageTime> */}
                <S.ChatRoomLastMessageTime>
                  {chat.lastChatTime ? chat.lastChatTime.slice(11, 16) : '기록없음'}
                </S.ChatRoomLastMessageTime>
              </S.ChatInfoBox>
              <S.ChatRoomLastMessage>{chat.lastChatMsg || '메시지 없음'}</S.ChatRoomLastMessage>
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
