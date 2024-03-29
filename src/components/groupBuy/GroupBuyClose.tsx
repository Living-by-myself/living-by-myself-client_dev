import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from 'src/api/AxiosInstance';
import { createChat } from 'src/api/chat/chat';
import { getGroupBuyDetailData } from 'src/api/groupBuy/groupBuy';
import useGroupBuyMutate from 'src/api/groupBuy/groupBuyMutate';
import { getUserProfile } from 'src/api/user/user';
import { useRoomTitleStore } from 'src/store/chatStore';
import { COLORS } from 'src/styles/styleConstants';
import { ChatUser } from 'src/types/chat/types';
import styled from 'styled-components';
import { ScrollHidden } from '../modal/HandleScroll';
import { CommonButton } from 'src/styles/styleBox';

interface GroupBuyCloseProps {
  id: number; //paramsId
  users: ChatUser[];
  writerId: number;
  writerNickname: string;
}

const GroupBuyClose = ({ id, users, writerId, writerNickname}: GroupBuyCloseProps) => {
  const navigate = useNavigate();
  const [usersNickname, setUsersNickname] = useState([] as string[]); // 참여 유저 닉네임 배열
  const [usersId, setUsersId] = useState([] as number[]); // 참여 유저 닉네임 배열
  const { currentRoomTitle, setCurrentRoomTitle } = useRoomTitleStore();
  const [myProfile, setMyProfile] = useState({} as ChatUser);
  const { groupBuyMutation } = useGroupBuyMutate(id);
  const roomTitle = usersNickname.join(', ');


  const getProfileUser = async () => {
    const myProfile = await getUserProfile();
    setMyProfile(myProfile);
  };

  const closeGroupBuyButton = async () => {
    ScrollHidden()
    // 공동 구매 마감 api
    try {
      await axiosInstance.patch(`/home/group-buying/${id}/close`);
      groupBuyMutation.mutate(id);

      toast('공동구매 마감 완료');
    } catch (error) {
      console.log('공동 구매 마감 에러 : ', error);
    }

    if (users.length > 1) {
      try {
        const newRoomId = await createChat(usersId, myProfile.nickname, roomTitle, id);
        toast('공동구매 채팅 방으로 이동합니다!');
        navigate(`/chat/${newRoomId}`); // 페이지 이동될 지 아직 모름
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('채팅방 안생김');
    }
  };

  useEffect(() => {
    getProfileUser();
    // 채팅 생성 시 사용할 채팅 참여 유저 닉네임 및 아이디 배열 만들어주고 set
    let usersNickname = users.map((user) => user.nickname);
    usersNickname = [writerNickname, ...usersNickname.filter((nickname) => nickname !== writerNickname)];
    setCurrentRoomTitle(usersNickname.join(', '));
    setUsersNickname(usersNickname.filter((userNickname) => userNickname !== writerNickname));
    const usersId = users.map((user) => user.id);
    setUsersId(usersId.filter((userId) => userId !== writerId));
  }, []);
  return <S.GroupBuyButton onClick={closeGroupBuyButton}>마감하기</S.GroupBuyButton>;
};

const S = {
  GroupBuyButton: styled(CommonButton)`
    width: 205px;
    padding: 0.8rem 0px;
    background-color: ${COLORS.GREEN[300]};
    color: ${COLORS.GRAY[0]};
  `
};

export default GroupBuyClose;
