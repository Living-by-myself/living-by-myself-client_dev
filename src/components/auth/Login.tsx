import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/styles/styleConstants';
import axios from 'axios';
interface LoginUserType {
  username: string;
  password: string;
}

const Login = () => {
  const { register,handleSubmit } = useForm<LoginUserType>();

  const onSubmit: SubmitHandler<LoginUserType> = async (data) => {
    const {username,password} = data;
    const res = await axios.post('https://tracelover.shop/home/users/login', {
      username,
      password,
    });
    localStorage.setItem("atk",res.data.atk)
    localStorage.setItem("rtk",res.data.rtk)

    console.log("로그인 답",res)
    console.log("atk",res.data.atk)
    console.log("atk",res.data.rtk)

  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormRow>
          <label>이메일</label>
          <input type="email" placeholder="이메일" {...register('username')}></input>
        </S.FormRow>
        <S.FormRow>
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호" {...register('password')}></input>
        </S.FormRow>
        <S.Button>로그인</S.Button>
      </S.Form>
      <S.LinkContainer>
        <Link to="/password-find">비밀번호 찾기</Link>
        <Link to="/signup">회원가입</Link>
      </S.LinkContainer>
    </S.Container>
  );
};

export default Login;

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
    display: flex;
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
  LinkContainer: styled.div`
    display: flex;
    gap: 3rem;
    justify-content: center;
  `
};
