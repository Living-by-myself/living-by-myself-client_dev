import React from 'react';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';
import ConfirmButton from '../modal/ConfirmButton';
import axiosInstance from 'src/api/AxiosInstance';
import { toast } from 'react-toastify';
import useGroupBuyMutate from 'src/api/groupBuy/groupBuyMutate';
import { ScrollHidden } from '../modal/HandleScroll';

interface Type {
  id: number;
}

const GroupBuyCancel = ({ id}: Type) => {
  
  const { groupBuyMutation } = useGroupBuyMutate(id);

  
  const cancelGroupBuyButton = async () => {
    ScrollHidden()
    try { 
      if (await ConfirmButton('groupBuyCancle')) {
        await axiosInstance.delete(`/home/group-buying/${id}/application`);
        
        groupBuyMutation.mutate(id);
        toast('공동구매 취소가 완료되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return <S.GroupBuyButton onClick={cancelGroupBuyButton}>취소하기</S.GroupBuyButton>;

};



export default GroupBuyCancel;

const S = {
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
  `
};
