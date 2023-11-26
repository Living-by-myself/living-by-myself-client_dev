import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import ModalView from '../modal/ModalView';

const RootLayout = () => {
  const location = useLocation();
  const HeaderChanger = (location: any) => {
    const pathArr = location.pathname.split('/');
    const pathname = pathArr[pathArr.length - 1];

    switch (pathname) {
      case 'write':
        return <WriteHeader />;
      case 'edit':
        return <WriteHeader />;
      default:
        return <Header />;
    }
  };

  return (
    <S.ViewContainer>
      <S.HeaderContainer>{HeaderChanger(location)}</S.HeaderContainer>
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.ViewContainer>
  );
};

export default RootLayout;

const S = {
  ViewContainer: styled.div`
    width: 100%;
    position: relative;
  `,
  HeaderContainer: styled.div`
    position: fixed;
    top: 0;
    z-index: 100;
  `,
  OutletContainer: styled.div`
    width: 100%;
    margin-top: 50px;
    /* padding-top: 50px; */
  `
};
