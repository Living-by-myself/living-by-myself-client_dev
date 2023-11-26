import { useNavigate } from 'react-router-dom';
import BaseModal from 'src/components/modal/BaseModal';
import Icon from 'src/components/icon/Icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NAV_LINKS } from 'src/components/button/buttonConstants';
import Button from 'src/components/button/Button';
import { COLORS } from 'src/styles/styleConstants';
import NavUserProfile from './NavUserProfile';
import userStore from 'src/store/userStore';
import logo from 'src/components/icon/logo.svg';

interface NavModalProps {
  onClose: () => void;
}

const NavModal = ({ onClose }: NavModalProps) => {
  const navigate = useNavigate();
  //   const { isLogged } = useUserStore();
  const { isLogged, profile: user } = userStore();
  //   const logoutMutation = useLogoutMutation();

  //   const handleLogout = async () => {
  //     logoutMutation.mutate();
  //   };

  return (
    <BaseModal onClose={onClose} side="left">
      <S.Container>
        <S.Nav>
          <img src={logo} alt="logo" />
          {isLogged && <NavUserProfile />}
          <S.LinkList>
            {NAV_LINKS.map((link) => (
              <S.LinkItem to={link.href} key={link.id} onClick={() => onClose()}>
                <Icon name={link.icon} /> {link.name}
              </S.LinkItem>
            ))}
          </S.LinkList>
        </S.Nav>
        <S.Bottom>
          {isLogged ? (
            <>
              <Button full variants="outline" onClick={() => {}}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button full onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button full variants="outline" onClick={() => navigate('/signup')}>
                회원가입
              </Button>
            </>
          )}
        </S.Bottom>
      </S.Container>
    </BaseModal>
  );
};

export default NavModal;

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
