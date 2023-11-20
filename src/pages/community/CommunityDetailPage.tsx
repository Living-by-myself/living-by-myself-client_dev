import React from 'react';
import styled from 'styled-components';
import { MobileContainer } from 'src/styles/styleBox';
import Icon from 'src/components/icon/Icon';
import { useParams } from 'react-router-dom';
import { getPostDetail } from 'src/api/community';
import { useQuery } from '@tanstack/react-query';
import { Post } from 'src/types/community/types';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';
import CommunityUserProfile from 'src/components/community/CommunityUserProfile';

const CommunityDetailPage = () => {
  const param = useParams() as { id: string };
  const postId = param.id;
  console.log(postId);

  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPostDetail({ postId })
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <MobileContainer>
      <S.Container>
        <S.CategoryContainer> 인기글</S.CategoryContainer>

        {/* 유저정보 컴포넌트 */}
        <CommunityUserProfile userId={data?.userId!} getCreatedAtAsString={data?.getCreatedAtAsString!} />

        {/* 포스트 바디 컴포넌트 화 필요 */}
        <>
          <S.BodyContainer>
            <S.Title>{data?.title}</S.Title>
            <S.Body>{data?.description}</S.Body>
          </S.BodyContainer>

          {data?.fileUrls ? (
            <S.ImageBox>
              <S.Img src={data.fileUrls} alt="이미지" />
            </S.ImageBox>
          ) : (
            <> </>
          )}

          <S.View>
            <Icon name="eye" size={'12'} />
            {data?.viewCnt}명이 봤어요
          </S.View>
        </>

        {/* 좋아요 버튼 컴포넌트 */}
        {/* <PostDetailLikes /> */}

        {/* 댓글 입력 컴포넌트 */}
        {/* <PostDetailCommentInput /> */}

        {/* 중간 간지 */}
        <S.Line />

        {/* 댓글  */}
        {/* <PostDetailCommentList /> */}

        {/* 중간 간지 */}
        <S.Line />
      </S.Container>
    </MobileContainer>
  );
};

export default CommunityDetailPage;

const S = {
  Container: styled.div`
    padding: 12px 0 0;
    width: 100%;
  `,
  CategoryContainer: styled.div`
    ${styleFont.body4}
    color: ${COLORS.GRAY[400]};
    margin-bottom: 7px;
  `,
  Line: styled.div`
    width: 100%;

    height: 7px;
    background-color: ${COLORS.GRAY[200]};
    margin: 15px 0;
  `,

  BodyContainer: styled.div`
    padding: 20px 0 40px;
  `,
  Title: styled.p`
    ${styleFont.body1}
    margin-bottom: 9px;
  `,
  Body: styled.p`
    ${styleFont.body1}
  `,
  View: styled.div`
    ${styleFont.body4}
    line-height: normal;
    color: ${COLORS.GRAY[400]};
    display: flex;
    align-items: center;
    gap: 3px;
  `,
  ImageBox: styled.div`
    width: 100%;
    max-height: 1000px;
    margin-bottom: 40px;
    overflow: hidden;
    border-radius: 10px;
  `,
  Img: styled.img`
    width: 100%;
    border-radius: 10px;
  `
};
