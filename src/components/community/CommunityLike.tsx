import axios from 'axios';
import { useState } from 'react';
import { addCommunityPostLike, deleteCommunityPostLike } from 'src/api/community/community';

import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

interface Props {
  likeCnt: number;
  id: number;
  existsLike: boolean;
}

const token = localStorage.getItem('atk');

const CommunityLike = ({ likeCnt, id, existsLike }: Props) => {
  const [like, setLike] = useState({ likeCnt, existsLike });

  // 좋아요 누르는 로직
  // 상위 디테일 페이지에서 props로 게시글 아이디 가져오기
  // 현재 로그인한 유저의 아이디와 props의 게시글 아이디를 기반으로 좋아요 낙관적 업데이트 적용

  return (
    <S.Container>
      <S.Button
        $isLike={like.existsLike}
        onClick={async () => {
          if (like.existsLike) {
            deleteCommunityPostLike(id as unknown as string);
            setLike({ likeCnt: like.likeCnt - 1, existsLike: !like.existsLike });
          } else {
            addCommunityPostLike(id as unknown as string);
            setLike({ likeCnt: like.likeCnt + 1, existsLike: !like.existsLike });
          }
        }}
      >
        좋아요 {like.likeCnt}
      </S.Button>
    </S.Container>
  );
};

export default CommunityLike;

interface ButtonProps {
  $isLike: boolean;
}

const S = {
  Container: styled.div`
    width: 100%;
    padding: 20px 0;
  `,

  Button: styled.button<ButtonProps>`
    /* width: 100%; */
    padding: 8px 16px;
    border-radius: 50px;
    ${styleFont.body3};
    /* height: 40px; */
    box-sizing: border-box;

    ${(props) =>
      props.$isLike
        ? css`
            background-color: ${COLORS.GREEN[400]};
            color: ${COLORS.GRAY[0]};
          `
        : css`
            border: 1px solid ${COLORS.GREEN[400]};
            color: ${COLORS.GREEN[400]};
          `}
  `
};
