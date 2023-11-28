import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, z } from 'zod';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import axiosInstance, { axiosBaseInstance } from 'src/api/AxiosInstance';
import { validateEmail, validatePassword, validatePhoneNumber } from './Validate';
import { SignFormType } from 'src/types/user/types';
import axios from 'axios';
import SignUpPhoneAuth from './SignUpPhoneAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = z
  .object({
    username: z.string().refine(validateEmail, { message: '올바른 이메일을 입력해주세요.' }),
    password: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }).refine(validatePassword, {
      message: '영문, 숫자, 특수문자(!@#$%^&*()_+)를 포함한 8자 이상의 비밀번호를 입력해주세요.'
    }),
    passwordCheck: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }),
    phoneNumber: z
      .string()
      .nonempty('올바른 전화번호를 입력해주세요.')
      .refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
    phoneAuthNumber: z
      .string()
      .min(4, { message: '인증번호 4자리를 입력해주세요.' })
      .max(4, { message: '인증번호 4자리를 입력해주세요.' })
  })
  .refine((passwordConfirm) => passwordConfirm.password === passwordConfirm.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck']
  });

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<SignFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  });

  const navigate = useNavigate();
  // const phoneNumber = getValues('phoneNumber');
  // const phoneAuthNumber = getValues('phoneAuthNumber');

  const [isPhoneAuthCompleted, setIsPhoneAuthCompleted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignFormType> = async (data) => {
    const { username, password, passwordCheck, phoneNumber } = data;

    try {
      if (isPhoneAuthCompleted) {
        await axiosBaseInstance.post('/home/users/signup', {
          username,
          password,
          passwordCheck,
          phoneNumber
        });
        toast('회원가입 완료');
        navigate('/');
      } else {
        toast('휴대폰 인증번호를 확인해주세요.');
      }
    } catch (error: any) {
      toast(error.response.data.msg);
    }
  };

  const phoneAuthNumberButton = async () => {
    const number = watch('phoneNumber');
    console.log(typeof number);
    try {
      await axiosBaseInstance.post('/home/auth/message', {
        phoneNumber: number
      });
      toast('인증번호가 전송되었습니다.');
      setIsPhoneAuthCompleted(false);
    } catch (error) {
      if (number === '') {
        toast('휴대폰 번호를 확인해주세요.');
      } else if (validatePhoneNumber(number.trim())) {
        // to 대성님... 아래 else if는 이미 있는 번호인지 검사하는거 아니죠..? 요 함수는 번호형식만 검사하는 함수입니다.
        toast(`${number}는 이미 있는 번호입니다.`);
      } else {
        toast('휴대폰 번호를 확인해주세요.');
      }
    }
  };

  const checkPhoneAuthNumberButton = async () => {
    const number = watch('phoneNumber');
    console.log(number);
    try {
      await axiosBaseInstance.post('/home/auth/message-code/signup', {
        phoneNumber: number,
        code: number
      });
      setIsPhoneAuthCompleted(true);
      toast('휴대폰 인증 완료');
    } catch (error) {
      toast('인증번호가 다릅니다.');
    }
  };

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.ContainerInner>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <label htmlFor="username">이메일</label>
            <input id="username" placeholder="이메일" {...register('username')} />
            <S.ErrorMessage>{errors.username?.message}</S.ErrorMessage>
          </S.FormRow>
          <S.FormRow>
            <label>전화번호</label>
            <S.FormColumn>
              <input
                id="phoneNumber"
                value={watch('phoneNumber')}
                placeholder="전화번호"
                {...register('phoneNumber')}
              />
              <S.Button type="button" onClick={phoneAuthNumberButton}>
                인증번호 받기
              </S.Button>
            </S.FormColumn>
            {/* <SignUpPhoneAuth/> */}
            <S.ErrorMessage>{errors.phoneNumber?.message}</S.ErrorMessage>
            <input id="phoneAuthNumber" placeholder="인증번호 입력" {...register('phoneAuthNumber')} />
            <S.ErrorMessage>{errors.phoneAuthNumber?.message}</S.ErrorMessage>
            <S.AuthButton type="button" onClick={checkPhoneAuthNumberButton}>
              인증번호 확인
            </S.AuthButton>
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
          <S.Button type="submit">회원가입</S.Button>
        </S.Form>
      </S.ContainerInner>
    </S.Container>
  );
};

export default SignUp;

const CommonButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const S = {
  Container: styled.div`
    width: 100%;
    padding: 0 16px;
    max-width: 400px;
  `,
  ContainerInner: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h1`
    display: flex;
    justify-content: center;
    padding: 5.5rem;
    font-size: 38px;
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
  Button: styled(CommonButton)`
    background-color: ${COLORS.GREEN[300]};
    color: ${COLORS.GRAY[0]};
  `,
  AuthButton: styled(CommonButton)`
    background-color: ${COLORS.GRAY[0]};
    color: ${COLORS.GREEN[300]};
    border: solid 1px ${COLORS.GREEN[300]};
  `
};
