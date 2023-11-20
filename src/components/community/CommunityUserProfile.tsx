import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import { getUserBasicProfile } from 'src/api/user';

const info = {
  level: 1,
  nickname: 'wer06099@naver.com',
  profileImage: 'https://tracelover.s3.ap-northeast-2.amazonaws.com/b82b98c4-5b30-4a5d-9019-0ff0372ea0c9test1.png',
  address: null
};

interface CommunityUserProfileProps {
  userId: number;
  getCreatedAtAsString: string;
}

interface UserProps {
  level: number;
  nickname: string;
  profileImage: string | null;
  address: string | null;
}

interface User {
  nickname: string;
  profileImage: null | string;
  level: number;
  address: null | string;
  cash?: number;
}

const CommunityUserProfile = ({ userId, getCreatedAtAsString }: CommunityUserProfileProps) => {
  const [user, setUser] = useState<UserProps>(info);

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUserBasicProfile(userId as unknown as string)
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <S.UserContainer>
      <S.ProfileImg
        alt="profileImg"
        src={data?.profileImage == null ? 'http://via.placeholder.com/640x480' : data?.profileImage}
      />
      <S.InfoContainer>
        <S.NickName>{data?.nickname}</S.NickName>
        <S.LocationTimeBox>
          <S.Location>신월 2동</S.Location>
          <S.Time> · {getCreatedAtAsString}</S.Time>
        </S.LocationTimeBox>
      </S.InfoContainer>
    </S.UserContainer>
  );
};

export default CommunityUserProfile;

const S = {
  UserContainer: styled.div`
    display: flex;
  `,
  ProfileImg: styled.img`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: none;
    background-color: red;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 7px;
  `,
  NickName: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 3px;
  `,
  Title: styled.h1`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 5px;
  `,
  LocationTimeBox: styled.div`
    display: flex;
    align-items: center;
    /* margin-top: auto; */
    ${styleFont.body4}

    color: ${COLORS.GRAY[400]};
  `,
  Location: styled.p``,
  Time: styled.p``
};
