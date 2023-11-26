import React, { useEffect, useState } from 'react';
import BaseModal from '../modal/BaseModal';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { Link } from 'react-router-dom';
import { getOtherUserProfile } from 'src/api/user/user';
import { UserProps } from 'src/pages/mypage/MyPage';
import { set } from 'react-hook-form';

interface ModalProps {
  onClose: () => void;
  userId: number;
}

const OtherUserProfile = ({ onClose, userId }: ModalProps) => {
  console.log(userId);
  const [profile, setProfile] = useState({} as UserProps);

  const getProfileUser = async () => {
    const profile = await getOtherUserProfile(userId as unknown as string);

    setProfile(profile);
  };
  useEffect(() => {
    getProfileUser();
  }, []);

  return (
    <BaseModal onClose={onClose} side="center">
      <S.Container>모달</S.Container>
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
    flex-direction: column;
    justify-content: space-between;
  `,
  LinkList: styled.ul`
    display: flex;
    flex-direction: column;
    /* margin-top: 2rem; */
    gap: 0.2rem;
  `,
  LinkItem: styled(Link)`
    padding: 1.3rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    display: flex;
    gap: 1rem;
    align-items: center;
    color: ${COLORS.GRAY[800]};
    &:hover {
      background-color: ${COLORS.GRAY[200]};
    }
  `,
  Nav: styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Bottom: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  ProfileContainer: styled.div`
    margin-top: 2rem;
  `
};
