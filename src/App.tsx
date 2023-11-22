import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { BrowserRouter, Route } from 'react-router-dom';
import Router from './shared/Router';
import ModalView from './components/modal/ModalView';

const queryClient = new QueryClient();

function App() {
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
