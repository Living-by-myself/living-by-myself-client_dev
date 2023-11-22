// import MyPageMenuList from "@/components/mypage/menu";
// import MyPagePayment from "@/components/mypage/payment";

import MyPageUserBasicInfo from 'src/components/mypage/MyPageBasicInfo';
import MyPageMenuList from 'src/components/mypage/MyPageMenuList';
import MyPagePayment from 'src/components/mypage/MyPagePayment';
import { MobileContainer } from 'src/styles/styleBox';

// import axios from "axios";
// import { useEffect } from "react";

export interface UserProps {
  nickname: string;
  level: number;
  profileImage: string;
  address: string;
  cash: number;
}

const MyPage = () => {
  return (
    <MobileContainer>
      <MyPageUserBasicInfo />
      <MyPagePayment />
      <MyPageMenuList />
    </MobileContainer>
  );
};

export default MyPage;
