import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/services/api.ts';
import {toast} from '@/hooks/use-toast';

export const useGetStores = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['stores', page, limit],
    queryFn: () =>
      api.get('/user/admin/users-with-stores', {
        params: {
          page,
          limit,
        },
      }),
    refetchOnWindowFocus: true,
    select: data => {
      return {
        data: data.data.data,
        pagination: {
          totalPages: data.data.pagination.totalPages,
          hasNextPage: data.data.pagination.hasNextPage,
          hasPrevPage: data.data.pagination.hasPrevPage,
        },
        statistics: data.data.statistics,
      };
    },
  });
};

export const useGetStoreById = (storeId: string) => {
  return useQuery({
    queryKey: ['store', storeId],
    queryFn: () => api.get(`/store/${storeId}`),
    enabled: !!storeId,
    refetchOnWindowFocus: true,
  });
};
