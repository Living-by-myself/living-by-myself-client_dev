import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

interface NumberType {
  phoneNumber: string;
}

const PHONENUMBER_REGEX = /^010\d{8}$/;

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = new RegExp(PHONENUMBER_REGEX);
  return phoneNumberRegex.test(phoneNumber);
};

const schema = z
  .object({
    phoneNumber: z.string().refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
    phoneAuthNumber: z
      .string()
      .min(4, { message: '인증번호 4자리를 입력해주세요.' })
      .max(4, { message: '인증번호 4자리를 입력해주세요.' })
  })
  .refine((spaceNumber) => spaceNumber.phoneNumber === '', { message: '전화번호를 입력해주세요.' });

const SignUpPhoneAuth = () => {
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<NumberType>({ resolver: zodResolver(schema) });

  const phoneAuthNumberButton = async () => {
    const phoneNumber = getValues('phoneNumber');
    await axios.post('https://tracelover.shop/home/auth/message', {
      phoneNumber
    });
    toast('인증번호 전송');
  };

  return (
    // <S.FormRow>
    //   <label>전화번호</label>
    <S.FormColumn>
      <input id="phoneNumber" placeholder="전화번호" {...register('phoneNumber')} />
      <S.Button type="button" onClick={phoneAuthNumberButton}>
        인증번호 받기
      </S.Button>
      <S.ErrorMessage>{errors.phoneNumber?.message}</S.ErrorMessage>
    </S.FormColumn>
    // </S.FormRow>
  );
};

export default SignUpPhoneAuth;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 6rem;
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
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
  ErrorMessage: styled.p`
    color: ${COLORS.RED[300]};
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
