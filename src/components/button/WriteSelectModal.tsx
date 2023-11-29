import React from 'react';
import BaseModal from '../modal/BaseModal';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import Button from './Button';
import { styleFont } from 'src/styles/styleFont';
import { useNavigate } from 'react-router-dom';
import Icon from '../icon/Icon';

interface ModalProps {
  onClose: () => void;
  userId?: number;
}

const WriteSelectModal = ({ onClose }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <BaseModal onClose={onClose} side="center">
      <S.Container>
        <S.Title>작성할 글을 선택 해주세요.</S.Title>
        <Button
          onClick={() => {
            navigate('/community/write');
          }}
        >
          <S.Caption>
            <Icon name="book" size={16} />커 뮤 니 티
          </S.Caption>
        </Button>
        <Button
          onClick={() => {
            navigate('/group-buy/write');
          }}
        >
          <S.Caption>
            <Icon name="shopping-basket" size={16} />공 동 구 매
          </S.Caption>
        </Button>
      </S.Container>
    </BaseModal>
  );
};

export default WriteSelectModal;

const S = {
  Container: styled.div`
    border-right: 1px solid ${COLORS.GRAY[300]};
    height: 100%;
    width: 280px;
    background-color: ${COLORS.GRAY[0]};
    padding: 2rem;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  `,
  Title: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    ${styleFont.h2}
    margin-bottom:10px;
  `,
  Caption: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  `
};
