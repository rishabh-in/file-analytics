import React from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
