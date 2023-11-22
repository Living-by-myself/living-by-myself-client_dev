import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import userStore from 'src/store/userStore';

const OnlyLoggedRoute = () => {
  const { isLogged, profile: user } = userStore();
  const token = localStorage.getItem('atk');
  if (isLogged && token) {
    return <Outlet />;
  } else {
    alert('로그인이 필요합니다.');
  }
  return <Navigate to="/" />;
};

export default OnlyLoggedRoute;
