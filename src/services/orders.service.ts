import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/services/api.ts';
import {toast} from '@/hooks/use-toast';
import {ORDER_EDIT_TYPE, ORDER_TYPE} from './types';
import {STALE} from '@/common/QueryStaleTime';

export const useGetOrders = (
  storeId: string,
  page?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ['orders', storeId, page, limit],
    queryFn: () =>
      api.get('/orders', {
        params: {
          storeId,
          page,
          limit,
        },
      }),
    enabled: !!storeId,
    refetchOnWindowFocus: true,
  });
};

export const usePostOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['post-order'],
    mutationFn: (data: ORDER_TYPE) => api.post('/orders', data),
    onSuccess: () => {
      toast({
        title: 'Order Placed',
        description: 'Your order has been placed successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['orders'], exact: false});
    },
    onError: error => {
      toast({
        title: 'Error',
        // @ts-expect-error - error is not typed
        description: error.response?.data.message || 'An error occurred',
        variant: 'destructive',
      });
    },
    gcTime: STALE.HOURS.ONE,
    meta: {
      persist: true,
    },
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => api.get(`/orders/${orderId}`),
    enabled: !!orderId,
  });
};

export const useEditOrder = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-order', orderId],
    mutationFn: (data: ORDER_EDIT_TYPE) =>
      api.put(`/orders/${orderId}`, data),
    onSuccess: () => {
      toast({
        title: 'Order Updated',
        description: 'Your order has been updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['orders'], exact: false});
      queryClient.invalidateQueries({queryKey: ['order'], exact: false});
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

export const useSendToWhatsapp = (orderId: string) => {
  return useMutation({
    mutationKey: ['send-to-whatsapp'],
    mutationFn: () => api.post(`/orders/whatsapp-message/${orderId}`),
    onSuccess: () => {
      toast({
        title: 'Receipt sent to your Whatsapp',
        description: 'Your order receipt has been sent to your whatsapp',
        variant: 'success',
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

export const useUpdateOrderStatus = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-order-status', orderId],
    mutationFn: (data: {status: string}) =>
      api.put(`/orders/${orderId}/status`, data),
    onSuccess: () => {
      toast({
        title: 'Order Status Updated',
        description: 'Order status has been updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['orders'], exact: false});
      queryClient.invalidateQueries({queryKey: ['order'], exact: false});
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

export const useUpdateOrderPaymentStatus = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-order-payment-status', orderId],
    mutationFn: (data: {paymentStatus: string}) =>
      api.put(`/orders/${orderId}/payment-status`, data),
    onSuccess: () => {
      toast({
        title: 'Order Payment Status Updated',
        description: 'Order payment status has been updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['orders'], exact: false});
      queryClient.invalidateQueries({queryKey: ['order'], exact: false});
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

export const useUpdateDeliveryStatus = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-delivery-status', orderId],
    mutationFn: (data: {deliveryStatus: string}) =>
      api.put(`/orders/${orderId}/delivery-status`, data),
    onSuccess: () => {
      toast({
        title: 'Order Delivery Status Updated',
        description: 'Order delivery status has been updated successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['orders'], exact: false});
      queryClient.invalidateQueries({queryKey: ['order'], exact: false});
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

export const useGetDeliveryAreas = (storeId: string) => {
  return useQuery({
    queryKey: ['delivery-areas', storeId],
    queryFn: () => api.get(`/delivery-area/${storeId}/delivery-areas`),
    enabled: !!storeId,
  });
};
