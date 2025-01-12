import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';


const GetParticipant = async (id) => {
  if (!id) return null;
  const response = await api.get(`api/bank/reciept/payment/admin/${id}/`, {
  });

  return response.data;
};

const useGetReciept = (id) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['reciept', id],
    queryFn: () => GetParticipant(id),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetReciept;
