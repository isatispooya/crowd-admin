import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const usePostPic = (trace_code) => {
  const queryClient = useQueryClient();

  const sendPlanPic = async (data) => {
    console.log('34223423',data);
    const response = await api.post(`/api/send/picture/${trace_code}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });    
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (data) => sendPlanPic(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['planPictures', trace_code]);
    },
    onError: (error) => {
      console.error('Error posting picture:', error);
    },
    onMutate: () => {
    },
  });
  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
