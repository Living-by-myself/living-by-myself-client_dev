import RoundButton from 'src/components/button/RoundButton';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
// import { COMMUNITYCATEGORY } from 'src/pages/community/CommunityPage';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';
import SelectBox from 'src/components/selectBox/SelectBox';
import { useEffect, useState } from 'react';

import { useStore } from 'zustand';
import { communityWriteStore } from 'src/store/communityStore';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Post } from 'src/types/community/types';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';

export interface CommunityWriteFormData {
  title: string;
  description: string;
  images: FileList | null;
  category: CommunityCategory;
}

const CommunityWriteCategory = () => {
  // const [category, setCategory] = useState<CommunityCategory>();

  const { category, setCategory } = communityWriteStore();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.pathname !== '/community/write') {
      const postData = queryClient.getQueryData<Post>(['post', location.pathname.split('/')[2]]);
      setCategory(postData!.category as CommunityCategory);
    }
  }, []);

  return (
    <S.FilterBox>
      <S.FormBox>
        <S.Description>카테고리</S.Description>
        <S.CategorySelect id="FREE" $checked={category === 'FREE'} onClick={() => setCategory('FREE')}>
          자유
        </S.CategorySelect>
        <S.CategorySelect id="COOK" $checked={category === 'COOK'} onClick={() => setCategory('COOK')}>
          요리
        </S.CategorySelect>
        <S.CategorySelect id="INTERIOR" $checked={category === 'INTERIOR'} onClick={() => setCategory('INTERIOR')}>
          인테리어
        </S.CategorySelect>
        <S.CategorySelect id="CLEAN" $checked={category === 'CLEAN'} onClick={() => setCategory('CLEAN')}>
          청소
        </S.CategorySelect>
      </S.FormBox>
    </S.FilterBox>
  );
};

export default CommunityWriteCategory;

interface CategorySelectProps {
  $checked: boolean;
}

const S = {
  FilterBox: styled.div`
    /* width: 100vw; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px;
    /* overflow-x: scroll; */
    /* min-width: 400px; */
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `,
  Container: styled.div`
    padding: 12px 16px;
    width: 100vw;
    gap: 5px;
    display: flex;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 5px;
    align-items: center;
  `,
  Description: styled.div`
    ${styleFont.body3}
  `,
  FormBox: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  CategorySelect: styled.div<CategorySelectProps>`
    ${styleFont.body3}

    border-radius: 50px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: ${COLORS.GRAY[400]};
    ${(props) =>
      props.$checked &&
      css`
        padding: 6px 12px;
        font-weight: 600;

        background-color: ${COLORS.GREEN[400]};
        color: ${COLORS.GRAY[0]};
      `}
  `
};
