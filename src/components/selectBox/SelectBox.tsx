import React, { useEffect } from 'react';
import { CommunityCategory } from 'src/pages/community/CommunityPage';
import { CommunityWriteStore } from 'src/store/communityStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';

interface SelectProps {
  type?: string;
  name?: string;
}

interface SelectBoxProps {
  setSelect: React.Dispatch<React.SetStateAction<any>>;
  option?: SelectProps[];
  filter?: string;
}

const SelectBox = ({ option, setSelect, filter }: SelectBoxProps) => {
  const { category, setCategory } = CommunityWriteStore();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (location.pathname === '/community') {
      setSelect(e.target.value);
    } else {
      setCategory(e.target.value as CommunityCategory);
    }
  };

  return (
    <S.Select onChange={handleChange} value={filter ? filter : category}>
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
