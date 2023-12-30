import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';
import { useRoomTitleStore } from 'src/store/chatStore';
import { ChatRoom } from 'src/types/chat/types';
import { getRelativeTimeString } from 'src/utilities/getDate';

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
    } catch (error) {
      console.log(error);
    }
  };

  const padZero = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  // 서버에서 넘겨주는 형식을 getRelativeTimeString에서 바로 받을 수 있는 형식으로 먼저 변환
  const changeLastChatTime = (originalDateValue: string) => {
    const originalDate = new Date(originalDateValue);
    const formattedDate = `${originalDate.getFullYear()}-${padZero(originalDate.getMonth() + 1)}-${padZero(
      originalDate.getDate()
    )} ${padZero(originalDate.getHours())}:${padZero(originalDate.getMinutes())}:${padZero(originalDate.getSeconds())}`;
    return formattedDate;
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      {chatList !== null && chatList?.length !== 0 ? (
        chatList.map((chat) => {
          return (
            <S.ChatContainer key={chat.id} onClick={() => ChatRoomClick(chat.id, chat.title)}>
              <S.ChatInfoBox>
                <S.ChatInfoBoxLeftContents>
                  <S.ChatRoomName>{chat.title}</S.ChatRoomName>
                  {chat.userCount > 2 && <S.ChatUserCount>{chat.userCount}</S.ChatUserCount>}
                </S.ChatInfoBoxLeftContents>
                <div>
                  <S.ChatRoomLastMessageTime>
                    {/* {chat.lastChatTime ? chat.lastChatTime.slice(11, 16) : '기록없음'} */}
                    {chat.lastChatTime ? getRelativeTimeString(changeLastChatTime(chat.lastChatTime)) : '기록없음'}
                  </S.ChatRoomLastMessageTime>
                </div>
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
    justify-content: space-between;
  `,
  ChatInfoBoxLeftContents: styled.div`
    display: flex;
    align-items: center;
  `,
  ChatRoomName: styled.p`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    max-width: 530px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ChatUserCount: styled.p`
    ${styleFont.body2}
    color: ${COLORS.GRAY[400]};
    margin-left: 7px;
    font-weight: bold;
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
