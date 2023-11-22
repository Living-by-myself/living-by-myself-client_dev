import { COLORS } from 'src/styles/styleConstants';
import Icon from '../icon/Icon';
import { useNavigate } from 'react-router-dom';
import { styleFont } from 'src/styles/styleFont';
import { Post } from 'src/types/community/types';
import styled from 'styled-components';
import { addResizeToUrl } from 'src/utilities/image';

interface CommunityPostCardProps {
  post: Post;
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  const navigate = useNavigate();
  return (
    <S.Container
      onClick={() => {
        navigate(`/community/${post.id}`);
      }}
    >
      <S.ContentsBox>
        <S.TitleBodyBox $isImage={post.fileUrls !== null ? true : false}>
          <S.CategoryContainer>{post.category} 인기글</S.CategoryContainer>

          {/* 컨텐츠 박스의 크기가 조절 됨 */}
          <S.Title>{post.title}</S.Title>
          <S.Body>{post.description}</S.Body>
        </S.TitleBodyBox>

        {/* 이미지속성 있고 없고로 조건부 렌더링 */}
        {post.fileUrls ? (
          <S.ImageBox>
            <S.Image alt="이미지명" src={addResizeToUrl(post.fileUrls)} />
          </S.ImageBox>
        ) : (
          <></>
        )}
      </S.ContentsBox>

      <S.PostInfoContainer>
        <S.TimeViewBox>
          <S.Time>{post.getCreatedAtAsString}</S.Time>
          <S.View> · {post.viewCnt}</S.View>
        </S.TimeViewBox>
        <S.CommentLikeBox>
          <Icon name="message-circle" size={'12'} />
          <S.Comment>{post.commentCnt}</S.Comment>
        </S.CommentLikeBox>
        <Icon name="heart" size={'12'} />
        <S.Like>{post.likeCnt}</S.Like>
      </S.PostInfoContainer>
    </S.Container>
  );
};

export default CommunityPostCard;

interface imgProps {
  $isImage: boolean;
}

const S = {
  Container: styled.div`
    padding: 14px 0 16px;
    width: 100%;
    border-bottom: 1px solid ${COLORS.GRAY[200]};
  `,
  CategoryContainer: styled.div`
    ${styleFont.body4}
    color: ${COLORS.GREEN[400]};
    margin-bottom: 7px;
  `,
  ContentsBox: styled.div`
    display: flex;
    gap: 15px;
  `,
  TitleBodyBox: styled.div<imgProps>`
    ${({ $isImage }) => ($isImage ? 'width: calc(100% - 65px)' : 'width: 100%')};
  `,
  Title: styled.h1`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    margin-bottom: 5px;

    /* background-color: royalblue; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,
  Body: styled.h3`
    ${styleFont.body3}
    color: ${COLORS.GRAY[400]};
    margin-bottom: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,
  PostInfoContainer: styled.div`
    display: flex;
    align-items: center;
    ${styleFont.body4}
    color: ${COLORS.GRAY[400]};
  `,
  TimeViewBox: styled.div`
    display: flex;
    align-items: center;
    margin-right: auto;
  `,
  CommentLikeBox: styled.div`
    display: flex;
    align-items: center;
    margin-left: 0;
  `,
  Time: styled.p``,
  View: styled.p``,
  Comment: styled.p`
    margin: 1px 10px 0 3px;
  `,
  Like: styled.p`
    margin: 1px 0 0 3px;
  `,
  ImageBox: styled.div`
    min-width: 50px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 5px;
    margin-left: auto;
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    min-width: 50px;

    border-radius: 5px;
  `
};
