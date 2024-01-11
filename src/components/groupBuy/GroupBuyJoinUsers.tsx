import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { JoinUserType } from 'src/types/groupBuy/types';
import { joinUserNickname } from 'src/utilities/GroupBuy';
import styled from 'styled-components';

const GroupBuyJoinUsers = ({ id, profileImage, nickname }: JoinUserType) => {
  return (
    <S.JoinUser key={id}>
      <S.JoinUserImage>
        {profileImage === null ? <img src="/imgs/basicUserImage.png"></img> : <img src={profileImage}></img>}
      </S.JoinUserImage>
      <S.JoinUserNickname>{joinUserNickname(nickname)}</S.JoinUserNickname>
    </S.JoinUser>
  );
};

export default GroupBuyJoinUsers;

const S = {
  JoinUser: styled.li`
    width: 20%;
    list-style: none;
    text-align: center;
  `,
  JoinUserImage: styled.h1`
    width: 100%;
    margin-bottom: 5px;
    img {
      display: block;
      width: 100%;
    }
  `,
  JoinUserNickname: styled.h2`
    ${styleFont.body2}
    color: ${COLORS.GRAY[900]};
  `
};
