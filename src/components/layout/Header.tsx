import React, { useEffect } from 'react';
import { getUserProfile } from 'src/api/community/user';
import { UserStore } from 'src/store/userStore';
import styled from 'styled-components';

const Header = () => {
  const { setUser } = UserStore();

  const getUser = async () => {
    const response = await getUserProfile();
    setUser(response);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <S.Container>
      <S.MenuList>메뉴영역</S.MenuList>
      <S.LogoBox>로고영역</S.LogoBox>
      <S.ButtonBox>버튼영역</S.ButtonBox>
    </S.Container>
  );
};

export default Header;

const S = {
  Container: styled.div`
    width: 100%;
    height: 50px;
    background-color: royalblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `,
  LogoBox: styled.div``,
  MenuList: styled.div``,
  ButtonBox: styled.div``
};
