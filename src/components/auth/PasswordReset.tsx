import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance, { axiosBaseInstance } from 'src/api/AxiosInstance';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { validatePassword } from './Validate';
import { findPasswordToken } from 'src/store/userStore';
import { PasswordResetType } from 'src/types/user/types';

const schema = z
  .object({
    newPassword: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }).refine(validatePassword, {
      message: '영문, 숫자, 특수문자(!@#$%^&*()_+)를 포함한 8자 이상의 비밀번호를 입력해주세요.'
    }),
    newPasswordCheck: z.string().min(8, { message: '8자리 이상의 비밀번호를 입력해주세요.' }).refine(validatePassword, {
      message: '영문, 숫자, 특수문자(!@#$%^&*()_+)를 포함한 8자 이상의 비밀번호를 입력해주세요.'
    })
  })
  .refine((passwordConfirm) => passwordConfirm.newPassword === passwordConfirm.newPasswordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['newPasswordCheck']
  });

const PasswordReset = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<PasswordResetType>({ mode: 'onSubmit', resolver: zodResolver(schema) });

  const { token, setToken } = findPasswordToken();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordResetType> = async (data) => {
    const { newPassword, newPasswordCheck } = data;
    try {
      const res = await axiosBaseInstance.patch(
        '/home/auth/new-password',
        {
          newPassword,
          newPasswordCheck
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      alert(res.data.msg);
      navigate('/login');
    } catch (error) {}
  };

  return (
    <S.Container>
      <S.Title>비밀번호 재설정</S.Title>
      <S.ContainerInner>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <label>비밀번호</label>
            <h2>영문,숫자,특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.</h2>
            <input placeholder="비밀번호" type="password" {...register('newPassword')}></input>
            <S.ErrorMessage>{errors.newPassword?.message}</S.ErrorMessage>
          </S.FormRow>
          <S.FormRow>
            <label>비밀번호 확인</label>
            <input placeholder="비밀번호 확인" type="password" {...register('newPasswordCheck')}></input>
            <S.ErrorMessage>{errors.newPasswordCheck?.message}</S.ErrorMessage>
          </S.FormRow>
          <S.Button type="submit">비밀번호 변경</S.Button>
        </S.Form>
      </S.ContainerInner>
    </S.Container>
  );
};

export default PasswordReset;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
  `,
  ContainerInner: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h1`
    display: flex;
    justify-content: center;
    padding: 5.5rem 0px;
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
  `,
  ErrorMessage: styled.p`
    color: ${COLORS.RED[300]};
  `
};
