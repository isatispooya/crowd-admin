import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UpdateGuaranty } from './api';
import useGetGuaranty from './useGetGuaranty';

const useUpdateGuaranty = (trace_code) => {
  const { refetch } = useGetGuaranty(trace_code);

  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['UpdateGuaranty', trace_code],
    mutationFn: UpdateGuaranty,
    onSettled: () => {
      refetch();
    },
    onSuccess: () => {
      toast.success('بروزرسانی با موفقیت انجام شد!');
      refetch();
    },
    onError: () => {
      toast.error('خطا در بروزرسانی لطفاً دوباره تلاش کنید.');
    },
  });

  return {
    data,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default useUpdateGuaranty;
