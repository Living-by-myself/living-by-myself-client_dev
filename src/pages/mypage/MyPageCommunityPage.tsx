import React from 'react';
import { getMyCommunity } from 'src/api/mypage/mypage';
import userStore from 'src/store/userStore';
import { Post } from 'src/types/community/types';
import { useQuery } from '@tanstack/react-query';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { Link } from 'react-router-dom';
import CommunityPostCard from 'src/components/community/CommunityPostCard';

const MyPageCommunityPage = () => {
  const userId = localStorage.getItem('id');

  const { data, isLoading, isError } = useQuery<Post[]>(['myPageCommunity'], getMyCommunity);

  isLoading && <div>로딩중</div>;
  isError && <div>에러</div>;

  return (
    <S.Container>
      <S.TabArea>
        <S.Title>내가 쓴 글</S.Title>
      </S.TabArea>
      {data?.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/community/${post.id}`}>
              <CommunityPostCard post={post} />
            </Link>
          </div>
        );
      })}
    </S.Container>
  );
};

export default MyPageCommunityPage;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    width: 100vw;
    gap: 5px;
  `,
  TabArea: styled.div`
    ${styleFont.h2}
    color: ${COLORS.GRAY[400]};
    padding: 10px 0;
  `,
  Title: styled.div`
    ${styleFont.h2}
    color: ${COLORS.GRAY[800]};
    padding: 10px 16px;
  `
};
