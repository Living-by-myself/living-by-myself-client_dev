import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import theme from 'src/styles/theme';
import { COLORS } from 'src/styles/styleConstants';
import axios from 'axios';

interface SignFormType {
  username: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string;
  phoneAuthNumber: string;
}

const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
const PHONENUMBER_REGEX = /^010\d{8}$/;

const validateEmail = (username: string) => {
  const emailRegex = new RegExp(EMAIL_REGEX);
  return emailRegex.test(username);
};

const validatePassword = (password: string) => {
  const passwordRegex = new RegExp(PASSWORD_REGEX);
  return passwordRegex.test(password);
};

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = new RegExp(PHONENUMBER_REGEX);
  return phoneNumberRegex.test(phoneNumber);
};

const schema = z
  .object({
    username: z.string().refine(validateEmail, { message: '올바른 이메일을 입력해주세요.' }),
    password: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }).refine(validatePassword, {
      message: '영문, 숫자, 특수문자(!@#$%^&*()_+)를 포함한 8자 이상의 비밀번호를 입력해주세요.'
    }),
    passwordCheck: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }),
    phoneNumber: z.string().refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
    phoneAuthNumber: z
      .string()
      .min(6, { message: '인증번호 6자리를 입력해주세요.' })
      .max(6, { message: '인증번호 6자리를 입력해주세요.' })
  })
  .refine((passwordConfirm) => passwordConfirm.password === passwordConfirm.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck']
  });
//   .refine((authNumber) => authNumber.phoneAuthNumber === '', { message: '전화번호 인증이 필요합니다.' });

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<SignFormType>({
    resolver: zodResolver(schema)
  });
  //   console.log(watch);
  //   console.log(errors.username?.message);
  //   console.log(register)

  const [userData, setUserData] = useState<any>([]);
  
  const onSubmit: SubmitHandler<SignFormType> = async (data) => {
    const { username, password, passwordCheck, phoneNumber } = data;
    await axios.post('https://tracelover.shop/home/users/signup', {
      username,
      password,
      passwordCheck,
      phoneNumber
    });
  };
  const phoneAuthNumberButton = async() => {
    const phoneNumber = getValues('phoneNumber')
    try {
        await axios.post('https://tracelover.shop/home/auth/message', {
        phoneNumber,
    });
    } catch (error) {
        alert(error)
    }
    
  };
  const getbutton = async () => {
    const res = await axios.get('https://tracelover.shop/home/users/signup');
    setUserData(res);
    console.log('유저데이터', userData);
  };
  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormRow>
          <label htmlFor="username">이메일</label>
          <input id="username" placeholder="이메일" {...register('username')} />
          <S.ErrorMessage>{errors.username?.message}</S.ErrorMessage>
        </S.FormRow>
        <S.FormRow>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" placeholder="비밀번호" {...register('password')} />
          <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>
        </S.FormRow>
        <S.FormRow>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input id="passwordCheck" type="password" placeholder="비밀번호 확인" {...register('passwordCheck')} />
          <S.ErrorMessage>{errors.passwordCheck?.message}</S.ErrorMessage>
        </S.FormRow>
        <S.FormRow>
          <label>전화번호</label>
          <S.FormColumn>
            <input id="phoneNUmber" placeholder="전화번호" {...register('phoneNumber')} />
            <S.Button onClick={phoneAuthNumberButton}>인증번호 받기</S.Button>
          </S.FormColumn>
          <S.ErrorMessage>{errors.phoneNumber?.message}</S.ErrorMessage>
          <input id="phoneAuthNumber" placeholder="인증번호 입력" {...register('phoneAuthNumber')} />
          <S.ErrorMessage>{errors.phoneAuthNumber?.message}</S.ErrorMessage>
        </S.FormRow>
        <S.Button>회원가입</S.Button>
        <button onClick={getbutton}>겟버튼</button>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;

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
