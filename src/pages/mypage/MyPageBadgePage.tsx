import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { getMyBadge } from 'src/api/mypage/mypage';
import Badge from 'src/components/mypage/Badge';
import userStore from 'src/store/userStore';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

// seed, // 커뮤니티 5개 생성
//     sprout, // 커뮤니티 10개 생성
//     branch, // 커뮤니티 20개 생성
//     flower, // 커뮤니티 50개 생성
//     tree, // 커뮤니티 100개 생성
//     good, // 좋아요 50개 이상
//     perfect, // 좋아요 100개 이상
//     popular, // 조회수 100회 이상
//     celebrity // 조회수 500회 이상

// 서버에서 이렇게 올껀데....
// 그럼 9개를 무조건 맞춰야하면 여기서 반복문으로 맞춰줘야하는것인가

const dummyData = [];

export interface BadgeProps {
  type: string;
}

const MyPageBadgePage = () => {
  const [badge, setBadge] = useState<BadgeProps[]>([]);
  // const [data, setData] = useState<BadgeProps[]>([]);
  const { profile: user } = userStore();

  const { data, isError, isLoading } = useQuery(['badge'], getMyBadge);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <MobileContainer>
      <S.Container>
        <S.ProfileImageBox>
          <S.ProfileImage src="https://via.placeholder.com/70" />
        </S.ProfileImageBox>
        <S.UserName>{user?.nickname} 님의 활동배지</S.UserName>
        <S.UserInfo>총 00개의 배지를 모으셨어요!</S.UserInfo>
        <S.BadgeContainer>
          {/* 난중에 컴포넌트 분리하고 map */}
          {data?.map((item, index) => {
            return <Badge key={index} type={item.type}></Badge>;
          })}
        </S.BadgeContainer>
      </S.Container>
    </MobileContainer>
  );
};

export default MyPageBadgePage;

const S = {
  // 뱃지 컨테이너 스타일
  BadgeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding-top: 28px;
  `,

  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
    padding-top: 23px;
  `,
  ProfileImageBox: styled.div`
    /* display: flex; */
    position: relative;
    /* flex-direction: column; */
  `,
  ProfileImage: styled.img`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    overflow: hidden;
    border: 1px solid ${COLORS.GRAY[400]};
  `,
  ProfileChangeBtn: styled.div`
    padding: 4px;
    border: 1px solid ${COLORS.GRAY[400]};
    background-color: white;

    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UserName: styled.p`
    margin: 8px 0;
    color: ${COLORS.GRAY[400]};
    ${styleFont.h4}
  `,
  UserInfo: styled.p`
    color: ${COLORS.GRAY[400]};
    ${styleFont.h3}
  `
};
