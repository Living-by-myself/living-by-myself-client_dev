import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from 'src/api/AxiosInstance';
import { COLORS } from 'src/styles/styleConstants';
import styled, { css } from 'styled-components';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';

interface BookmarkProps {
  bookmarkCnt: number;
  existsBookmark: boolean;
}

interface likeCntProps {
  likeCnt: number;
}

const GroupBuyBookmark = ({ likeCnt }: likeCntProps) => {
  const ParamsId = useParams();
  const id = ParamsId.id;
  const [bookmarkCnt, setBookmarkCnt] = useState(likeCnt);
  const existsBookmark = false;
  const [bookmark, setBookmark] = useState<BookmarkProps>({ bookmarkCnt, existsBookmark });

  // 북마크 취소
  const deleteGroupBuyPostBookmark = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/home/group-buying/${id}/pick-like`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 북마크 등록
  const addGroupBuyPostBookmark = async (id: number) => {
    try {
      const response = await axiosInstance.post(`/home/group-buying/${id}/pick-like`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <S.bookmarkButton
        $isBookmark={bookmark.existsBookmark}
        onClick={async () => {
          if (bookmark.existsBookmark) {
            deleteGroupBuyPostBookmark(Number(id!));
            setBookmarkCnt(bookmarkCnt - 1);
            setBookmark({ bookmarkCnt: bookmark.bookmarkCnt, existsBookmark: false });
            console.log('delete bookmarkCnt : ', bookmark.bookmarkCnt);
          } else {
            addGroupBuyPostBookmark(Number(id!));
            setBookmarkCnt(bookmarkCnt + 1);
            setBookmark({ bookmarkCnt: bookmark.bookmarkCnt, existsBookmark: true });
            console.log('add bookmarkCnt : ', bookmark.bookmarkCnt);
          }
        }}
      >
        {bookmark ? <RiBookmarkFill size={30} /> : <RiBookmarkLine size={30} />}
      </S.bookmarkButton>
    </>
  );
};

export default GroupBuyBookmark;

interface ButtonProps {
  $isBookmark: boolean;
}

const S = {
  bookmarkButton: styled.button<ButtonProps>`
    ${(props) =>
      props.$isBookmark
        ? css`
            /* background-color: ${COLORS.GREEN[400]}; */
            color: ${COLORS.GREEN[400]};
            border: none;
          `
        : css`
            /* border: 1px solid ${COLORS.GREEN[400]}; */
            color: ${COLORS.GREEN[400]};
          `}
  `
};
