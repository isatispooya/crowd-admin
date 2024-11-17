import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';
import { useQuery } from '@tanstack/react-query';

const useGetParticipationsTable = (trace_code) => {
  const accessApi = getCookie('accessApi');

  const getTable = async () => {
    const response = await api.get(
      `/api/send/participation/certificate/farabours/admin/${trace_code}/`,

      {
        headers: {
          Authorization: `Bearer ${accessApi}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['getTable'],
    queryFn: () => getTable(),
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetParticipationsTable;
