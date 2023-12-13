import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import axiosInstance from 'src/api/AxiosInstance';
import { getGroupBuyDetailData } from 'src/api/groupBuy/groupBuy';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';

interface GroupBuyCloseProps {
  id: number;
}

const GroupBuyClose = (id: GroupBuyCloseProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(getGroupBuyDetailData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['groupBuy', id]);
    }
  });
  const closeGroupBuyButton = async () => {
    try {
      const res = await axiosInstance.patch(`/home/group-buying/${id}/close`);
      mutation.mutate(id);

      toast('공동구매 마감 완료');
    } catch (error) {
      console.log('공동 구매 마감 에러 : ', error);
    }
  };
  return <S.GroupBuyButton onClick={closeGroupBuyButton}>마감하기</S.GroupBuyButton>;
};

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

export default GroupBuyClose;
