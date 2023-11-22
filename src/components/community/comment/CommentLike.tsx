import axios from 'axios';
import { useState } from 'react';
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
  const [like, setlike] = useState({ existsLike, likeCnt });

  const Like = async () => {
    console.log(id);
    try {
      const response = await axios.post(
        `https://tracelover.shop/home/community/comment/${id}/like`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container
      $existsLike={like.existsLike}
      onClick={async () => {
        if (like.existsLike) {
          setlike({ existsLike: !like.existsLike, likeCnt: like.likeCnt - 1 });
        } else {
          await Like();
          setlike({ existsLike: !like.existsLike, likeCnt: like.likeCnt + 1 });
        }
      }}
    >
      <Icon name="heart" size={14} />
      좋아요 {like.likeCnt}
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
