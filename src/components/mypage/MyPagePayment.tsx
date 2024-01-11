import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from 'src/api/AxiosInstance';
import userStore from 'src/store/userStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';


export const getWonString = (price: number) => price.toLocaleString('ko-KR');

const MyPagePayment = () => {
  const { profile: user } = userStore();
  const navigate = useNavigate()

 

  return (
    <S.Container>
      <S.Inner>
        <S.Label>보유 포인트</S.Label>
        <S.Point>{user?.cash ? getWonString(user.cash) : 0}원</S.Point>
      </S.Inner>
      <S.PointCharging onClick={()=>navigate('/mypage/point-charge',{state:{prevPage:'/mypage'}})}>충전하기</S.PointCharging>
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
