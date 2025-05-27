import {useQuery} from '@tanstack/react-query';
import api from './api';
import {TRANSACTION_SOURCE, TRANSACTION_TYPES} from './types';

export const useGetTransactions = (
  page: number,
  limit: number,
  storeId?: string,
  type?: TRANSACTION_TYPES,
  source?: TRANSACTION_SOURCE
) => {
  return useQuery({
    queryFn: () =>
      api.get('/transaction', {
        params: {
          page,
          limit,
          storeId,
          type,
          source,
        },
      }),
    queryKey: ['transactions', page, limit, storeId, type, source],
    refetchOnWindowFocus: true,
    enabled: !!storeId,
  });
};

export const useGetTransactionStatistics = (storeId?: string) => {
  return useQuery({
    queryFn: () =>
      api.get('/transaction/statistics', {
        params: {
          storeId,
        },
      }),
    queryKey: ['transaction-stats'],
    refetchOnWindowFocus: true,
    enabled: !!storeId,
  });
};

export const useGetSettlement = (
  page: number,
  limit: number,
  storeId?: string
) => {
  return useQuery({
    queryFn: () =>
      api.get('/settlement', {
        params: {
          storeId,
        },
      }),
    queryKey: ['settlement', page, limit, storeId],
    refetchOnWindowFocus: true,
    enabled: !!storeId,
  });
};
