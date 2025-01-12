import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const usePlanGet = (id) => {

  const getPlan = async () => {
    const response = await api.get(`/api/plan/admin/${id}/`, {
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['planGet', id],
    queryFn: () => getPlan(id),
  });
  return { data };
};

export default usePlanGet;
