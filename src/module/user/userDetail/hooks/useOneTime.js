import { useMutation } from '@tanstack/react-query';
import { oneTimeLogin } from '../service/oneTimeLogin';

const useOneTimeLogin = () =>
  useMutation({
    mutationKey: ['oneTimeLogin'],
    mutationFn: (data) => oneTimeLogin(data),
    onSettled: (response) => {
      const uuid = response?.uuid;

      window.open(`http://app.isatiscrowd.ir/onetimelogin/${uuid}`, '_blank');
    },
  });

export default useOneTimeLogin;
