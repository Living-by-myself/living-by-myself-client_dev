import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getKakaoLoginToken } from 'src/api/user/user';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const { isError, isLoading } = useQuery(
  //   ['kakaoLogin'],
  //   async () => {
  //     getKakaoLoginToken(location.search);
  //   },
  //   { enabled: location.search.includes('code') }
  // );

  // const kakaoLoginHandler = async () => {
  //   const res = await axios.get(`https://tracelover.shop/home/oauth/kakao`, {
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     params: {
  //       code: location.search //인가 코드
  //     }
  //   });
  //   console.log(res.data);
  //   // localStorage.setItem('atk', res.data.atk);
  //   // localStorage.setItem('rtk', res.data.rtk);
  //   // navigate('/');
  // };

  // useEffect(() => {
  //   if (location.search.includes('code')) {
  //     kakaoLoginHandler();
  //   }
  // }, []);

  return <div>HomePage</div>;
};

export default HomePage;
