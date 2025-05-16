import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from './api';
import {toast} from '@/hooks/use-toast';
import {STALE} from '@/common/QueryStaleTime';

export const useGetUser = (id: string, isUpdated?: boolean) => {
  const userToken = window.localStorage.getItem('accessToken');
  return useQuery({
    queryKey: ['current-user', isUpdated],
    queryFn: () => api.get(`/user/${id}`),
    refetchOnWindowFocus: true,
    enabled: !!isUpdated || !!userToken || !!id,
    staleTime: STALE.MINUTES.TEN,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: {old_password: string; new_password: string}) =>
      api.put('/user/profile/reset-password', data),
    onSuccess: data => {
      toast({
        title: 'Password changed!',
        description: data.data.message,
        variant: 'success',
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

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: {
      first_name: string;
      last_name: string;
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      business_type: any;
    }) => api.put('/user/profile/update', data),
    onSuccess: data => {
      toast({
        title: 'Profile updated!',
        description: data.data.message,
        variant: 'success',
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
