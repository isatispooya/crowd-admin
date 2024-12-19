import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

export const useGetPlans = () => {

  const getPlans = async () => {
    const response = await api.get(`/api/plans/`, {
    });
    return response.data;
  };

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    staleTime: 1000 * 20, 
    cacheTime: 1000 * 60 * 10,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchInterval: 20000, 
  });

  return { data, isLoading, error, isError, refetch };
};
