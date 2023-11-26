import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import { z } from 'zod';

const PHONENUMBER_REGEX = /^010\d{8}$/;

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = new RegExp(PHONENUMBER_REGEX);
  return phoneNumberRegex.test(phoneNumber);
};

const schema = z.object({
  phoneNumber: z
    .string()
    .nonempty({ message: '올바른 전화번호 입력' })
    .refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
  phoneAuthNumber: z
    .string()
    .min(6, { message: '인증번호 6자리를 입력해주세요.' })
    .max(6, { message: '인증번호 6자리를 입력해주세요.' })
});

const FindPhoneAuth = () => {
  const { register, getValues } = useForm({ resolver: zodResolver(schema) });

  const findPasswordButton = async () => {
    const phoneNumber = getValues('phoneNumber');
    try {
      await axios.post('https://tracelover.shop/home/auth/message?authentication=find', {
        phoneNumber
      });
      alert('인증번호 발송');
    } catch (error: any) {}
  };

  return (
    <S.FormRow>
      <label>전화번호</label>
      <input placeholder="휴대폰 번호(-없이 숫자만 입력)" {...register('phoneNumber')} />
      <S.Button onClick={findPasswordButton}>인증번호 받기</S.Button>
      {/* <input placeholder='인증번호 입력' {...register('phoneAuthNumber')}/> */}
    </S.FormRow>
  );
};

export default FindPhoneAuth;

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
