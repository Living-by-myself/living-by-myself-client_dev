import styled from 'styled-components';
import { Comments } from './CommentList';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';
import CommunityUserProfile from '../CommunityUserProfile';
import CommentLike from './CommentLike';
// import PostDetailUser from "../../postDetail/user";
// import CommentLike from "../like";

interface Props {
  comment: Comments;
}

const Comment = ({ comment }: Props) => {
  return (
    <S.Container>
      {/* 댓글 유저 정보 컴포넌트 */}
      {/* <CommunityUserProfile /> */}
      {/* <S.NickName>{comment.nickName}</S.NickName> */}
      <S.CommentBody>{comment.description}</S.CommentBody>

      {/* 댓글좋아요 컴포넌트 */}
      <CommentLike likeCnt={comment.likeCnt} id={comment.id} existsLike={comment.existsLike} />
    </S.Container>
  );
};

export default Comment;

const S = {
  NickName: styled.p`
    ${styleFont.body3}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 3px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 18px;
  `,
  CommentBody: styled.p`
    margin-left: 37px;

    ${styleFont.body3}
    line-height: 1.5;
    color: ${COLORS.GRAY[900]};
  `
};
