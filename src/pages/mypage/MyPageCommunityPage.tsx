import React from 'react';
import { getMyCommunity } from 'src/api/mypage/mypage';
import userStore from 'src/store/userStore';
import { Post } from 'src/types/community/types';
import { useQuery } from '@tanstack/react-query';

const MyPageCommunityPage = () => {
  const userId = localStorage.getItem('id');

  const { data, isLoading, isError } = useQuery<Post>(['myPageCommunity'], getMyCommunity);

  return <div></div>;
};

export default MyPageCommunityPage;
