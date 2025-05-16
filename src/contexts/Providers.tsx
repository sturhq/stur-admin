import ReactQueryProvider from '@/config/ReactQuery';
import {UserProvider} from './UserContext';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactQueryProvider>
      <UserProvider>{children}</UserProvider>
    </ReactQueryProvider>
  );
}
