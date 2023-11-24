import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CommunityWriteFormData } from './CommunityWriteCategoty';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { communityWriteStore } from 'src/store/communityStore';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Post } from 'src/types/community/types';

interface CommunityWriteTextProps {
  watch: UseFormWatch<CommunityWriteFormData>;
  setValue: UseFormSetValue<CommunityWriteFormData>;
  // errors: FieldErrors<CommunityWriteFormData>;
}

const CommunityWriteText = () => {
  const { title, description, setTitle, setDescription } = communityWriteStore();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.pathname !== '/community/write') {
      const postData = queryClient.getQueryData<Post>(['post', location.pathname.split('/')[2]]);
      setTitle(postData!.title);
      setDescription(postData!.description);
    }
  }, []);

  return (
    <S.Container>
      <S.Title
        type="text"
        maxLength={20}
        placeholder="20자 이내 제목"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <S.Body
        placeholder="20자 이상 내용"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    </S.Container>
  );
};

export default CommunityWriteText;

const S = {
  ErrorMessage: styled.p``,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* padding: 12px 0; */

    gap: 8px;
    line-height: normal;
  `,
  Title: styled.input`
    ${styleFont.h2}
    color: ${COLORS.GRAY[900]};

    background-color: transparent;
    border: none;
    outline: none;
  `,
  Body: styled.textarea`
    ${styleFont.body1}
    color: ${COLORS.GRAY[900]};
    height: 70vh;
    padding: 0;
    background-color: transparent;
    border: none;
    line-height: 1.5;
    outline: none;
  `
};
