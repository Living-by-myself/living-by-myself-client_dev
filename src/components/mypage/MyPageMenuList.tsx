import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyPageMenuCard from './MyPageMenuCard';
import userStore from 'src/store/userStore';
import { toast } from 'react-toastify';

const menuList = [
  { url: '/mypage/badge', name: '활동 배지' },
  { url: '/mypage/group-buy', name: '나의 공동구매' },
  { url: '/mypage/post', name: '내가 쓴 글' },
  { url: '/mypage/update', name: '회원정보 수정' },
  { url: '/mypage/password-update', name: '비밀번호 수정' },
  { url: '/mypage/logout', name: '로그아웃' }
];

const MyPageMenuList = () => {
  const navigate = useNavigate();
  const { logout, clearToken } = userStore();
  return (
    <S.Container>
      {menuList.map((menu, index) => {
        return (
          <MyPageMenuCard
            key={index}
            onClick={() => {
              if (menu.url === '/mypage/group-buy') {
                toast('서비스 준비 중입니다.');
                return;
              }

              if (menu.url === '/mypage/logout') {
                localStorage.removeItem('atk');
                localStorage.removeItem('rtk');
                clearToken();
                logout();
                toast('로그아웃 되었습니다.');
                navigate('/');
              } else {
                navigate(menu.url);
              }
            }}
            children={menu.name}
          />
        );
      })}
    </S.Container>
  );
};

export default MyPageMenuList;

const S = {
  Container: styled.div`
    width: 100%;
  `
};
