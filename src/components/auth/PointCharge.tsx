import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from 'src/api/AxiosInstance'
import { getUserProfile } from 'src/api/user/user'
import userStore, { UserProfile } from 'src/store/userStore'
import { COLORS } from 'src/styles/styleConstants'
import { styleFont } from 'src/styles/styleFont'
import { RequestPayParams, RequestPayResponse } from 'src/types/mypage/PointCharge'
import styled from 'styled-components'


const payOption = ["+1만", "+5만", "+10만", "+100만"]

const PointCharge = () => {
  const { profile: user, setProfile } = userStore();
  const [payValue, setPayValue] = useState(0)
  const navigate = useNavigate()

  const pointChargeButton = () => {

    /* 1. 가맹점 식별하기 */
    if (!window.IMP) {
      return;
    }
    const { IMP } = window;
    IMP.init('imp60571512');



    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'kakaopay',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: payValue,                                 // 결제금액
      name: '포인트 충전',                  // 주문명
      buyer_name: `${user!.nickname}`,                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: `${user?.address}`,                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  const callback = async (response: RequestPayResponse) => {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;
    console.log(response)

    if (success) {
      const res = await axiosInstance.put('/home/users/cash', {
        cash: response!.paid_amount
      })
      const paymentPoint = payValue + user!.cash
      const newPoint = {...user,cash:paymentPoint}
      setProfile(newPoint as UserProfile)
      console.log(res)
      toast('결제가 완료되었습니다.')
      navigate('/mypage')
    } else {
      toast('결제금액을 입력해주세요.');
    }
  }

  const payValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    const removedCommaValue = value.replaceAll(",", "")
    setPayValue(priceFormat(removedCommaValue.toLocaleString()))
  }

  const priceFormat = (pay: string) => {
    const numberPay = parseInt(pay)
    if (isNaN(numberPay)) {
      return 0;
    } else if (numberPay >= 10000) {
      return Math.ceil(numberPay / 1000) * 1000
    } else {
      return numberPay
    }


  }

  const easyPointButton = (easyPoint: string) => {
    if (easyPoint === "+1만") {
      setPayValue(payValue + 10000)
    } else if (easyPoint === "+5만") {
      setPayValue(payValue + 50000)
    } else if (easyPoint === "+10만") {
      setPayValue(payValue + 100000)
    } else if (easyPoint === "+100만") {
      setPayValue(payValue + 1000000)
    }
  }


  return (
    <S.Container>
      <S.Title>포인트 충전</S.Title>
      <S.PointBefore>
        <S.PointRow>
          <h2>결제 포인트</h2>
          <S.InputWrap>
            <p><input placeholder='충전금액 입력' value={payValue.toLocaleString()} onChange={payValueHandler} maxLength={9}></input>원</p>
            <S.EasyPointWrap>
              {payOption.map((pay) => {
                return <button key={pay} onClick={() => easyPointButton(pay)}>{pay}</button>
              })}
            </S.EasyPointWrap>
          </S.InputWrap>
        </S.PointRow>
        <S.PointRow>
          <h2>보유 포인트</h2>
          <p>{user?.cash.toLocaleString()}원</p>
        </S.PointRow>

      </S.PointBefore>
      <S.PointAfter>
        <S.PointRow>
          <h2>결제 후 포인트</h2>
          <p>{(payValue + (user?.cash || 0)).toLocaleString()}원</p>
        </S.PointRow>
        <button onClick={pointChargeButton}>결제하기</button>
      </S.PointAfter>
    </S.Container>
  )
}

export default PointCharge

const S = {
  Container: styled.div`
  width: 100%;
  max-width: 400px;
  `,
  Title: styled.h1`
        display: flex;
    justify-content: center;
    padding: 5.5rem;
    font-size: 38px;
  `,
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    white-space: nowrap;
    padding: 0.8rem 0px;
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
  }
`,
  PointRow: styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
  h2 {
    ${styleFont.body1}
  }

  p {
    text-align: right;
    ${styleFont.h1}
  }
  .pointColor {
    color: ${COLORS.GREEN[300]};
  }
`,
  InputWrap: styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  input{
    width: 88%;
    border-radius: 5px;
    ${styleFont.h1};
    border-color :${COLORS.GRAY[400]};
    outline:none;
    text-align: right;
  }
`,
  EasyPointWrap: styled.div`
  display: flex;

  gap: 5px;
  button{
    border: solid 1px ${COLORS.GRAY[400]};
    border-radius: 4px;
    padding: 2px 11px;
  }
`
}