import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const usePlanDetailGet = (id) => {

  const getPlanDetail = async () => {
    const response = await api.get(`/api/plan/admin/${id}/`, {
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['planDetailGet', id],
    queryFn: () => getPlanDetail(id),
  });
  return { data };

};

export default usePlanDetailGet;
