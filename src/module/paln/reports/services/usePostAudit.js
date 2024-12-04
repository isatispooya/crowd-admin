import { useMutation } from '@tanstack/react-query';

import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import useGetAudit from './useGetAudit';

const usePostAudit = (trace_code, id) => {
  const { refetch } = useGetAudit(trace_code);
  const accessApi = getCookie('accessApi');
  const postAudit = async (postData) => {
    const formData = new FormData();
    formData.append('file', postData);
    const response = await api.patch(`/api/audit/report/admin/${trace_code}/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

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
