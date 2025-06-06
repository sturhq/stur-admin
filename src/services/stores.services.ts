import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/services/api.ts';
import {toast} from '@/hooks/use-toast';

export const useGetStores = (
  page?: number,
  limit?: number,
  claimStatus?: 'Claimed' | 'Unclaimed'
) => {
  return useQuery({
    queryKey: ['stores', page, limit, claimStatus],
    queryFn: () =>
      api.get('/user/admin/users-with-stores', {
        params: {
          page,
          limit,
          claimStatus,
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

export const useCreateStore = () => {
  return useMutation({
    mutationFn: (data: {
      storeName: string;
      storeDescription: string;
      phoneNumber: string;
      email: string;
      businessType: string;
      storeLogoUrl: string;
      bannerUrl: string;
    }) => api.post('/store/admin/claimable', data),
    onSuccess: () => {
      toast({title: 'Store created successfully!', variant: 'success'});
    },
    onError: error => {
      toast({
        title: 'Error creating store',
        // @ts-expect-error - error is not typed
        description: error.response?.data.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};

export const useBlockUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.put(`/user/${userId}/block`),
    onSuccess: data => {
      toast({
        description: data.data.message || 'User blocked successfully',
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
export const useEditStore = (storeId: string) => {
  return useMutation({
    mutationFn: (data: {
      storeName: string;
      storeDescription: string;
      phoneNumber: string;
      email: string;
      business_type: string;
      storeLogoUrl: string;
      bannerUrl: string;
    }) => api.put(`/store/${storeId}`, data),
    onSuccess: () => {
      toast({title: 'Store updated!', variant: 'success'});
    },
    onError: error => {
      toast({
        title: 'Error updated store',
        // @ts-expect-error - error is not typed
        description: error.response?.data.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};
