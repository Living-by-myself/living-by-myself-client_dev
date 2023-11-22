import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { useLocation, useNavigate } from 'react-router-dom';

const Dummy = [
  {
    id: 1,
    title: '유저1',
    content: '안녕하세요 유저1입니다.',
    getCreatedAtAsString: '2023-11-08 14:56:26'
  },
  {
    id: 2,
    title: '유저2',
    content: '안녕하세요 유저2입니다.',
    getCreatedAtAsString: '2023-11-08 14:57:26'
  },
  {
    id: 3,
    title: '마우스 공구 모여라',
    content: '참여하고 싶습니다.',
    getCreatedAtAsString: '2023-11-08 14:53:26'
  },
  {
    id: 4,
    title: '키보드 공구 모여라',
    content: '취소할까요?',
    getCreatedAtAsString: '2023-11-08 14:52:26'
  }
];

const ChatList = () => {
  const navigate = useNavigate();

  const ChatRoomClick = (id: number) => {
    navigate(`/chat/${id}`);
  };

  return (
    <>
      {Dummy.map((chat) => {
        return (
          <S.ChattingContainer key={chat.id} onClick={() => ChatRoomClick(chat.id)}>
            <S.ChattingInfoBox>
              <S.ChattingRoomName>{chat.title}</S.ChattingRoomName>
              <S.ChattingRoomLastMessageTime>{chat.getCreatedAtAsString.slice(-8, -3)}</S.ChattingRoomLastMessageTime>
            </S.ChattingInfoBox>
            <S.ChattingRoomLastMessage>{chat.content}</S.ChattingRoomLastMessage>
          </S.ChattingContainer>
        );
      })}
    </>
  );
};

export default ChatList;

const S = {
  ChattingContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 13px 0;
    border-bottom: 1px solid ${COLORS.GRAY[500]};
    cursor: pointer;
  `,
  ChattingInfoBox: styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
  `,
  ChattingRoomName: styled.p`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
  `,
  ChattingRoomLastMessageTime: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[400]};
  `,
  ChattingRoomLastMessage: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[900]};
  `
};
