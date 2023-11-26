import React from 'react';
import styled from 'styled-components';
import { MobileContainer } from 'src/styles/styleBox';
import Icon from 'src/components/icon/Icon';
import { useParams } from 'react-router-dom';
import { getCommunityPostDetail } from 'src/api/community/community';
import { useQuery } from '@tanstack/react-query';
import { Post } from 'src/types/community/types';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';
import CommunityUserProfile from 'src/components/community/CommunityUserProfile';
import { extractImageUrls } from 'src/utilities/image';
import CommentList from 'src/components/community/comment/CommentList';
import CommunityLike from 'src/components/community/CommunityLike';
import CommentInput from 'src/components/community/comment/CommentInput';
import { getCategoryName } from 'src/components/community/communityConstants';

const CommunityDetailPage = () => {
  const param = useParams() as { id: string };
  const postId = param.id;

  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getCommunityPostDetail({ postId })
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  const imageData = () => {
    if (data?.fileUrls) {
      return extractImageUrls(data.fileUrls);
    }
  };

  return (
    <MobileContainer>
      <S.Container>
        <S.CategoryContainer> {getCategoryName(data.category)}</S.CategoryContainer>

        {/* 유저정보 컴포넌트 */}
        <CommunityUserProfile userId={data?.userId!} getCreatedAtAsString={data?.getCreatedAtAsString!} />

        {/* 포스트 바디 컴포넌트 화 필요 */}
        <S.CommunityDetail>
          <S.BodyContainer>
            <S.Title>{data?.title}</S.Title>
            <S.Body>{data?.description}</S.Body>
          </S.BodyContainer>

          {data?.fileUrls ? (
            <S.ImageBox>
              {imageData()?.map((url, index) => {
                return <S.Img key={index} src={url} alt="이미지" />;
              })}
            </S.ImageBox>
          ) : (
            <> </>
          )}

          <S.ViewLikeContainer>
            <S.View>
              <Icon name="eye" size={'12'} />
              {data?.viewCnt}명이 봤어요
            </S.View>
            <CommunityLike likeCnt={data?.likeCnt!} id={data?.id!} existsLike={data?.existsLike!} />
          </S.ViewLikeContainer>
        </S.CommunityDetail>

        {/* 좋아요 버튼 컴포넌트 */}

        {/* 댓글 입력 컴포넌트 */}
        <CommentInput />

        {/* 중간 간지 */}
        <S.Line />

        {/* 댓글  */}
        <CommentList />

        {/* 중간 간지 */}
        <S.Line />
      </S.Container>
    </MobileContainer>
  );
};

export default CommunityDetailPage;

const S = {
  Container: styled.div`
    padding: 12px 16px 0;
    width: 100%;
    position: relative;
  `,
  CategoryContainer: styled.div`
    ${styleFont.body4}
    color: ${COLORS.GRAY[400]};
    margin-bottom: 7px;
  `,
  Line: styled.div`
    /* width: 150%; */

    height: 1px;
    background-color: ${COLORS.GRAY[200]};
    margin: 15px 0;
  `,
  CommunityDetail: styled.div``,
  BodyContainer: styled.div`
    padding: 20px 0 40px;
  `,
  Title: styled.p`
    ${styleFont.h3}

    margin-bottom: 9px;
  `,
  Body: styled.p`
    ${styleFont.body1}
  `,
  ViewLikeContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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
    /* max-height: 1000px; */
    margin-bottom: 40px;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  Img: styled.img`
    width: 100%;
    border-radius: 10px;
  `
};
