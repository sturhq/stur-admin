import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {api} from './api';
import {toast} from '@/hooks/use-toast';
import {
  ADD_CATEGORY_TYPE,
  ADD_SUBCATEGORY_TYPE,
  PRODUCT_TYPE,
} from './types';

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
    enabled: true,
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

export const usePublishProduct = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post(`/products/${productId}/publish`),
    onSuccess: data => {
      toast({
        title: 'Product published!',
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

export const useUnpublishProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api.patch(`/products/${productId}/status`, {
        status: 'draft',
      }),
    onSuccess: data => {
      toast({
        title: 'Product unpublished!',
        description: data.data.message,
        variant: 'success',
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

export const useAddProductToDraft = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PRODUCT_TYPE) =>
      api.put(
        `/products/draft`,
        data,

        {
          params: {
            productId: id,
          },
        }
      ),
    onSuccess: () => {
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

export const useEditProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PRODUCT_TYPE) => api.put(`/products/${id}`, data),
    onSuccess: data => {
      toast({
        title: 'Product updated!',
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

export const useGetCategories = (
  storeId: string,
  page?: number,
  limit?: number,
  status?: string
) => {
  return useQuery({
    queryKey: ['categories', storeId, page, limit, status],
    queryFn: () =>
      api.get('/categories', {
        params: {
          storeId,
          page,
          limit,
          status,
        },
      }),
    enabled: !!storeId,
    refetchOnWindowFocus: true,
  });
};

export const useAddCategory = (storeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ADD_CATEGORY_TYPE) =>
      api.post('/categories', data, {
        params: {
          storeId,
        },
      }),
    onSuccess: data => {
      toast({
        title: 'Category added!',
        description: data.data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
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

export const useGetSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['sub-categories'],
    queryFn: () => api.get(`/categories/${categoryId}/subcategories`),
    enabled: !!categoryId,
    refetchOnWindowFocus: true,
  });
};

export const useAddSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ADD_SUBCATEGORY_TYPE) =>
      api.post(`/categories/subcategories`, data),
    onSuccess: data => {
      toast({
        title: 'Subcategory added!',
        description: data.data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['sub-categories'],
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

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ADD_CATEGORY_TYPE>;
    }) => api.put(`/categories/${id}`, data),

    onSuccess: data => {
      toast({
        title: 'Category updated!',
        description: data.data.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
        exact: false,
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),

    onSuccess: () => {
      toast({
        title: 'Category deleted!',
        description: 'The category has been removed successfully.',
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
        exact: false,
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

export const useOrderStatistics = (storeId: string) => {
  return useQuery({
    queryKey: ['order-statistics'],
    queryFn: () =>
      api.get('/orders/statistics', {
        params: {
          storeId,
        },
      }),
    enabled: !!storeId,
    refetchOnWindowFocus: true,
  });
};
