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
        <S.Address>
          Lv.{user!.level} | {user!.address?.split(',')[0]}
        </S.Address>
      </S.InfoContainer>
    </S.UserContainer>
  );
};

export default NavUserProfile;

const S = {
  UserContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  ButtonArea: styled.div`
    margin-left: auto;
    display: flex;
    gap: 10px;
  `,
  EditButton: styled.div``,
  DeleteButton: styled.div``,
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
  Location: styled.p``,
  Time: styled.p``
};
