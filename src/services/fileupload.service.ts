import {useQuery, useMutation} from '@tanstack/react-query';
import api from './api';
import {STALE} from '@/common/QueryStaleTime';
import {toast} from '@/hooks/use-toast';

export const useGetPresignedUrl = (key: number) => {
  const userToken = window.localStorage.getItem('accessToken');
  return useQuery({
    queryKey: ['presigned-url', key],
    queryFn: () => api.get(`/file-upload/presigned-url?key=${key}`),
    retry: 2,
    meta: {
      persist: true,
    },
    refetchOnWindowFocus: true,
    gcTime: STALE.HOURS.TWENTY_FOUR,
    staleTime: STALE.HOURS.TWENTY_FOUR,
    enabled: !!userToken,
  });
};

export const useCloudinaryUpload = (
  url: string,
  apiKey: string,
  timestamp: string,
  signature: string
) => {
  return useMutation({
    mutationFn: async (file: File) => {
      // Create FormData explicitly
      const formData = new FormData();

      // Append required Cloudinary fields
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      // Perform the upload
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // Use FormData directly
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: data => {
      return data;
    },
    onError: error => {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
