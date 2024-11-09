import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { setCookie } from 'src/api/cookie';
import { LogOut } from './logout';

const usePostLogOut = () => {
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['logOut'],
    mutationFn: () => LogOut(),
    onSettled: () => {
      setCookie('sym', '', { expires: new Date(0), path: '/' });
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      router.push('/login');
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostLogOut;
