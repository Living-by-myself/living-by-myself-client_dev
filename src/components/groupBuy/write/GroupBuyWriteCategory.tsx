import React from 'react';
import { UseFormSetValue, UseFormWatch, set } from 'react-hook-form';
import { GroupBuyWriteFormProps } from 'src/store/groupStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

interface GroupBuyWriteCategoryProps {
  watch: UseFormWatch<GroupBuyWriteFormProps>;
  setValue: UseFormSetValue<GroupBuyWriteFormProps>;
}
const GroupBuyWriteCategory = ({ watch, setValue }: GroupBuyWriteCategoryProps) => {
  return (
    <S.FilterBox>
      <S.FormBox>
        <S.Label>카테고리</S.Label>
        <S.CategorySelect
          id="FOOD"
          $checked={watch('enumCategory') === 'FOOD'}
          onClick={() => {
            setValue('enumCategory', 'FOOD');
          }}
        >
          식품
        </S.CategorySelect>
        <S.CategorySelect
          id="LIFE"
          $checked={watch('enumCategory') === 'LIFE'}
          onClick={() => {
            setValue('enumCategory', 'LIFE');
          }}
        >
          생활용품
        </S.CategorySelect>
        <S.CategorySelect
          id="OTHER"
          $checked={watch('enumCategory') === 'OTHER'}
          onClick={() => {
            setValue('enumCategory', 'OTHER');
          }}
        >
          기타
        </S.CategorySelect>
      </S.FormBox>
      <S.ButtonBox>
        <S.SortButton
          onClick={() => {
            if (watch('enumShare') === 'BUY') {
              setValue('enumShare', 'SHARE');
            } else {
              setValue('enumShare', 'BUY');
            }
          }}
        >
          {watch('enumShare') === 'BUY' ? '공동구매' : '나눔'}
        </S.SortButton>
      </S.ButtonBox>
    </S.FilterBox>
  );
};

export default GroupBuyWriteCategory;
interface CategorySelectProps {
  $checked?: boolean;
}
const S = {
  FilterListBox: styled.div`
    display: flex;
    gap: 6px;
    /* padding: 0 16px; */
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
    padding: 12px 16px;
    overflow-x: scroll;
    max-width: 768px;
    width: 100%;
  `,
  ButtonBox: styled.div`
    display: flex;
    gap: 6px;
  `,
  SortButton: styled.div`
    ${styleFont.h1}
    font-weight: 600;
    color: ${COLORS.GREEN[400]};
    cursor: pointer;
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
