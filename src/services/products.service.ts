import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {api} from './api';
import {toast} from '@/hooks/use-toast';

export const useGetProducts = (
  page: number,
  limit: number,
  storeId?: string,
  status?: string,
  category?: string
) => {
  return useQuery({
    queryKey: ['products', page, limit, storeId, status, category],
    queryFn: () =>
      api.get('/products/admin/products', {
        params: {
          page,
          limit,
          storeId,
          status,
          category,
        },
      }),
    refetchOnWindowFocus: true,
    enabled: !!storeId,
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

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const {data} = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: true,
  });
};

export const useDeleteProduct = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete(`/products/${productId}`),
    onSuccess: data => {
      toast({
        title: 'Product deleted!',
        description: data.data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['current-user'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['products'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['products-statistics'],
      });
    },
    onError: error => {
      toast({
        title: 'An error occurred',
        description:
          // @ts-expect-error - error is a response object
          error?.response?.data?.message ||
          error?.message ||
          'An error occurred',
        variant: 'destructive',
      });
    },
  });
};
