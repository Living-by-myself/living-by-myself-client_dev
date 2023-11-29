import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import ChatList from '../../components/chat/ChatList';

const ChatPage = () => {
  return (
    <MobileContainer>
      <S.Container>
        <S.Label>채팅</S.Label>
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
