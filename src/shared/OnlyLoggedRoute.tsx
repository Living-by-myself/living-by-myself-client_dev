import { get } from 'http';
import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/api/user/user';
import userStore, { UserProfile } from 'src/store/userStore';

const OnlyLoggedRoute = () => {
  const { isLogged, profile: user, setProfile } = userStore();
  const token = localStorage.getItem('atk');
  // const resetUser = async (data: UserProfile | Promise<any> | PromiseLike<UserProfile>) => {
  // setProfile(await data);
  // };

  // if (!isLogged || token) {
  //   const response = getUserProfile();
  //   resetUser(response);
  // }

  if (token) {
    return <Outlet />;
  } else {
    alert('로그인이 필요합니다.');
  }
  return <Navigate to="/" />;
};

export default OnlyLoggedRoute;
