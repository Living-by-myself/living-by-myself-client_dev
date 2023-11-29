import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import WriteHeader from './WriteHeader';
import ModalView from '../modal/ModalView';
import useOverlay from 'src/hooks/useOverlay';
import WriteSelectModal from '../button/WriteSelectModal';
import { COLORS } from 'src/styles/styleConstants';

const RootLayout = () => {
  const openOtherUserProfileModal = () => {
    overlay.open(({ close }) => <WriteSelectModal onClose={close} />);
  };
  const overlay = useOverlay();
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
      {location.pathname.includes('edit') || location.pathname.includes('write') ? (
        <></>
      ) : (
        <S.WriteButton onClick={openOtherUserProfileModal}>글쓰기 버튼</S.WriteButton>
      )}

      <S.HeaderContainer>{HeaderChanger(location)}</S.HeaderContainer>
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.ViewContainer>
  );
};

export default RootLayout;

const S = {
  WriteButton: styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    background-color: ${COLORS.GREEN[400]};
  `,
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
  `
};
