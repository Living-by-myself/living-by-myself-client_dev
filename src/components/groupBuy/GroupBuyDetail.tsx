import React, { useEffect, useState } from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled, { css } from 'styled-components';
import Icon from '../icon/Icon';
import { styleFont } from 'src/styles/styleFont';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SwiperImage from './SwiperImage';
import axiosInstance, { axiosBaseInstance } from 'src/api/AxiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGroupBuyDetailData } from 'src/api/groupBuy/groupBuy';
import { getRelativeTimeString } from 'src/utilities/getDate';
import { async } from 'q';
import GroupBuyBookmark from './GroupBuyBookmark';
import { toast } from 'react-toastify';
import { JoinUserType } from 'src/types/groupBuy/types';


const GroupBuyDetail = () => {
  const navigate = useNavigate();
  const paramsId = useParams() as unknown as { id: number };
  const id = Number(paramsId.id);
  const queryClient = useQueryClient();
  const mutation = useMutation(getGroupBuyDetailData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['groupBuy', id]);
    }
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupBuy', id],
    queryFn: () => getGroupBuyDetailData(id)
  });
  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  console.log(data);

  const findBuyUser = data?.users?.find((user: JoinUserType) => {
    return user?.id.toString() === localStorage.getItem('id');
  });
  console.log(findBuyUser);

  const closeGroupBuyButton = async () => {
    try {
      const res = await axiosInstance.patch(`/home/group-buying/${id}/close`);
      mutation.mutate(id);

      toast('공동구매 마감 완료');
    } catch (error) { }
  };

  const cancelGroupBuyButton = async () => {
    try {
      const res = await axiosInstance.delete(`/home/group-buying/${id}/application`);
      mutation.mutate(id);
      console.log('공구 취소', res);
    } catch (error) {
      console.log(error);
    }
  };
  const joinUser = (userLength:number) => {
    if (userLength === 1) {
      return 0
    } else {
      return userLength - 1
    }
  }

  console.log(typeof(data!.users!.length),"데이터 길이")

  const writer = data?.users[joinUser(data!.users!.length as number)];

  console.log(writer,"작성자")

  return (
    <>
      <S.Container>
        <SwiperImage slide={data?.fileUrls} />
        <S.InfoInner>
          <S.UserInfoWrap>
            <S.UserInfoInner>
              <S.UserInfo>
                <p>
                  {writer?.profileImage === null ? <img src='/imgs/basicUserImage.png'></img> : <img src={writer?.profileImage}></img>}
                  
                </p>
                <div>
                  <h1>{writer?.nickname}</h1>
                  <h2>{writer?.address}</h2>
                </div>
              </S.UserInfo>
              <S.UserLevel>Lv. {writer?.level}</S.UserLevel>
            </S.UserInfoInner>
          </S.UserInfoWrap>
          <S.BuyInfoWrap>
            <h1>{data?.title}</h1>
            <S.SaleInfo>
              <h2>판매종료</h2>
              <p>{(data?.perUserPrice / data?.maxUser).toLocaleString()}원</p>
            </S.SaleInfo>
            <S.AddressTime>
              {data?.address}
              <span>· {getRelativeTimeString(data?.createdAt)}</span>
            </S.AddressTime>
            <h2>{data?.description}</h2>
          </S.BuyInfoWrap>
          <S.PreviewParticipants>
            <p>
              제품 링크:
              <span>
                <a target="_blank" href={data?.itemLink} rel="noreferrer">
                  바로가기
                </a>
              </span>
            </p>
            <p>
              참여중인 인원
              <Icon name="users" color={COLORS.GRAY[500]} size={20} />
              {data?.currentUserCount}/{data?.maxUser}명
            </p>
            <S.JoinUserWrap>
              {data?.users?.slice(0, -1).map((joinUser: JoinUserType) => {
                return (
                  <li>
                    <h1>
                      <img src={joinUser.fileUrls}></img>
                    </h1>
                    <h2>{joinUser.nickname}</h2>
                  </li>
                );
              })}
            </S.JoinUserWrap>
          </S.PreviewParticipants>
          <S.BuyMapWrap>
            <h1>장소</h1>
            <div>
              <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '200px' }} level={3}>
                <MapMarker position={{ lat: 33.5563, lng: 126.79581 }} />
              </Map>
            </div>
          </S.BuyMapWrap>
        </S.InfoInner>
        <S.FnWrap>
          <GroupBuyBookmark likeCount={data?.likeCount!} id={id} pickLike={data?.pickLike!} />
          <S.ChatButton>채팅하기</S.ChatButton>
          {writer && data?.currentUserCount === data?.maxUser ? (
            <S.GroupBuyButton onClick={closeGroupBuyButton}>마감하기</S.GroupBuyButton>
          ) : findBuyUser ? (
            <S.GroupBuyButton onClick={cancelGroupBuyButton}>취소하기</S.GroupBuyButton>
          ) : (
            <S.GroupBuyButton onClick={() => navigate(`/group-buy/${id!}/order`, { state: { id } })}>
              공동구매하기
            </S.GroupBuyButton>
          )}
        </S.FnWrap>
      </S.Container>
    </>
  );
};

