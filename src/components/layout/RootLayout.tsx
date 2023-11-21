import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import WriteHeader from './WriteHeader';

const RootLayout = () => {
  const location = useLocation();
  const HeaderChanger = (location: any) => {
    const pathArr = location.pathname.split('/');
    const pathname = pathArr[pathArr.length - 1];
    console.log(pathname);
    switch (pathname) {
      case 'write':
        return <WriteHeader />;
      case 'edit':
        return <WriteHeader />;
      default:
        return <Header />;
    }
  };

  return (
    <div>
      {HeaderChanger(location)}

      <Outlet />
    </div>
  );
};

export default RootLayout;
