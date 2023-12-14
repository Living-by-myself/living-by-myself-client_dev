import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/api/AxiosInstance';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { addGroupBuyPostBookmark, deleteGroupBuyPostBookmark } from 'src/api/groupBuy/groupBuy';

interface BookmarkProps {
  likeCount: number;
  id?: number;
  pickLike: boolean;
}

const GroupBuyBookmark = ({ likeCount, id, pickLike }: BookmarkProps) => {
  const [bookmark, setBookmark] = useState({ likeCount, pickLike });

  useEffect(() => {
    setBookmark({ likeCount, pickLike });
  }, [pickLike]);

  return (
    <>
      <S.bookmarkButton
        onClick={async () => {
          if (bookmark.pickLike) {
            deleteGroupBuyPostBookmark(id as number);
            setBookmark({ likeCount: bookmark.likeCount - 1, pickLike: !bookmark.pickLike });
            console.log('delete bookmarkCnt : ', bookmark.likeCount);
          } else {
            addGroupBuyPostBookmark(id as number);
            setBookmark({ likeCount: bookmark.likeCount + 1, pickLike: !bookmark.pickLike });
            console.log('add bookmarkCnt : ', bookmark.likeCount);
          }
        }}
      >
        {bookmark.pickLike ? <RiBookmarkFill size={30} /> : <RiBookmarkLine size={30} />}
      </S.bookmarkButton>
    </>
  );
};

export default GroupBuyBookmark;

const S = {
  bookmarkButton: styled.button`
    color: ${COLORS.GREEN[400]};
  `
};
