import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import userStore from 'src/store/userStore';

const OnlyNotLoggedRoute = () => {
  const { isLogged, profile: user } = userStore();
  const token = localStorage.getItem('atk');
  if (isLogged && token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default OnlyNotLoggedRoute;
