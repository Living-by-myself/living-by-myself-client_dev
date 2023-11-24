import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import axiosInstance from 'src/api/AxiosInstance';
import Postcode from './Postcode';
import userStore from 'src/store/userStore';

interface UserUpdateType {
  username: string;
  nickname: string;
  address: string;
  userAddress: string;
}

const UserUpdateInfo = () => {
  const { register, handleSubmit, watch, setValue } = useForm<UserUpdateType>();

  // const [address, setAddress] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const { profile, setProfile } = userStore();

  const completeHandler = (data: any) => {
    const userAddress = `${data.sigungu} ${data.bname}, ${data.bcode}`;
    setValue('address', data.roadAddress);
    setValue('userAddress', userAddress);
    // setAddress(data.roadAddress);
  };

  const onSubmit: SubmitHandler<UserUpdateType> = async (data) => {
    const { nickname, userAddress } = data;
    console.log(userAddress);
    try {
      await axiosInstance.put('/home/profile', {
        address: userAddress,
        nickname
      });
      profile!.address = userAddress as string;
      profile!.nickname = nickname as string;
      setProfile(profile!);
    } catch (error) {
      console.log(error);
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
            {/* <input placeholder="주소" {...register('address')}></input>
            <Postcode/> */}
            <S.FormColumn>
              <input value={watch('address')} readOnly placeholder="주소"></input>
              <S.Button type="button" onClick={() => setIsToggle((e) => !e)}>
                주소찾기
              </S.Button>
            </S.FormColumn>
            {isToggle && <DaumPostcode onComplete={completeHandler} />}

            {/* <input placeholder="상세주소" {...register('detailAddress')}></input> */}
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
  FormColumn: styled.div`
    display: flex;
    gap: 9px;
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
