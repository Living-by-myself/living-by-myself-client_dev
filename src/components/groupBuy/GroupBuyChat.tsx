import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChat, getRoomList } from 'src/api/chat/chat';
import { getOtherUserProfile, getUserProfile } from 'src/api/user/user';
import { useRoomTitleStore } from 'src/store/chatStore';
import { COLORS } from 'src/styles/styleConstants';
import { ChatRoom, ChatUser } from 'src/types/chat/types';
import styled from 'styled-components';

interface GroupBuyChatProps {
  id: number;
}

const GroupBuyChat = (id: GroupBuyChatProps) => {
  const navigate = useNavigate();
  const [otherProfile, setOtherProfile] = useState({} as ChatUser);
  const [myProfile, setMyProfile] = useState({} as ChatUser);
  const { currentRoomTitle, setCurrentRoomTitle } = useRoomTitleStore();
  const [roomList, setRoomList] = useState([] as ChatRoom[]);
  const [usersNickname, setUsersNickname] = useState([] as string[]);
  const writerId = id.id;

  const getProfileUser = async () => {
    const otherProfile = await getOtherUserProfile(writerId as unknown as string);
    const myProfile = await getUserProfile();
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
      const filteredArray = titleArray.filter((item) => !usersNickname.includes(item));
      return filteredArray.length === 1;
    });
    if (existingRoom) {
      navigate(`/chat/${existingRoom.id!}`);
    } else {
      try {
        setCurrentRoomTitle(`${myProfile.nickname}, ${otherProfile.nickname}`);
        const newRoomId = await createChat([writerId], myProfile.nickname, otherProfile.nickname, null);
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
