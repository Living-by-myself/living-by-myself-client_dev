import React from 'react';
import styled from 'styled-components';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';
import axiosInstance from 'src/api/AxiosInstance';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from 'src/api/user/user';
import { getGroupBuyDetailData } from 'src/api/groupBuy/groupBuy';
import { getRelativeTimeString } from 'src/utilities/getDate';
import Icon from '../icon/Icon';
import { extractImageUrls } from 'src/utilities/image';

const GroupBuyPay = () => {
  const location = useLocation();
  const id = location.state?.id;

  const { data: user } = useQuery({
    queryKey: ['cash'],
    queryFn: () => getUserProfile()
  });
  console.log(user)
  const { data: pay } = useQuery({
    queryKey: ['GroupBuy', id],
    queryFn: () => getGroupBuyDetailData(id)
  }); 

  const reaminingPoints = user?.cash - pay?.perUserPrice;

  const goupBuyPayButton = async () => {
    try {
      const res = await axiosInstance.post(`/home/group-buying/${id}/application`);
      console.log(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.ContainerInner>
        <h1>공동구매 신청하기</h1>
        <S.ItemContainer>
        <S.PreviewImage src={extractImageUrls(pay?.fileUrls)[0]} width={100} height={100} />
          <S.PreviewInfo>
            <S.Title>{pay?.title}</S.Title>
            <S.AddressTimeBox>
              {pay?.address} · {getRelativeTimeString(pay?.createdAt)}
            </S.AddressTimeBox>
            <S.PreviewSellInfo>
              <S.Price>{pay?.perUserPrice.toLocaleString()}원</S.Price>
              <S.PreviewParticipants>
                <Icon name="users" color={COLORS.GRAY[500]} size={16} />
                {pay?.currentUserCount}/{pay?.maxUser}명
              </S.PreviewParticipants>
            </S.PreviewSellInfo>
          </S.PreviewInfo>
        </S.ItemContainer>
        <S.PointBefore>
          <S.PointRow>
            <h2>보유 포인트</h2>
            <p>{user?.cash.toLocaleString()}원</p>
          </S.PointRow>
          <S.PointRow>
            <h2>결제 포인트</h2>
            <p className="pointColor">{pay?.perUserPrice.toLocaleString()}원</p>
          </S.PointRow>
        </S.PointBefore>
        <S.PointAfter>
          <S.PointRow>
            <h2>결제 후 포인트</h2>
            <p>{reaminingPoints.toLocaleString()}원</p>
          </S.PointRow>
          <button>충전하러 가기</button>
        </S.PointAfter>
      </S.ContainerInner>
      <S.PayButton onClick={goupBuyPayButton}>{pay?.perUserPrice.toLocaleString()}원 결제하기</S.PayButton>
    </S.Container>
  );
};

export default GroupBuyPay;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 400px;
  `,
  ContainerInner: styled.div`
    padding: 80px 10px;
    h1 {
      ${styleFont.h2}
    }
  `,
  ItemContainer: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px 0px 100px 0px;
  `,
  AddressTimeBox: styled.div`
    ${styleFont.body4}
    color: ${COLORS.GRAY[400]};
  `,
  PreviewImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
  `,
  Price: styled.div`
    ${styleFont.h4}
  `,
  PreviewInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  `,
  Title: styled.h1`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    word-break: break-all;
  `,
  PreviewSellInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 9rem;
  `,
  PreviewParticipants: styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    ${styleFont.body3}

    /* margin-top: 0.4rem; */
  gap: 6px;
  `,
  TimeViewBox: styled.div`
    display: flex;
    align-items: center;
    margin-right: auto;
  `,
  Time: styled.p``,
  View: styled.p``,
  PointBefore: styled.div`
    border-bottom: solid 1px #000;
    div {
      margin-bottom: 15px;
    }
  `,
  PointAfter: styled.div`
    div {
      margin: 15px 0px;
    }
    button {
      float: right;
      text-decoration: underline;
    }
  `,
  PointRow: styled.div`
    display: flex;
    justify-content: space-between;
    h2 {
      ${styleFont.body1}
    }
    p {
      ${styleFont.h1}
    }
    .pointColor {
      color: ${COLORS.GREEN[300]};
    }
  `,

  PayButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
  `
};
