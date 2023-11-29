import { get } from 'http';
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/api/user/user';
import userStore, { UserProfile } from 'src/store/userStore';

const Dev = () => {
  alert('로그인이 필요합니다.');

  return <Navigate to="/" />;
};

export default Dev;
