import RoundButton from 'src/components/button/RoundButton';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
import { COMMUNITYCATEGORY } from 'src/pages/community/CommunityPage';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';
import SelectBox from 'src/components/selectBox/SelectBox';
import { useEffect, useState } from 'react';

import { useStore } from 'zustand';
import { communityWriteStore } from 'src/store/communityStore';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Post } from 'src/types/community/types';
import { styleFont } from 'src/styles/styleFont';

export interface CommunityWriteFormData {
  title: string;
  description: string;
  images: FileList | null;
  category: CommunityCategory;
}

const CommunityWriteCategory = () => {
  // const [category, setCategory] = useState<CommunityCategory>();

  const { setCategory } = communityWriteStore();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.pathname !== '/community/write') {
      const postData = queryClient.getQueryData<Post>(['post', location.pathname.split('/')[2]]);
      setCategory(postData!.category as CommunityCategory);
    }
  }, []);

  return (
    <S.Container>
      <SelectBox option={COMMUNITYCATEGORY.filter((item) => item.type !== 'ALL')} setSelect={setCategory} />
      <S.Description>카테고리를 선택하세요.</S.Description>
    </S.Container>
  );
};

export default CommunityWriteCategory;

const S = {
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
  `
};
