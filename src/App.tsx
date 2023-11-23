import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Router from './shared/Router';
import ModalView from './components/modal/ModalView';
import userStore from './store/userStore';
import { getUserProfile } from './api/user/user';

function App() {
  const { isLogged, setProfile, setToken } = userStore();

  const handleProfile = useCallback(async () => {
    const token = localStorage.getItem('atk');
    if (!token) return;
    try {
      const res = await getUserProfile();
      setProfile(res);
      setToken(token);
      localStorage.setItem('id', res.userId);
    } catch (e) {
      console.log(e);
    }
  }, [setProfile]);

  useEffect(() => {
    if (!isLogged) {
      handleProfile();
    }
  }, [isLogged, handleProfile]);

  useEffect(() => {
    if (isLogged) {
      handleProfile();
    }
  }, [isLogged, handleProfile]);

  return (
    <BrowserRouter>
      <Router />
      <ModalView />
    </BrowserRouter>
  );
}

export default App;
