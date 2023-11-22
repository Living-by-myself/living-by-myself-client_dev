import React from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const ChatPage = () => {
  return (
    <MobileContainer>
      <S.Container>
        <S.Label>
          채팅
          <button style={{ border: '1px solid royalblue', padding: '10px', borderRadius: '10px', marginLeft: '5px' }}>
            채팅방 생성하기
          </button>
        </S.Label>

        {/* 채팅 리스트 컴포넌트화 해야함 */}
        <ChatList />
        <ChatRoom />
      </S.Container>
    </MobileContainer>
  );
};

export default ChatPage;

const S = {
  Container: styled.div`
    padding-top: 9px;
    width: 100%;
    height: 100%;
  `,
  Label: styled.p`
    ${styleFont.body2};
    color: ${COLORS.GRAY[900]};
  `
};
