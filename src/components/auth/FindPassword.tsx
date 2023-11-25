import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import FindPhoneAuth from './FindPhoneAuth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { axiosBaseInstance } from 'src/api/AxiosInstance';
import { validateEmail, validatePhoneNumber } from './Validate';
import { findPasswordToken } from 'src/store/userStore';
import { FindPasswordType } from 'src/types/user/types';

const schema = z.object({
  username: z.string().refine(validateEmail, { message: '올바른 이메일을 입력해주세요.' }),
  phoneNumber: z.string().refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
  phoneAuthNumber: z
    .string()
    .min(4, { message: '인증번호 4자리를 입력해주세요.' })
    .max(4, { message: '인증번호 4자리를 입력해주세요.' })
});

const FindPassword = () => {
  const { register, getValues, handleSubmit } = useForm<FindPasswordType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  });
  const { token, setToken } = findPasswordToken();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FindPasswordType> = async (data) => {
    const { phoneNumber, phoneAuthNumber } = data;
    try {
      const res = await axiosBaseInstance.post(`/home/auth/message-code`, {
        phoneNumber,
        code: phoneAuthNumber
      });
      console.log(res)
      setToken(res.headers['authorization']);
      navigate('/password-reset');
    } catch (error: any) {
      alert("인증번호를 확인해주세요.");
    }
  };

  const findPasswordButton = async () => {
    const phoneNumber = getValues('phoneNumber');
    try {
      const res = await axiosBaseInstance.post('/home/auth/message?authentication=find', {
        phoneNumber
      });
      alert('인증번호 발송');
      console.log(res)
    } catch (error) {
      alert("휴대폰 번호가 일치하지 않습니다.")
    }
  };
  return (
    <S.Container>
      <S.Title>비밀번호 찾기</S.Title>
      <S.ContainerInner>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <label>이메일</label>
            <input placeholder="이메일" {...register('username')} />
          </S.FormRow>
          <S.FormRow>
            <label>전화번호</label>
            <input placeholder="휴대폰 번호(-없이 숫자만 입력)" {...register('phoneNumber')} />
            <S.AuthButton type="button" onClick={findPasswordButton}>
              인증번호 받기
            </S.AuthButton>
            <input placeholder="인증번호 입력" {...register('phoneAuthNumber')} />
          </S.FormRow>
          <S.Button type="submit">비밀번호 찾기</S.Button>
        </S.Form>
      </S.ContainerInner>
    </S.Container>
  );
};

export default FindPassword;

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
    max-width: 400px;
  `,
  ContainerInner: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h1`
    display: flex;
    justify-content: center;
    padding: 6rem 0px;
    font-size: 38px;
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
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
