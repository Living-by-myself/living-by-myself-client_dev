//import Button from "@/components/common/button";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from 'src/api/AxiosInstance';
import useOverlay from 'src/hooks/useOverlay';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import OtherUserProfile from 'src/components/user/OtherUserProfileModal';
import { ChatUser } from 'src/types/chat/types';

const ChatDetailEditPage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const paramId = param.id;
  const [userList, setUserList] = useState<ChatUser[] | null>(null); // 게시물 아이디 알아야 함..
  const overlay = useOverlay();
  const [postId, setPostId] = useState<number | null>(null);

  // 유저들 정보 가져오기
  const getChatUsers = async () => {
    try {
      const response = await axiosInstance.get(`/home/chats/rooms/${paramId}/users`);
      setUserList(response.data);
      setPostId(response.data[0].groupBuyingRoomId);
    } catch (error) {
      console.log(error);
    }
  };

  // (공구) 게시물로 이동
  const goToPostButtonClick = (postId: number) => {
    navigate(`/group-buy/${postId}`);
  };

  // 채팅방 나가는 버튼 .. 사실상 삭제.. 한명이라도 나가기 누르면 방 폭파되는데 이걸 해야하나..
  const leaveChatRoomButtonClick = async () => {
    try {
      const response = await axiosInstance.delete(`/home/chats/room/${paramId}`);
      navigate(`/chat`);
    } catch (error) {
      console.log('채팅방 나가기 실패! ', error);
    }
  };

  useEffect(() => {
    getChatUsers();
  }, []);

  const openOtherUserProfileModal = (userId: number, postId: number | null) => {
    overlay.open(({ close }) => <OtherUserProfile userId={userId} onClose={close} postId={postId} />);
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
                  onClick={() => openOtherUserProfileModal(user.id, postId)}
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
          </>
        )}
      </S.UserContainer>

      {/* 해당게시글 이동 버튼 (공구채팅방일때만..) */}
      {/* 채팅방 나가기 버튼 */}
      <S.ButtonContainer>
        {userList !== null && userList[0].groupBuyingRoomId !== null ? (
          <S.GoToPostButton onClick={() => goToPostButtonClick(userList[0].groupBuyingRoomId)}>
            해당 게시글로 이동
          </S.GoToPostButton>
        ) : null}
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
    cursor: pointer;
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
