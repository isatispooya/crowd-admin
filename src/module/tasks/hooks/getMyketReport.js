import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useGetMyketReport = () => {
  const getMyketReport = async () => {
    const response = await api.get(`/api/market/report/admin/`, {
    });
    return response.data;
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ['myketReport'],
    queryFn: () => getMyketReport(),
  });

  return { data, isError, isPending };
};

export default useGetMyketReport; 