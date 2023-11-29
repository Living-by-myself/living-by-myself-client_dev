import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { COLORS } from 'src/styles/styleConstants';
import axios from 'axios';
import { styleFont } from 'src/styles/styleFont';
import { getKakaoLoginToken, getUserProfile, loginWithEmailPassword } from 'src/api/user/user';
import userStore from 'src/store/userStore';
import { axiosBaseInstance } from 'src/api/AxiosInstance';
import { toast } from 'react-toastify';

export interface LoginUserType {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginUserType>();
  const { setProfile, setToken } = userStore();
  const [popup, setPopup] = useState<Window | null>();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<LoginUserType> = async (data) => {
    // 패스워드랑 이메일로 로그인하고 토큰값을 세팅하고 유저 정보를 가져오는 함수
    const tokenData = loginWithEmailPassword(data);
    setToken(await tokenData.then((res) => res?.atk));
    const userData = getUserProfile();
    setProfile(await userData);
  };

  //주소로 이동해서 해당 인가코드를 백엔드에 보내주면 response로 atk와rtk 데이터가 들어옴 안됨
  const kakaoLoginHandler = async () => {
    toast('소셜로그인 기능은 준비중입니다.');
    // const key = process.env.REACT_APP_KAKAO_ADMIN_KEY;
    // const uri = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;

    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${key}&redirect_uri=${uri}&response_type=code`;
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
            <button>
              <a onClick={kakaoLoginHandler}>
                <img src="/imgs/kakao.png" />
              </a>
            </button>
            <button onClick={kakaoLoginHandler}>
              {/* <Link to="https://accounts.google.com/o/oauth2/v2/auth?client_id=480627412963-2kv4rhdck7u0svv6urq7req1ro0jq8hv.apps.googleusercontent.com&redirect_uri=https://tracelover.shop/home/oauth/login/oauth2/code/google&response_type=code&scope=profile"> */}
              <img src="/imgs/google.png" />
              {/* </Link> */}
            </button>
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
    a {
      color: ${COLORS.GRAY[900]};
      text-decoration: none;
      ${styleFont.body1}
    }
  `,
  socialLoginContainer: styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column;
    text-align: center;
    h1 {
      color: ${COLORS.GRAY[500]};
    }
    div {
      display: flex;
      justify-content: center;
      gap: 0.4rem;
    }
  `
};
