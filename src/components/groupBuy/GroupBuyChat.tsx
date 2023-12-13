import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';

const GroupBuyChat = () => {
  const handleCreateChatButtonClick = () => {
    console.log('버튼 연결 완료~');
    // 이 컴포넌트는 작성자가 아닌 유저에게만 나타날 것이기 때문에
    // 무조건 작성자 id를 넘겨받아서 중복 확인 후 1:1..
    // 그럼 이건 공구 채팅이 아닌거겠지..? 그냥 문의 개념의 1:1..
  };

  return <S.ChatButton onClick={handleCreateChatButtonClick}>채팅하기</S.ChatButton>;
};

const S = {
  ChatButton: styled.button`
    border: solid 1px ${COLORS.GREEN[300]};
    padding: 0.8rem 1.6rem;
    color: ${COLORS.GREEN[300]};
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  `
};

export default GroupBuyChat;
