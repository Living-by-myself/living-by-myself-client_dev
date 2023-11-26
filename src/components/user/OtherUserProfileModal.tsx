import userStore from 'src/store/userStore';

import { styleFont } from 'src/styles/styleFont';
import React, { useEffect, useState } from 'react';
import BaseModal from '../modal/BaseModal';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { Link } from 'react-router-dom';
import { getOtherUserProfile, reportOtherUser } from 'src/api/user/user';
import { UserProps } from 'src/pages/mypage/MyPage';
import { set } from 'react-hook-form';
import Button from '../button/Button';

interface ModalProps {
  onClose: () => void;
  userId: number;
}

const OtherUserProfile = ({ onClose, userId }: ModalProps) => {
  const [profile, setProfile] = useState({} as UserProps);

  const getProfileUser = async () => {
    const profile = await getOtherUserProfile(userId as unknown as string);

    setProfile(profile);
  };
  useEffect(() => {
    getProfileUser();
  }, []);

  if (!profile) return <div>로딩중입니다.</div>;

  return (
    <BaseModal onClose={onClose} side="center">
      <S.Container>
        <S.UserContainer>
          <S.ProfileImg
            alt="profileImg"
            src={profile?.profileImage == null ? 'http://via.placeholder.com/640x480' : profile?.profileImage}
          />
          <S.InfoContainer>
            <S.NickName>{profile?.nickname}</S.NickName>
            <S.Address>
              Lv.{profile?.level} | {profile?.address === null ? '주소정보 없음' : profile?.address?.split(',')[0]}
            </S.Address>
          </S.InfoContainer>
        </S.UserContainer>
        <S.ButtonBox>
          <Button
            variants="contain"
            size="sm"
            color="primary"
            onClick={() => {
              alert('1:1 채팅 기능은 준비중입니다.');
              return;
            }}
            children={'1:1 채팅'}
          />
          <Button
            variants="outline"
            size="sm"
            color="danger"
            onClick={async () => {
              const description = prompt('신고 사유를 입력해주세요.', '');
              console.log(description);
              if (description?.length === 0) {
                alert('신고 사유를 입력해주세요.');
                return;
              }
              const response = await reportOtherUser(userId as unknown as string, description!);
              if (response) {
                alert('신고가 완료되었습니다.');
                onClose();
              } else {
                alert('신고에 실패했습니다.');
              }
            }}
            children={'신고하기'}
          />
        </S.ButtonBox>
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
