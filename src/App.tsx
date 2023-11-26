import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Router from './shared/Router';
import ModalView from './components/modal/ModalView';
import userStore from './store/userStore';
import { getUserProfile } from './api/user/user';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COLORS } from './styles/styleConstants';

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
      <ToastContainer
          style={{
            width: '30rem'
          }}
          toastStyle={{
            backgroundColor: `${COLORS.RED[400]}`,
            color: `${COLORS.GRAY[0]}`,
            minWidth: '12rem',
            maxHeight: '200px',
            marginBottom: '0 10px',
            padding: '0',
            textAlign: 'center',
            borderRadius: '10px',

            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '24px'
          }}
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          // closeOnClick
          limit={1}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          transition={Slide}
          pauseOnHover={false}
        />
      <ModalView />
    </BrowserRouter>
  );
}

export default App;
