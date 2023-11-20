import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FlexBox, MobileContainer } from 'src/styles/styleBox';
import RoundButton from 'src/components/button/RoundButton';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import CommunityPostCard from 'src/components/community/CommunityPostCard';
import { Post } from 'src/types/community/types';
import { useQuery } from '@tanstack/react-query';
import { getPostList } from 'src/api/community';
import SelectBox from 'src/components/selectBox/SelectBox';

export const COMMUNITYCATEGOTY = [
  { type: 'ALL', name: '전체' },
  { type: 'FREE', name: '자유' },
  { type: 'COOK', name: '요리' },
  { type: 'INTERIOR', name: '인테리어' },
  { type: 'CLEAN', name: '청소' }
];
export const COMMUNITYFILTER = [{ type: 'asc', name: '최신순' }];

export type CommunityCategory = 'ALL' | 'FREE' | 'COOK' | 'INTERIOR' | 'CLEAN';
export type CommunityFilter = 'asc' | 'desc';

const CommunityPage = () => {
  const [category, setCategory] = useState<CommunityCategory>('ALL');
  const [filter, setFilter] = useState<CommunityFilter>('asc');
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts', category],
    queryFn: () => getPostList({ category, filter })
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <MobileContainer>
      <S.FilterArea>
        <SelectBox option={COMMUNITYCATEGOTY} setSelect={setCategory} />
        <SelectBox option={COMMUNITYFILTER} setSelect={setFilter} />
      </S.FilterArea>
      <S.CommunityList>
        {data?.map((item) => {
          return <CommunityPostCard key={item.id} post={item} />;
        })}
      </S.CommunityList>
    </MobileContainer>
  );
};

export default CommunityPage;

export const S = {
  FilterArea: styled(FlexBox)`
    width: 100%;
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
  `,
  CommunityList: styled.div`
    width: 100%;
    padding: 0 16px;
  `
};
