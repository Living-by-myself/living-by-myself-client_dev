import React, { useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/styles/styleConstants';
import axios from 'axios';
import { styleFont } from 'src/styles/styleFont';
interface LoginUserType {
  username: string;
  password: string;
}

const Login = () => {
  const { register,handleSubmit } = useForm<LoginUserType>();

  const onSubmit: SubmitHandler<LoginUserType> = async (data) => {
    const {username,password} = data;

    try {
      const res = await axios.post('https://tracelover.shop/home/users/login', {
      username,
      password,
    });
    localStorage.setItem("atk",res.data.atk)
    localStorage.setItem("rtk",res.data.rtk)
    } catch (error:any) {
      alert(error.response.data.msg)
    }
    

  };

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.ContainerInner>
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
      <S.socialLoginContainer>
        <h1>SNS 계정으로 간편 로그인/회원가입</h1>
        <div>
          <button><img src='/imgs/kakao.png'/></button>
          <button ><img src='/imgs/google.png'/></button>
        </div>
      </S.socialLoginContainer>
      </S.ContainerInner>
    </S.Container>
  );
};

export default Login;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
  `,
  ContainerInner:styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title:styled.h1`
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
    padding: 2rem 0px;
    gap: 4rem;
    justify-content: center;
    a{
      color: ${COLORS.GRAY[900]};
      text-decoration: none;
      ${styleFont.body1}
    }
  `,
  socialLoginContainer:styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column;
    text-align: center;
    h1{
      color: ${COLORS.GRAY[500]};
    }
    div{
      display: flex;
      justify-content: center;
      gap: 0.4rem;
    }
  `
};
