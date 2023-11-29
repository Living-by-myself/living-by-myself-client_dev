import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getMyGroupBuy } from 'src/api/mypage/mypage';

const MyPageGroupBuyPage = () => {
  const userId = localStorage.getItem('id');
  const { data, isLoading, isError } = useQuery(['myPageGroupBuy'], () => {
    return getMyGroupBuy(userId!);
  });

  return <div>MyPageGroupBuyPage</div>;
};

export default MyPageGroupBuyPage;
