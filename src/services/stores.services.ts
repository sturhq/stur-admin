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
    queryKey: ['store-by-id', storeId],
    queryFn: () => api.get(`/store/${storeId}`),
    enabled: !!storeId,
    refetchOnWindowFocus: true,
  });
};

export const useBlockUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.put(`/user/${userId}/block`),
    onSuccess: () => {
      toast({
        title: 'User Blocked',
        description: 'The user has been blocked successfully.',
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['store-by-id'],
        exact: false,
      });
    },
    onError: error => {
      toast({
        title: 'Error',
        // @ts-expect-error - error is not typed
        description: error.response?.data.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};
