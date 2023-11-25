import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoOAuth = () => {
  const location = useLocation();

  const kakaoLoginHandler = async () => {
    const res = await axios.get(`https://tracelover.shop/home/oauth/kakao`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        code: location.search //인가 코드
      }
    });
    console.log(res.data);
    // localStorage.setItem('atk', res.data.atk);
    // localStorage.setItem('rtk', res.data.rtk);
    // navigate('/');
  };

  useEffect(() => {
    if (location.search.includes('code')) {
      kakaoLoginHandler();
    }
  }, []);

  useEffect(() => {
    console.log(location.search);
  }, []);
  return <div>KakaoOAuth</div>;
};

export default KakaoOAuth;
