//import Button from "@/components/common/button";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from 'src/api/AxiosInstance';
import useOverlay from 'src/hooks/useOverlay';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import OtherUserProfile from 'src/components/user/OtherUserProfileModal';

interface User {
  id: number;
  profileImage: string;
  nickname: string;
  address: string;
}

const ChatDetailEditPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const paramId = param.id;
  const [postId, setPostId] = useState(0);
  const [userList, setUserList] = useState<User[] | null>(null); // 게시물 아이디 알아야 함..
  const overlay = useOverlay();

  // 유저 정보 가져오기 위한 로직 필요.. 여기서 paramId 사용될 듯

  // 공구 게시물 id나 title 가져올 방법 ...

  // (공구) 게시물로 이동
  const goToPostButtonClick = () => {
    // 필요한 것 : 해당 게시물 id..아니면 title..?
    // id가 있으면 바로 찾아갈 수 있는데 어디서 나.. 이걸..
    // 항상 공구 페이지에서 여기까지 넘어오진 않을 거니까 공구 목록 가져와서
    // title로 찾아야하나? 근데 title은 고유값이 아닐텐데..
    // title로 찾고 user정보로 같이 찾는다고 해도 고유하다고 장담할 수 없음..
    navigate(`/group-buy/${postId}`);
  };

  // 채팅방 나가는 버튼 .. 근데 이렇게 나가면 공구나 1:1이나 남는 한 사람은 어떻게 되나..? 허허허
  const leaveChatRoomButtonClick = async () => {
    try {
      const response = await axiosInstance.delete(`/home/chats/room/${paramId}`);
      console.log('채팅방 나가기 성공!', response.data);
      navigate(`/chat`);
    } catch (error) {
      console.log('채팅방 나가기 실패! ', error);
    }
  };

  const openOtherUserProfileModal = () => {
    // overlay.open(({ close }) => <OtherUserProfile userId={userId} onClose={close} />);
  };

  return (
    <MobileContainer>
      <S.Title>채팅 참여자</S.Title>
      <S.UserContainer>
        {/* 유저 정보 나열 */}
        {userList !== null && userList.length !== 0 ? (
          userList.map((user) => {
            return (
              <S.User>
                <S.UserProfileImg
                  onClick={openOtherUserProfileModal}
                  alt="profileUmg"
                  src={user.profileImage == null ? 'http://via.placeholder.com/640x480' : user.profileImage}
                />
                <S.UserNickname>{user.nickname || '닉네임 없음'}</S.UserNickname>
                <S.UserInfo>{user.address || '주소 없음'}</S.UserInfo>
              </S.User>
            );
          })
        ) : (
          <>
            <div>유저 목록이 없습니다.</div>
            <S.User>
              {/* <S.UserProfileImg onClick={openOtherUserProfileModal} alt="profileUmg" src={user.profileImage == null ? 'http://via.placeholder.com/640x480' : user.profileImage}/> */}
            </S.User>
          </>
        )}
      </S.UserContainer>

      {/* 해당게시글 이동 버튼 (공구채팅방일때만..) */}
      {/* 채팅방 나가기 버튼 */}
      <S.ButtonContainer>
        <S.GoToPostButton onClick={goToPostButtonClick}>해당 게시글로 이동</S.GoToPostButton>
        <S.LeaveChatRoomButton onClick={leaveChatRoomButtonClick}>채팅방 나가기</S.LeaveChatRoomButton>
      </S.ButtonContainer>
    </MobileContainer>
  );
};

export default ChatDetailEditPage;

const S = {
  Title: styled.div`
    padding-top: 9px;
    font-size: ${styleFont.h4};
    font-size: ${COLORS.GRAY[900]};
  `,
  UserContainer: styled.div`
    width: 100%;
    padding-left: 10px;
  `,
  User: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;

    padding: 10px 0;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
  `,
  UserProfileImg: styled.img`
    width: 30px;
    height: 30px;
    background-color: royalblue;
    border-radius: 30px;
    border: none;
  `,
  UserNickname: styled.div`
    font-size: ${styleFont.body1};
  `,
  UserInfo: styled.div`
    font-size: ${styleFont.body4};
    color: ${COLORS.GRAY[400]};
  `,
  ButtonContainer: styled.div`
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  GoToPostButton: styled.button`
    background-color: ${COLORS.GREEN[400]};
    color: white;
    border-radius: 6px;
    padding: 14px 8px;
    margin-right: 11px;
    font-size: ${styleFont.body1};
  `,
  LeaveChatRoomButton: styled.button`
    border: 2px solid #f53a3a;
    border-radius: 6px;
    padding: 14px 8px;
    font-size: ${styleFont.body1};
    color: ${COLORS.RED[400]};
  `
};
