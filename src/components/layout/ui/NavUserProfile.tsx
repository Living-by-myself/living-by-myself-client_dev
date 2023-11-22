import React from 'react';
import userStore from 'src/store/userStore';

import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

const NavUserProfile = () => {
  const { profile: user } = userStore();

  return (
    <S.UserContainer>
      <S.ProfileImg
        alt="profileImg"
        src={user!.profileImage == null ? 'http://via.placeholder.com/640x480' : user!.profileImage}
      />
      <S.InfoContainer>
        <S.NickName>{user!.nickname}</S.NickName>
        <S.Address>{user!.address}주소</S.Address>
      </S.InfoContainer>
    </S.UserContainer>
  );
};

export default NavUserProfile;

const S = {
  UserContainer: styled.div`
    display: flex;
  `,
  ButtonArea: styled.div`
    margin-left: auto;
    display: flex;
    gap: 10px;
  `,
  EditButton: styled.div``,
  DeleteButton: styled.div``,
  ProfileImg: styled.img`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: none;
    background-color: red;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 7px;
  `,
  NickName: styled.p`
    ${styleFont.body3}
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
    ${styleFont.body4}

    color: ${COLORS.GRAY[400]};
  `,
  Location: styled.p``,
  Time: styled.p``
};
