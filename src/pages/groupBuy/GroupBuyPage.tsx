import { MobileContainer } from 'src/styles/styleBox';
import styled from 'styled-components';
import GroupBuyListFilter from './GroupBuyListFilter';
import { useGroupBuyQuery } from 'src/store/groupStore';
import GroupBuyList from './GroupBuyList';

const GroupBuyPage = () => {
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
  `,
  ContentsContainer: styled.div`
    width: 100%;
  `
};
