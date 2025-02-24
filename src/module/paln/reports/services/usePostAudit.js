import { useMutation } from '@tanstack/react-query';

import api from 'src/api/apiClient';
import useGetAudit from './useGetAudit';

const usePostAudit = (trace_code, id) => {
  const { refetch } = useGetAudit(trace_code);

  const postAudit = (file) =>
    api
      .patch(`/api/audit/report/admin/${trace_code}/${id}/`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);

  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostAudit'],
    mutationFn: postAudit,
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

export default usePostAudit;
