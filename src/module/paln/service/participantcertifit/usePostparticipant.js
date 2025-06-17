import api from 'src/api/apiClient';
import { useMutation, useQuery } from '@tanstack/react-query';

const useGetParticipationsTable = (trace_code) => {
  const getTable = async () => {
    const response = await api.get(
      `/api/send/participation/certificate/farabours/admin/${trace_code}/`
    );
    return response.data;
  };

  const postParticipant = async ({ data, traceCode }) => {
    const response = await api.post(
      `/api/send/participation/certificate/farabours/admin/${traceCode}/`,
      { data }
    );
    return response.data;
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['getTable'],
    queryFn: () => getTable(),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['postParticipant'],
    mutationFn: (params) => postParticipant(params),
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    mutate,
    isPending,
  };
};

export default useGetParticipationsTable;
