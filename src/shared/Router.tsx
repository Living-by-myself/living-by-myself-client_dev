import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from 'src/App';
import RootLayout from 'src/components/layout/RootLayout';
import OnlyLoggedRoute from './OnlyLoggedRoute';
import HomePage from 'src/pages/HomePage';
import OnlyNotLoggedRoute from './OnlyNotLoggedRoute';
import LoginPage from 'src/pages/user/LoginPage';
import RegisterPage from 'src/pages/user/RegisterPage';
import PasswordFindPage from 'src/pages/user/PasswordFindPage';
import PasswordResetPage from 'src/pages/user/PasswordResetPage';
import GroupBuyPage from 'src/pages/groupBuy/GroupBuyPage';
import GroupBuyDetailPage from 'src/pages/groupBuy/GroupBuyDetailPage';
import GroupBuyEditPage from 'src/pages/groupBuy/GroupBuyEditPage';
import GroupBuyPayPage from 'src/pages/groupBuy/GroupBuyPayPage';
import GroupBuyWritePage from 'src/pages/groupBuy/GroupBuyWritePage';
import CommunityPage from 'src/pages/community/CommunityPage';
import CommunityDetailPage from 'src/pages/community/CommunityDetailPage';
import CommunityWritePage from 'src/pages/community/CommunityWritePage';
import ChatPage from 'src/pages/chat/ChatPage';
import ChatDetailPage from 'src/pages/chat/ChatDetailPage';
import ChatDetailEditPage from 'src/pages/chat/ChatDetailEditPage';
import SearchPage from 'src/pages/SearchPage';
import MyPage from 'src/pages/mypage/MyPage';
import MyPageBadgePage from 'src/pages/mypage/MyPageBadgePage';
import MyPageCommunityPage from 'src/pages/mypage/MyPageCommunityPage';
import MyPageGroupBuyPage from 'src/pages/mypage/MyPageGroupBuyPage';
import UserUpdateInfoPage from 'src/pages/user/UserUpdateInfoPage';
import PasswordUpdatePage from 'src/pages/user/PasswordUpdatePage';
import PointChargePage from 'src/pages/user/PointChargePage';
import GoogleOAuth from 'src/pages/oAuth/GoogleOAuth';
import KakaoOAuth from 'src/pages/oAuth/KakaoOAuth';

const Router = () => {

  const location = useLocation()
  console.log(location)
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* 로그인 후에는 접속할 수 없는 페이지 */}
        {/* 
        1. 로그인
        2. 회원가입
        3. 비밀번호 찾기(휴대폰인증페이지)
        4. 비밀번호 초기화  */}
        <Route element={<OnlyNotLoggedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/password-find" element={<PasswordFindPage />} />
        </Route>

        {/* 이건 주스탠드에 있는 토큰값이 없으면 접근안됨 */}
        <Route path="/password-reset" element={<PasswordResetPage />} />

        {/* 아무나 접속할 수 있는 페이지 */}
        <Route path="/oauth/kakao" element={<KakaoOAuth />} />
        <Route path="/oauth/google" element={<GoogleOAuth />} />
        <Route path="/group-buy" element={<GroupBuyPage />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* 마이페이지 등... 로그인 후 사용 가능한 페이지들... */}
        <Route element={<OnlyLoggedRoute />}>
          {/* 토큰값이 없으면 접근 안되는거임... */}
          <Route path="/group-buy/:id" element={<GroupBuyDetailPage />} />
          <Route path="/group-buy/:id/edit" element={<GroupBuyEditPage />} />
          <Route path="/group-buy/:id/order" element={<GroupBuyPayPage />} />
          <Route path="/group-buy/write" element={<GroupBuyWritePage />} />

          <Route path="/community/:id" element={<CommunityDetailPage />} />
          <Route path="/community/write" element={<CommunityWritePage />} />
          <Route path="/community/:id/edit" element={<CommunityWritePage />} />

          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:id" element={<ChatDetailPage />} />
          <Route path="/chat/:id/edit" element={<ChatDetailEditPage />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/badge" element={<MyPageBadgePage />} />
          <Route path="/mypage/post" element={<MyPageCommunityPage />} />
          <Route path="/mypage/group-buy" element={<MyPageGroupBuyPage />} />
          <Route path="/mypage/update" element={<UserUpdateInfoPage />} />
          <Route path="/mypage/password-update" element={<PasswordUpdatePage />} />
          <Route path="/mypage/point-charge" element={<PointChargePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
