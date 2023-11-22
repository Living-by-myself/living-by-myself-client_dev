//import Button from "@/components/common/button";
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

const ChatDetailEditPage = () => {
  return (
    <MobileContainer>
      <S.Container>채팅 참여자</S.Container>
      <S.UserContainer>
        {/* 유저 정보 나열 */}
        <S.User>
          <S.UserProfile></S.UserProfile>
          <S.UserNickname>닉네임</S.UserNickname>
          <S.UserInfo>동네</S.UserInfo>
        </S.User>
        <S.User>
          <S.UserProfile></S.UserProfile>
          <S.UserNickname>닉네임</S.UserNickname>
          <S.UserInfo>동네</S.UserInfo>
        </S.User>
        <S.User>
          <S.UserProfile></S.UserProfile>
          <S.UserNickname>닉네임</S.UserNickname>
          <S.UserInfo>동네</S.UserInfo>
        </S.User>
        <S.User>
          <S.UserProfile></S.UserProfile>
          <S.UserNickname>닉네임</S.UserNickname>
          <S.UserInfo>동네</S.UserInfo>
        </S.User>
      </S.UserContainer>

      {/* 해당게시글 이동 버튼 (공구채팅방일때만..) */}
      {/* 채팅방 나가기 버튼 */}
      <S.ButtonContainer>
        <button>게시글 이동</button>
        <button>채팅방 나가기</button>
      </S.ButtonContainer>
    </MobileContainer>
  );
};

export default ChatDetailEditPage;

const S = {
  Container: styled.div`
    padding-top: 9px;
  `,
  UserContainer: styled.div`
    width: 100%;
  `,
  User: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;

    padding: 10px 0;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
  `,
  UserProfile: styled.div`
    width: 30px;
    height: 30px;
    background-color: royalblue;
    border-radius: 15px;
  `,
  UserNickname: styled.div`
    font-size: ${styleFont.body1};
  `,
  UserInfo: styled.div`
    font-size: ${styleFont.body4};
    color: ${COLORS.GRAY[400]};
  `,
  ButtonContainer: styled.div``
};
