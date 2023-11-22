import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import FindPhoneAuth from './FindPhoneAuth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

interface FindPasswordType {
  username: string;
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

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = new RegExp(PHONENUMBER_REGEX);
  return phoneNumberRegex.test(phoneNumber);
};

const schema = z.object({
  username: z.string().refine(validateEmail, { message: '올바른 이메일을 입력해주세요.' }),
  phoneNumber: z.string().refine(validatePhoneNumber, { message: '올바른 전화번호를 입력해주세요.' }),
  phoneAuthNumber: z
    .string()
    .min(4, { message: '인증번호 4자리를 입력해주세요.' })
    .max(4, { message: '인증번호 4자리를 입력해주세요.' })
});

const FindPassword = () => {
  const { register, getValues, handleSubmit } = useForm<FindPasswordType>();
  // {mode:'onSubmit',resolver:zodResolver(schema)}

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FindPasswordType> = async (data) => {
    const { phoneNumber, phoneAuthNumber } = data;
    console.log(data);
    try {
      const res = await axios.post(`https://tracelover.shop/home/auth/message-code`, {
        phoneNumber,
        code: phoneAuthNumber
      });
      const headers = res.headers;
      const contentType = headers['authorization'];
      console.log('Headers:', headers);
      console.log('Content-Type:', contentType);
      console.log('서브밋 응답', res);
      navigate('/password-reset');
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  axios.interceptors.response.use(
    function (response) {
      console.log('인터셉터', response);
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  const findPasswordButton = async () => {
    const phoneNumber = getValues('phoneNumber');
    console.log('폰실행');
    try {
      const res = await axios.post('https://tracelover.shop/home/auth/message?authentication=find', {
        phoneNumber
      });
      alert('인증번호 발송');
      console.log('폰 응답', res);
    } catch (error: any) {
      console.log('폰에러', error.response.data.msg);
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
            {/* <FindPhoneAuth/> */}
            <label>전화번호</label>
            <input placeholder="휴대폰 번호(-없이 숫자만 입력)" {...register('phoneNumber')} />
            <S.Button type="button" onClick={findPasswordButton}>
              인증번호 받기
            </S.Button>
            <input placeholder="인증번호 입력" {...register('phoneAuthNumber')} />
          </S.FormRow>
          <S.Button type="submit">비밀번호 찾기</S.Button>
        </S.Form>
      </S.ContainerInner>
    </S.Container>
  );
};

export default FindPassword;

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
