import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import WriteHeader from './WriteHeader';

const RootLayout = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/community/write' ? <WriteHeader /> : <Header />}

      <Outlet />
    </div>
  );
};

export default RootLayout;
