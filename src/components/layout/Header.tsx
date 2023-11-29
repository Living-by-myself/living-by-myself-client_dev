import React, { useEffect, useState } from 'react';
import { getUserProfile } from 'src/api/user/user';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { COLORS } from 'src/styles/styleConstants';
import { NAV_LINKS } from '../button/buttonConstants';
import Link from './ui/Link';
import logo from 'src/components/icon/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';
import useOverlay from 'src/hooks/useOverlay';
import NavModal from './ui/NavModal';
import userStore from 'src/store/userStore';

const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { pathname } = useLocation();
  const overlay = useOverlay();
  const navigate = useNavigate();
  const { isLogged, profile: user, setProfile: setUser } = userStore();

  const openNavModal = () => {
    overlay.open(({ close }) => <NavModal onClose={close} />);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Nav>
          {NAV_LINKS.map((nav) => (
            <Link
              to={nav.href}
              key={nav.id}
              style={{
                fontWeight: 'bold',
                color: nav.href === pathname ? COLORS.GRAY[700] : COLORS.GRAY[400]
              }}
            >
              {nav.name}
            </Link>
          ))}
        </S.Nav>
        <S.MobileMenuButton onClick={() => openNavModal()}>
          <Button variants="icon">
            <Icon name="menu" color="#212121" />
          </Button>
        </S.MobileMenuButton>

        <S.LogoContainer onClick={() => navigate('/')}>
          <img src={logo} alt="logo" />
        </S.LogoContainer>

        <S.RightMenu>
          <SearchBar />
          {isLogged ? (
            <>
              <Button variants="icon" onClick={() => navigate('/mypage')}>
                <Icon name="bell" color="#212121" />
              </Button>
              <Link to="/mypage">{/* <Avatar src={profile?.profileImage} /> */}</Link>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variants="contain">
                로그인
              </Button>
            </>
          )}
        </S.RightMenu>

        <S.MobileRightMenu>
          <Button variants="icon" onClick={() => setIsOpenSearch(true)}>
            <Icon name="search" color="#212121" />
          </Button>
        </S.MobileRightMenu>

        {isOpenSearch && (
          <S.SearchFullContainer>
            <SearchBar style={{ width: '100%' }} />
            <Button variants="outline" onClick={() => setIsOpenSearch(false)}>
              닫기
            </Button>
          </S.SearchFullContainer>
        )}
      </S.Header>
    </S.Container>
  );
};

export default Header;

const S = {
  Container: styled.div`
    display: flex;
    width: 100vw;

    align-items: center;
    height: 50px;
    border-bottom: 1px solid ${COLORS.GRAY[200]};
    background-color: ${COLORS.GRAY[0]};
  `,
  Header: styled.header`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    position: relative;
  `,
  Nav: styled.nav`
    display: none;
    gap: 2rem;
    @media (min-width: 768px) {
      display: flex;
    }
  `,
  MobileMenuButton: styled.div`
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  `,
  NavItem: styled.a``,
  LogoBox: styled.div``,
  MenuList: styled.div``,
  ButtonBox: styled.div``,
  RightMenu: styled.div`
    display: none;
    @media (min-width: 768px) {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  `,
  MobileRightMenu: styled.div`
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  `,
  SearchFullContainer: styled.div`
    background-color: ${COLORS.GRAY[0]};
    position: absolute;
    width: 100%;
    height: calc(100% - 3px);
    display: flex;
    gap: 1rem;
    align-items: center;
    top: 0;
    left: 0;
    padding: 2rem;
  `,
  LogoContainer: styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `
};
