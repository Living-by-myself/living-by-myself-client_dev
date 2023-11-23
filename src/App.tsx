import React, { useCallback, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { BrowserRouter, Route } from 'react-router-dom';
import Router from './shared/Router';
import ModalView from './components/modal/ModalView';
import userStore from './store/userStore';
import { getUserProfile } from './api/user/user';

const queryClient = new QueryClient();

function App() {
  const { isLogged, setProfile, setToken } = userStore();

  const handleProfile = useCallback(async () => {
    const token = localStorage.getItem('atk');
    if (!token) return;
    try {
      const res = await getUserProfile();
      setProfile(res);
      setToken(token);
    } catch (e) {
      console.log(e);
    }
  }, [setProfile]);

  useEffect(() => {
    if (!isLogged) {
      handleProfile();
    }
  }, [isLogged, handleProfile]);

  // useEffect(() => {
  //   if (isLogged) {
  //     handleProfile();
  //   }
  // }, [isLogged, handleProfile]);

  useEffect(() => {}, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Router />
        <ModalView />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
