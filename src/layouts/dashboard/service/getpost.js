import { useMutation } from '@tanstack/react-query';
import { LogOut } from './logout';

const usePostLogOut = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['logOut'],
    mutationFn: () => LogOut(),
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostLogOut;
