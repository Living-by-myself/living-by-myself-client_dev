import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { get } from 'http';
import { getCommentList } from 'src/api/comment/comment';
import { styleFont } from 'src/styles/styleFont';
import Comment from './Comment';

export interface Comments {
  description: string;
  existsLike: boolean;
  getCreatedAtAsString: string;
  getModifiedAtAsString: string;
  id: number;
  likeCnt: number;
  user: CommentUserProps;
}

export interface CommentUserProps {
  id: number;
  nickname: string;
  profileImage: string;
}

const CommentList = () => {
  const param = useParams() as { id: string };

  const { data, isLoading, isError } = useQuery<Comments[]>({
    queryKey: ['comment', param.id],
    queryFn: () => getCommentList({ postId: param.id })
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <S.Container>
      <S.HeaderArea>
        <S.Label>댓글</S.Label>
        <S.CommentCnt>{data.length}개</S.CommentCnt>
      </S.HeaderArea>

      {/* 댓글 카드 MAP함수 적용 */}
      {data?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </S.Container>
  );
};

export default CommentList;

const S = {
  Container: styled.div``,
  HeaderArea: styled.div`
    margin: 13px 0 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    ${styleFont.body3}
  `,
  Label: styled.p`
    ${styleFont.h4}
  `,
  CommentCnt: styled.p``,
  Filter: styled.p`
    margin-left: auto;
  `,
  FilterBtn: styled.button`
    ${styleFont.body3}

    background-color: transparent;
    outline: none;
    border: none;
  `
};
