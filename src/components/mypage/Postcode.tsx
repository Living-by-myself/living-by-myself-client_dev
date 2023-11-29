import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';

const Postcode = () => {
  const [modal, setModal] = useState(false);

  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const { register } = useForm();

  const modalHandler = () => {
    setModal(!modal);
  };
  const completeHandler = (data: any) => {
    setRoadAddress(data.roadAddress);
  };

  return (
    <>
      <S.FormColumn>
        <input readOnly placeholder="주소" {...register('address')}></input>
        <S.Button onClick={modalHandler} type="button">
          우편번호 찾기
        </S.Button>
      </S.FormColumn>
      {/* <input placeholder='상세주소' {...register('Detailaddress')}></input> */}
      <DaumPostcode onComplete={completeHandler} />
    </>
  );
};

export default Postcode;

const S = {
  FormRow: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      display: flex;

      width: 100%;
      border: solid 1px ${COLORS.GRAY[400]};
      border-radius: 6px;
      padding: 0.8rem 1.2rem;
    }
  `,
  FormColumn: styled.div`
    display: flex;
    gap: 9px;
  `,
  Button: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0.8rem 1.2rem;
    background-color: ${COLORS.GREEN[300]};
    color: ${COLORS.GRAY[0]};
    border-radius: 6px;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  `
};
