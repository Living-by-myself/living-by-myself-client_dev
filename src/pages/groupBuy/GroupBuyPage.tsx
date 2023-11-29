import { MobileContainer } from 'src/styles/styleBox';
import styled from 'styled-components';
import GroupBuyListFilter from './GroupBuyListFilter';
import { useGroupBuyQuery } from 'src/store/groupStore';
import GroupBuyList from './GroupBuyList';
import { Button } from 'src/components/button/styles';
import { useEffect } from 'react';
import { COLORS } from 'src/styles/styleConstants';

const GroupBuyPage = () => {
  const { option: queryOption, setOption } = useGroupBuyQuery();

  return (
    <MobileContainer>
      <S.FilterContainer>
        <GroupBuyListFilter />
      </S.FilterContainer>
      <S.ContentsContainer>
        <GroupBuyList />
      </S.ContentsContainer>
    </MobileContainer>
  );
};

export default GroupBuyPage;

const S = {
  FilterContainer: styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
    padding: 0 16px;
    border-bottom: 1px solid ${COLORS.GRAY[400]};
    background-color: ${COLORS.GRAY[0]};
    position: fixed;
    justify-content: center;
  `,
  ContentsContainer: styled.div`
    width: 100%;
    padding: 0 16px;
    margin-top: 84px;
  `
};
