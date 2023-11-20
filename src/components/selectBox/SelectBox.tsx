import React, { useState } from 'react';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';

interface SelectProps {
  type?: string;
  name?: string;
}

interface SelectBoxProps {
  setSelect: React.Dispatch<React.SetStateAction<any>>;
  option?: SelectProps[];
}

const SelectBox = ({ option, setSelect }: SelectBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <S.Select onChange={handleChange}>
      {option?.map((item) => {
        return (
          <option key={item.type} value={item.type}>
            {item.name}
          </option>
        );
      })}
    </S.Select>
  );
};

export default SelectBox;

interface ButtonStyleProps {
  $isCheck?: boolean;
}

const S = {
  Select: styled.select<ButtonStyleProps>`
    padding: 6px 12px;
    border-radius: 20px;
    outline: none;
    ${styleFont.body4}
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    ${({ $isCheck }) => {
      if ($isCheck) {
        return css`
          color: ${COLORS.GREEN[400]};
          border: 1px solid ${COLORS.GREEN[400]};
        `;
      } else {
        return css`
          color: ${COLORS.GRAY[400]};
          border: 1px solid ${COLORS.GRAY[400]};
        `;
      }
    }}
  `
};
