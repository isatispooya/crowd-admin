/* eslint-disable no-shadow */
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postTradingCodes } from './api';

const usePostTradingCodes = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['postTradingCodes'],
    mutationFn: (data) => postTradingCodes(data),
    onSuccess: () => {
      toast.success('کد معاملاتی با موفقیت انجام شد');
    },
    onError: (error) => {
      toast.error(`ارور: ${error.message || 'کد معاملاتی با خطا روبه رو شد '}`);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default usePostTradingCodes;
