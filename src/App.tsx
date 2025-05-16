import React from 'react';
import RouterComponent from '@/config/Router';
import {BrowserRouter as Router} from 'react-router-dom';
import {NetworkDetector} from './components/organisms/NetworkDetector';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Providers} from '@/contexts/Providers';
import {Toaster} from '@/components/ui/toaster';
import {UserProvider} from '@/contexts/UserContext';

function App() {
  return (
    <Providers>
      <Router>
        <UserProvider>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterComponent />
          <NetworkDetector />
        </UserProvider>
      </Router>
    </Providers>
  );
}

export default App;
