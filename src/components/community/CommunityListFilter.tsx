import { useState } from 'react';
import { communityAPIOptionStore } from 'src/store/communityStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

const CommunityListFilter = () => {
  const { category, sort, setCategory, setSort } = communityAPIOptionStore();

  return (
    <S.FilterBox>
      <S.FormBox>
        <S.CategorySelect id="ALL" $checked={category === 'ALL'} onClick={() => setCategory('ALL')}>
          전체
        </S.CategorySelect>

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

      <S.SortButton
        onClick={() => {
          if (sort === 'asc') {
            setSort('desc');
          } else {
            setSort('asc');
          }
        }}
      >
        {sort === 'asc' ? '오래된순' : '최신순'}
      </S.SortButton>
    </S.FilterBox>
  );
};

export default CommunityListFilter;

interface CategorySelectProps {
  $checked: boolean;
}

const S = {
  FilterBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    overflow-x: scroll;
    /* min-width: 400px; */
    width: 100%;
  `,
  SortButton: styled.div`
    ${styleFont.body3}
    color: ${COLORS.GREEN[400]};
  `,
  FormBox: styled.div`
    display: flex;
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

// const FormCheckLeft = styled.input.attrs({ type: 'radio' })`
//   &:checked {
//     display: inline-block;
//     background: none;
//     padding: 0px 10px;
//     text-align: center;
//     height: 35px;
//     line-height: 33px;
//     font-weight: 500;
//     display: none;
//   }
//   /* &:checked + ${FormCheckText} {
//     background: #e4794d;
//     color: #fff;
//   } */
//   display: none;
// `;
