import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import {
  PersistQueryClientProvider,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client';

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
});

const persistOptions = {
  persister,
  gcTime: 1000 * 60 * 60 * 12, // 12 hours
  dehydrateOptions: {
    shouldDehydrateQuery: query => {
      return (
        defaultShouldDehydrateQuery(query) && query?.meta?.persist === true
      );
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default ReactQueryProvider;
