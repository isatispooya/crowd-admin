import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import useGetProgress from './useGetPlanProgress';

const usePostProgress = (trace_code, id) => {
  const { refetch: refreshList } = useGetProgress(trace_code);
  const PostProgress = (postData) => {
    const formData = new FormData();
    formData.append('file', postData);
    const response = api.patch(`/api/progres/report/admin/${trace_code}/${id}/`, formData, {
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
