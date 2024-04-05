import React from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
import { NotificationProvider } from './utils/useNotification';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
