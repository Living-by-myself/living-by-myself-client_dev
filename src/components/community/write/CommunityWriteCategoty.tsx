import RoundButton from 'src/components/button/RoundButton';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
import { COMMUNITYCATEGOTY } from 'src/pages/community/CommunityPage';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import styled from 'styled-components';
import SelectBox from 'src/components/selectBox/SelectBox';
import { useState } from 'react';

import { useStore } from 'zustand';
import { CommunityWriteStore } from 'src/store/communityStore';

export interface CommunityWriteFormData {
  title: string;
  description: string;
  images: FileList | null;
  category: CommunityCategory;
}

const CommunityWriteCategory = () => {
  // const [category, setCategory] = useState<CommunityCategory>();

  const { setCategory } = CommunityWriteStore();

  return (
    <S.Container>
      <SelectBox option={COMMUNITYCATEGOTY.filter((item) => item.type !== 'ALL')} setSelect={setCategory} />
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
  `
};
