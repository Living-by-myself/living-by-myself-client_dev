import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoOAuth = () => {
  const location = useLocation();

  const kakaoLoginHandler = async () => {
    const res = await axios.get(`https://tracelover.shop/home/oauth/kakao${location.search}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  };

  useEffect(() => {
    if (location.search.includes('code')) {
      kakaoLoginHandler();
    }
  }, []);

  useEffect(() => {}, []);
  return <div>KakaoOAuth</div>;
};

export default KakaoOAuth;
