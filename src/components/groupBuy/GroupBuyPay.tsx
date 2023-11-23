import React from 'react';
import GroupBuyPostCard from './GroupBuyPostCard';
import styled from 'styled-components';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';

const GroupBuyPay = () => {
  return (
    <S.Container>
      <S.ContainerInner>
        <h1>공동구매 신청하기</h1>
        {/* <GroupBuyPostCard/> */}
        <div>
          <S.PointRow>
            <h2>보유 포인트</h2>
            <p>1,000,000원</p>
          </S.PointRow>
          <S.PointRow>
            <h2>결제 포인트</h2>
            <p>1,000,000원</p>
          </S.PointRow>
        </div>
        <div>
          <S.PointRow>
            <h2>결제 후 포인트</h2>
            <p>100,000원</p>
          </S.PointRow>
          <button>충전하러 가기</button>
        </div>
      </S.ContainerInner>
      <S.PayButton>900,000원 결제하기</S.PayButton>
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
  `,


PayButton: styled.button`
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
};
