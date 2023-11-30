import userStore from 'src/store/userStore';

import { styleFont } from 'src/styles/styleFont';
import React, { useEffect, useState } from 'react';
import BaseModal from '../modal/BaseModal';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { Link, useNavigate } from 'react-router-dom';
import { getOtherUserProfile, getUserProfile, reportOtherUser } from 'src/api/user/user';
import { UserProps } from 'src/pages/mypage/MyPage';
import { set } from 'react-hook-form';
import Button from '../button/Button';
import { toast } from 'react-toastify';
import { createChat, getRoomList } from 'src/api/chat/chat';
import { ChatRoom, ChatUser } from 'src/types/chat/types';
import { useRoomTitleStore } from 'src/store/chatStore';

interface ModalProps {
  onClose: () => void;
  userId: number;
  postId: number | null;
}

const OtherUserProfile = ({ onClose, userId, postId }: ModalProps) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({} as UserProps);
  const [otherProfile, setOtherProfile] = useState({} as ChatUser);
  const [myProfile, setMyProfile] = useState({} as ChatUser);
  const { currentRoomTitle, setCurrentRoomTitle } = useRoomTitleStore();
  const [roomList, setRoomList] = useState([] as ChatRoom[]);
  const currentUserId = localStorage.getItem('id');
  const [usersNickname, setUsersNickname] = useState([] as string[]);

  const getProfileUser = async () => {
    const otherProfile = await getOtherUserProfile(userId as unknown as string);
    const myProfile = await getUserProfile();
    setProfile(otherProfile);
    setOtherProfile(otherProfile);
    setUsersNickname([otherProfile.nickname]);
    setMyProfile(myProfile);
  };

  const getAllRoomList = async () => {
    const roomList = await getRoomList();
    setRoomList(roomList);
  };

  const handleCreateChatButtonClick = async () => {
    // 새롭게 만드는 title을 가진 방이 이미 있는지 확인
    const existingRoom = roomList.find((room) => {
      const titleArray = room.title.split(',').map((item) => item.trim());
      // 공구는 참여자 userId(채팅방 생성을 위해..)배열과 nickname(title 중복확인)배열이 필요할 듯..
      const filteredArray = titleArray.filter((item) => !usersNickname.includes(item));
      return filteredArray.length === 1;
    });
    if (existingRoom) {
      navigate(`/chat/${existingRoom.id!}`);
    } else {
      try {
        setCurrentRoomTitle(`${myProfile.nickname}, ${otherProfile.nickname}`);
        const newRoomId = await createChat([userId], myProfile.nickname, otherProfile.nickname, postId);
        navigate(`/chat/${newRoomId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfileUser();
    getAllRoomList();
  }, []);

  if (!profile) return <div>로딩중입니다.</div>;

  return (
    <BaseModal onClose={onClose} side="center">
      <S.Container>
        <S.UserContainer>
          <S.ProfileImg
            alt="profileImg"
            src={profile?.profileImage == null ? 'http://via.placeholder.com/640x480' : otherProfile?.profileImage}
          />
          <S.InfoContainer>
            <S.NickName>{profile?.nickname}</S.NickName>
            <S.Address>
              Lv.{profile?.level} | {profile?.address === null ? '주소정보 없음' : profile?.address?.split(',')[0]}
            </S.Address>
          </S.InfoContainer>
        </S.UserContainer>
        {userId !== Number(currentUserId) && (
          <S.ButtonBox>
            <Button
              variants="contain"
              size="sm"
              color="primary"
              onClick={() => {
                // toast('1:1 채팅 기능은 준비중입니다.');
                // return;
                handleCreateChatButtonClick();
              }}
              children={'1:1 채팅'}
            />
            <Button
              variants="outline"
              size="sm"
              color="danger"
              onClick={async () => {
                const description = prompt('신고 사유를 입력해주세요.', '');

                if (description?.length === 0) {
                  toast('신고 사유를 입력해주세요.');
                  return;
                }
                const response = await reportOtherUser(userId as unknown as string, description!);
                if (response) {
                  toast('신고가 완료되었습니다.');
                  onClose();
                } else {
                  toast('신고에 실패했습니다.');
                }
              }}
              children={'신고하기'}
            />
          </S.ButtonBox>
        )}
      </S.Container>
    </BaseModal>
  );
};

export default OtherUserProfile;

const S = {
  Container: styled.div`
    border-right: 1px solid ${COLORS.GRAY[300]};
    height: 100%;
    width: 240px;
    background-color: ${COLORS.GRAY[0]};
    padding: 2rem;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  `,
  UserContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  ProfileImg: styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: none;
    background-color: red;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 7px;
  `,
  NickName: styled.p`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 3px;
  `,
  Title: styled.h1`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 5px;
  `,
  Address: styled.p`
    display: flex;
    align-items: center;
    /* margin-top: auto; */
    ${styleFont.body2}

    color: ${COLORS.GRAY[400]};
  `,
  ButtonBox: styled.div`
    display: flex;
    gap: 10px;
  `
};
