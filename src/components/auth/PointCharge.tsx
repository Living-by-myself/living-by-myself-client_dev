import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from 'src/api/AxiosInstance'
import userStore from 'src/store/userStore'
import { COLORS } from 'src/styles/styleConstants'
import { styleFont } from 'src/styles/styleFont'
import styled from 'styled-components'

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (params: RequestPayParams, callback?: RequestPayResponseCallback) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

const payOption = ["1만","5만","10만","100만"]

const PointCharge = () => {
  const { profile: user } = userStore();
  const [payValue,setPayValue] = useState<number>(0)

  const pointChargeButton = () => {
   
    /* 1. 가맹점 식별하기 */
    if(!window.IMP) {
     return;
    }
     const { IMP } = window;
     IMP.init('imp60571512');
    


    /* 2. 결제 데이터 정의하기 */
    const data:RequestPayParams = {
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
  const callback = async(response:RequestPayResponse) => {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;
    console.log(response)

    if (success) {
      const res = await axiosInstance.put('/home/users/cash',{
       cash : response!.paid_amount
      })
      console.log(res)
      toast('결제가 완료되었습니다.')
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
   // navigate('/mypage/point-charge')
 }

 const payValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
    setPayValue(priceFormat(value))
 }

 const priceFormat = (pay:any) => {

    const numberPay = parseInt(pay,10)
    if(!isNaN(numberPay)){
       return numberPay
    }
    return 0;
    
 }

  return (
    <S.Container>
      <S.Title>포인트 충전</S.Title>
      <S.PointBefore>
      <S.PointRow>
            <h2>결제 포인트</h2>
            <S.InputWrap>
            <input  value={payValue} onChange={payValueHandler}></input><span>원</span>
            {payOption.map((pay)=>{
              return <p>{pay}</p>
            })}
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
            <p>{(payValue)}원</p>
          </S.PointRow>
          <button onClick={pointChargeButton}>결제하기</button>
        </S.PointAfter>
    </S.Container>
  )
}

export default PointCharge

const S = {
  Container:styled.div`
  width: 100%;
  max-width: 400px;
  `,
  Title:styled.h1`
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
  align-items: center;
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
InputWrap:styled.p`
  display: flex;
  gap: 5px;
  justify-content: end;
  align-items: center;
  input{
    width: 80%;
    border-radius: 5px;
    ${styleFont.h1};
    border-color :${COLORS.GRAY[400]};
    outline:none;
    text-align: right;
  }
`
}