import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getMyGroupBuy } from 'src/api/mypage/mypage';

const MyPageGroupBuyPage = () => {
  const { data, isLoading, isError } = useQuery(['myPageGroupBuy'], getMyGroupBuy);

  return <div>MyPageGroupBuyPage</div>;
};

export default MyPageGroupBuyPage;
