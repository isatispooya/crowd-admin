import { useMutation } from '@tanstack/react-query';
import useGetProgress from './useGetPlanProgress';
import { PostProgress } from './get&postProgress';

const usePostProgress = (trace_code, id) => {
  const { refetch } = useGetProgress(trace_code);
  
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostPlanProgress', trace_code, id],
    mutationFn: (postData) => PostProgress(trace_code, id, postData),
    onSettled: () => {
      refetch();
    },
    onError: () => {
      refetch();
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
