import React, { useEffect, useState } from 'react';
import { groupBuyAPIOptionStore, useGroupBuyQuery } from 'src/store/groupStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

const GroupBuyListFilter = () => {
  const { category, setCategory, category_share, setCategoryShare, category_status, setCategoryStatus, sort, setSort } =
    groupBuyAPIOptionStore();

  return (
    <S.FilterBox>
      <S.FilterListBox>
        <S.FormBox>
          <S.Label>형태</S.Label>
          <S.CategorySelect id="ALL" $checked={category_share === 'ALL'} onClick={() => setCategoryShare('ALL')}>
            전체
          </S.CategorySelect>
          <S.CategorySelect id="BUY" $checked={category_share === 'BUY'} onClick={() => setCategoryShare('BUY')}>
            공구
          </S.CategorySelect>
          <S.CategorySelect id="SHARE" $checked={category_share === 'SHARE'} onClick={() => setCategoryShare('SHARE')}>
            나눔
          </S.CategorySelect>
        </S.FormBox>

        <S.FormBox>
          <S.Label>카테고리</S.Label>
          <S.CategorySelect id="ALL" $checked={category === 'ALL'} onClick={() => setCategory('ALL')}>
            전체
          </S.CategorySelect>
          <S.CategorySelect id="FOOD" $checked={category === 'FOOD'} onClick={() => setCategory('FOOD')}>
            식품
          </S.CategorySelect>
          <S.CategorySelect id="LIFE" $checked={category === 'LIFE'} onClick={() => setCategory('LIFE')}>
            생활
          </S.CategorySelect>
          <S.CategorySelect id="OTHER" $checked={category === 'OTHER'} onClick={() => setCategory('OTHER')}>
            기타
          </S.CategorySelect>
        </S.FormBox>
      </S.FilterListBox>
      <S.ButtonBox>
        <S.SortButton
          onClick={() => {
            if (category_status === 'ONGOING') {
              setCategoryStatus('DEADLINE');
            } else {
              setCategoryStatus('ONGOING');
            }
          }}
        >
          {category_status === 'ONGOING' ? '진행중만' : '종료까지'}
        </S.SortButton>
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
      </S.ButtonBox>
    </S.FilterBox>
  );
};

export default GroupBuyListFilter;

interface GroupBuySelectProps {
  $checked?: boolean;
}

const S = {
  FilterListBox: styled.div`
    display: flex;
    gap: 6px;
    flex-direction: column;
  `,
  Label: styled.div`
    ${styleFont.h4}
    color: ${COLORS.GREEN[400]};
  `,
  FilterBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    overflow-x: scroll;
    max-width: 768px;
    width: 100%;
  `,
  ButtonBox: styled.div`
    display: flex;
    gap: 6px;
  `,
  SortButton: styled.div`
    ${styleFont.body3}
    font-weight: 600;
    color: ${COLORS.GREEN[400]};
    cursor: pointer;
  `,
  FormBox: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  CategorySelect: styled.div<GroupBuySelectProps>`
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
