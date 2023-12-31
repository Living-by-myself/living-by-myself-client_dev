import styled from 'styled-components';
import { FlexBox, MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import {
  CommunityCategory as CommunityCategorys,
  CommunityCategoryValues,
  CommunitySortValues,
  Post
} from 'src/types/community/types';
import CommunityList from 'src/components/community/CommunityList';
import CommunityListFilter from 'src/components/community/CommunityListFilter';

export const COMMUNITYCATEGORY = [
  { type: 'ALL', name: '전체' },
  { type: 'FREE', name: '자유' },
  { type: 'COOK', name: '요리' },
  { type: 'INTERIOR', name: '인테리어' },
  { type: 'CLEAN', name: '청소' }
];
export const COMMUNITYFILTER = [{ type: 'asc', name: '최신순' }];

export type CommunityCategory = 'ALL' | 'FREE' | 'COOK' | 'INTERIOR' | 'CLEAN';
export type CommunityFilter = 'asc' | 'desc';

export type FetchNextPageOptions = {
  pageParam: number;
  option: {
    category: CommunityCategoryValues;
    sort: CommunitySortValues;
    keyword: string;
  };
};

export interface CommunityQueryData {
  data: Post[];
  page: number;
  totalPages: number;
}
const CommunityPage = () => {
  return (
    <MobileContainer>
      <S.FilterArea>
        <CommunityListFilter />
      </S.FilterArea>
      <S.CommunityList>
        <CommunityList />
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
    padding: 0 16px;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
    background-color: ${COLORS.GRAY[0]};
    position: fixed;

    justify-content: center;
  `,
  CommunityList: styled.ul`
    width: 100%;
    padding: 0 16px;
    margin-top: 50px;
  `
};
