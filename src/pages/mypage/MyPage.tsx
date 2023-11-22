import MyPageUserBasicInfo from 'src/components/mypage/MyPageBasicInfo';
import MyPageMenuList from 'src/components/mypage/MyPageMenuList';
import MyPagePayment from 'src/components/mypage/MyPagePayment';
import { MobileContainer } from 'src/styles/styleBox';

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
