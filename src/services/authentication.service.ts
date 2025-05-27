import {useMutation} from '@tanstack/react-query';
import {api} from './api';
import {toast} from '@/hooks/use-toast';

export const useLoginEndpoint = () => {
  return useMutation({
    mutationFn: (data: {username: string; password: string}) =>
      api.post('/auth/admin/login', data),

    onSuccess: data => {
      window.localStorage.setItem('accessToken', data?.data?.data.token);
      window.localStorage.setItem('userId', data?.data?.data.user._id);
    },
    onError: error => {
      console.log('err', error);
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

export const useLogoutEndpoint = () => {
  return useMutation({
    mutationFn: () => api.put('/auth/logout'),
    onSuccess: () => {
      window.localStorage.clear();
      window.location.href = '/auth/login';
    },
  });
};