export default GroupBuyDetail;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
    position: relative;
  `,
  CustomSwiper: styled(Swiper)`
    width: 100%;
    height: 360px;
  `,
  SwiperSlide: styled(SwiperSlide)`
    width: 100%;
    height: 360px;
  `,
  ItemImage: styled.ul`
    width: 100%;
    height: 360px;
    background-color: #004100;
  `,
  InfoInner: styled.div`
    padding: 0px 10px 100px 10px;
  `,
  UserInfoWrap: styled.div``,
  UserInfoInner: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: solid 1px ${COLORS.GRAY[400]};
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    p {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      h1 {
        ${styleFont.body1}
        font-weight: 600;
      }
      h2 {
        ${styleFont.body2}
        color: ${COLORS.GRAY[400]};
      }
    }
  `,
  UserLevel: styled.p`
    ${styleFont.body2}
    font-weight: 600;
  `,
  BuyInfoWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    h1 {
      ${styleFont.body1}
      font-weight: bold;
      margin-top: 15px;
    }
    h2 {
      ${styleFont.body2}
      font-weight: 600;
      letter-spacing: -0.5px;
    }
  `,
  AddressTime: styled.p`
    color: ${COLORS.GRAY[400]};
    ${styleFont.body2}
    margin: -8px 0px 0px 0px;
  `,
  SaleInfo: styled.div`
    display: flex;
    gap: 5px;
    h2 {
      ${styleFont.body1}
      color: ${COLORS.GRAY[400]};
      font-weight: 600;
    }
    p {
      ${styleFont.body1}
      color: ${COLORS.GREEN[300]};
      font-weight: 600;
    }
  `,
  PreviewParticipants: styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    padding: 38px 0px;
    ${styleFont.body2}
    gap: 6px;
    p {
      ${styleFont.body2}
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  JoinUserWrap: styled.div`
    display: flex;
    width: 100%;
    li {
      width: 25%;
    }
    h1 {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
  `,
  BuyMapWrap: styled.div`
    width: 100%;
    h1 {
      ${styleFont.body2}
      font-weight: 600;
      padding-bottom: 8px;
    }
    div {
      border-radius: 16px;
    }
  `,
  FnWrap: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-top: solid 1px ${COLORS.GRAY[500]};
    position: sticky;
    left: 0;
    bottom: 0;
    z-index: 99;
    padding: 10px 10px;
  `,
  GroupBuyButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0.8rem 3.6rem;
    background-color: ${COLORS.GREEN[300]};
    color: ${COLORS.GRAY[0]};
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  `,
  ChatButton: styled.button`
    border: solid 1px ${COLORS.GREEN[300]};
    padding: 0.8rem 1.6rem;
    color: ${COLORS.GREEN[300]};
    border-radius: 6px;
    font-weight: 600;
    font-size: 15px;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  `
};
