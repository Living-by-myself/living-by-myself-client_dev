import axios from 'axios';
import { useState } from 'react';
import { addCommentLike, deleteCommentLike } from 'src/api/comment/comment';
import Icon from 'src/components/icon/Icon';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

interface Props {
  id: number;
  likeCnt: number;
  existsLike: boolean;
}

const token = localStorage.getItem('atk');

const CommentLike = ({ likeCnt, existsLike, id }: Props) => {
  const [like, setLike] = useState({ existsLike, likeCnt });

  return (
    <S.Container
      $existsLike={like.existsLike}
      onClick={async () => {
        if (like.existsLike) {
          deleteCommentLike(id as unknown as string);
          setLike({ existsLike: !like.existsLike, likeCnt: like.likeCnt - 1 });
        } else {
          addCommentLike(id as unknown as string);
          setLike({ existsLike: !like.existsLike, likeCnt: like.likeCnt + 1 });
        }
      }}
    >
      <Icon name="heart" size={14} />
      {like.likeCnt}
    </S.Container>
  );
};

export default CommentLike;

interface ContainerProps {
  $existsLike: boolean;
}

const S = {
  Container: styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    gap: 5px;

    margin-left: 37px;
    margin-top: 5px;
    /* background-color: red; */

    line-height: 1.5;
    ${styleFont.body4};
    color: ${(props) => (props.$existsLike ? COLORS.RED[600] : COLORS.GRAY[400])};
    /* color: ${COLORS.GRAY[400]}; */
  `
};
