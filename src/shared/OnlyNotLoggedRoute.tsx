import React from 'react';
import { Outlet } from 'react-router-dom';

const OnlyNotLoggedRoute = () => {
  return <Outlet />;
};

export default OnlyNotLoggedRoute;
