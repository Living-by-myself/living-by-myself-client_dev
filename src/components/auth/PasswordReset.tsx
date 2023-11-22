import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';

interface PasswordResetType {
  newPassword: string;
  newPasswordCheck: string;
}

const PasswordReset = () => {
  const { register, handleSubmit } = useForm<PasswordResetType>({ mode: 'onSubmit' });

  const navigate = useNavigate()
  const onSubmit: SubmitHandler<PasswordResetType> = async (data) => {
    const { newPassword, newPasswordCheck } = data;
    console.log('서브밋실행');
    try {
      const res = await axios.patch(
        'https://tracelover.shop/home/auth/new-password',
        {
          newPassword,
          newPasswordCheck
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjNAZGV2LmNvbSIsImF1dGgiOiJNRU1CRVIiLCJleHAiOjE3MDA1OTcwNDEsImlhdCI6MTcwMDU5MzQ0MX0.0yjFGUZO4pjmTh6F8KCoGqY3JcAuk3wDT6LGP5mmDF8'
          }
        }
      );
      alert(res.data.msg)
      navigate('/login')
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.Title>비밀번호 재설정</S.Title>
      <S.ContainerInner>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <label>비밀번호</label>
            <h2>영문,숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</h2>
            <input placeholder="비밀번호" {...register('newPassword')}></input>
          </S.FormRow>
          <S.FormRow>
            <label>비밀번호 확인</label>
            <input placeholder="비밀번호 확인" {...register('newPasswordCheck')}></input>
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
