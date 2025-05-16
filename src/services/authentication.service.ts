import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from './api';
import {toast} from '@/hooks/use-toast';
import {CREATEACCOUNT_TYPE} from './types';

export const useLoginEndpoint = () => {
  return useMutation({
    mutationFn: (data: {username: string; password: string}) =>
      api.post('/auth/login', data),
    onSuccess: data => {
      if (data?.status === 205) {
        toast({
          title: 'Email not verified',
          description:
            'A verification OTP has been re-sent to your email to complete you registration',
          variant: 'default',
        });
        window.location.href = '/auth/confirm-email';
      }
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

export const useCreateAccountEndpoint = () => {
  return useMutation({
    mutationFn: (data: CREATEACCOUNT_TYPE) =>
      api.post('/auth/register', data),
    onSuccess: data => {
      toast({
        title: 'Account created!',
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

export const useVerifyTokenEndpoint = (token: string, enabled) => {
  return useQuery({
    queryKey: ['verifyToken', token],
    queryFn: () => api.get(`/auth/verify/${token}`),
    enabled: enabled,
  });
};

export const useResendVerificationEndpoint = () => {
  return useMutation({
    mutationFn: (email: string) =>
      api.put('/auth/resend-verification', {email}),
    onSuccess: data => {
      toast({
        title: 'Verification email sent!',
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

export const useCreatePasswordEndpoint = () => {
  return useMutation({
    mutationFn: (data: {password: string; token: string}) =>
      api.post('/auth/set-password', data),
    onSuccess: data => {
      toast({
        title: 'Password created!',
        description: data.data.message,
        variant: 'success',
      });
      window.localStorage.setItem('userId', data?.data?.data.user._id);
      window.localStorage.setItem('accessToken', data?.data?.data.token);
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

export const useForgotPasswordEndpoint = () => {
  return useMutation({
    mutationFn: (email: string) =>
      api.post('/auth/password-request', {
        email,
        prefixUrl: `${import.meta.env.VITE_APP_URL}/reset-password/reset`,
      }),
    onSuccess: data => {
      toast({
        title: 'Password reset email sent!',
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

export const useResetPasswordEndpoint = () => {
  return useMutation({
    mutationFn: (data: {password: string; token: string}) =>
      api.put('/auth/password-reset', data),
    onSuccess: data => {
      toast({
        title: 'Password reset!',
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

export const useLogoutEndpoint = () => {
  return useMutation({
    mutationFn: () => api.put('/auth/logout'),
    onSuccess: () => {
      window.localStorage.clear();
      window.location.href = '/auth/login';
    },
  });
};
