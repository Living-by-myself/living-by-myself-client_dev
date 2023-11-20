import React from 'react';
import { Outlet } from 'react-router-dom';

const OnlyLoggedRoute = () => {
  return <Outlet />;
};

export default OnlyLoggedRoute;
