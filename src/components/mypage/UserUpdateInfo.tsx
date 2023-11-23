import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import axios from 'axios';
import axiosInstance from 'src/api/AxiosInstance';

interface UserUpdateType {
  username: string;
  nickname: string;
  address: string;
}

const UserUpdateInfo = () => {
  const { register, handleSubmit } = useForm<UserUpdateType>();

  const onSubmit: SubmitHandler<UserUpdateType> = async (data) => {
    const { address, nickname } = data;
    try {
      const res = await axiosInstance.put('/home/profile', {
        address,
        nickname
      },{
        withCredentials: true,
      },
      );
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <S.Container>
      <S.Title>회원정보 수정</S.Title>
      <S.ContainerInner>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <label>이메일</label>
            <h2>이메일은 변경할 수 없습니다.</h2>
            <input placeholder="이메일" {...register('username')}></input>
          </S.FormRow>
          <S.FormRow>
            <label>닉네임</label>
            <h2>12자 이내의 한글 또는 영문,숫자</h2>
            <input placeholder="닉네임" {...register('nickname')}></input>
          </S.FormRow>
          <S.FormRow>
            <label>주소</label>
            <h2>12자 이내의 한글 또는 영문,숫자</h2>
            <input placeholder="주소" {...register('address')}></input>
          </S.FormRow>
          <S.Button type="submit">수정 완료</S.Button>
        </S.Form>
      </S.ContainerInner>
    </S.Container>
  );
};

export default UserUpdateInfo;

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
    h2 {
      ${styleFont.body2}
      color: ${COLORS.GRAY[500]};
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