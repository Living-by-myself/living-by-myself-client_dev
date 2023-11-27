import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from 'src/api/AxiosInstance';
import userStore from 'src/store/userStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';




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

export const getWonString = (price: number) => price.toLocaleString('ko-KR');

const MyPagePayment = () => {
  const { profile: user } = userStore();
  console.log(user)

  const navigate = useNavigate()

  const pointChargeButton = () => {
     /* 1. 가맹점 식별하기 */
     if(!window.IMP) {
      alert("오류")
      return;
     }
      const { IMP } = window;
      IMP.init('imp60571512');
     

 
     /* 2. 결제 데이터 정의하기 */
     const data:RequestPayParams = {
       pg: 'kakaopay',                           // PG사
       pay_method: 'card',                           // 결제수단
       merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
       amount: 300000,                                 // 결제금액
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

  return (
    <S.Container>
      <S.Inner>
        <S.Label>보유 포인트</S.Label>
        <S.Point>{user?.cash ? getWonString(user.cash) : 0}원</S.Point>
      </S.Inner>
      <S.PointCharging onClick={pointChargeButton}>충전하기</S.PointCharging>
    </S.Container>
  );
};

export default MyPagePayment;

const S = {
  Container: styled.div`
    padding: 10px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    border-radius: 10px;
    border: 1px solid ${COLORS.GRAY[200]};
  `,
  Inner: styled.div``,
  Label: styled.p`
    margin-bottom: 8px;
    ${styleFont.body4}

    color: ${COLORS.GRAY[400]};
  `,
  Point: styled.p`
    ${styleFont.h1}
    color: ${COLORS.GREEN[400]};
  `,
  PointCharging: styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    color: ${COLORS.GRAY[400]};
  `
};
