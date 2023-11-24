import React from 'react';
import styled from 'styled-components';

import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';

import { Comments } from './CommentList';
import useCommentMutate from 'src/api/comment/commentMutate';
import { useParams } from 'react-router-dom';
import userStore from 'src/store/userStore';
import { getRelativeTimeString } from 'src/utilities/getDate';

interface Props {
  comment: Comments;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentUserProfile = ({ comment, setIsEdit }: Props) => {
  const param = useParams() as { id: string };
  const { profile: user } = userStore();

  const { deleteCommentHandler } = useCommentMutate(param.id);

  const handleDelete = () => {
    deleteCommentHandler(comment.id as unknown as string);
  };

  return (
    <S.UserContainer>
      <S.ProfileImg
        alt="profileImg"
        src={comment?.user.profileImage == null ? 'http://via.placeholder.com/640x480' : comment?.user.profileImage}
      />
      <S.InfoContainer>
        <S.NickName>{comment?.user.nickname}</S.NickName>
        <S.LocationTimeBox>
          <S.Time>{getRelativeTimeString(comment.getCreatedAtAsString)}</S.Time>
        </S.LocationTimeBox>
      </S.InfoContainer>
      {user!.nickname === comment?.user.nickname && (
        <S.ButtonArea>
          <S.EditButton
            onClick={() => {
              setIsEdit(true);
            }}
          >
            수정
          </S.EditButton>
          <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
        </S.ButtonArea>
      )}
    </S.UserContainer>
  );
};

export default CommentUserProfile;

const S = {
  UserContainer: styled.div`
    display: flex;
  `,
  ButtonArea: styled.div`
    margin-left: auto;
    display: flex;
    gap: 10px;
  `,
  EditButton: styled.div``,
  DeleteButton: styled.div``,
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
