import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import useGetProgress from './useGetPlanProgress';

const usePostProgress = (trace_code, id) => {
  const accessApi = getCookie('accessApi');
  const { refetch: refreshList } = useGetProgress(trace_code);
  const PostProgress = (postData) => {
    const formData = new FormData();
    formData.append('file', postData);
    const response = api.patch(`/api/progres/report/admin/${trace_code}/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostPlanProgress'],
    mutationFn: PostProgress,
    onSettled: () => {
      refreshList();
    },
    onError: () => {
      refreshList();
    },
  });
  return {
    date,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};
export default usePostProgress;
