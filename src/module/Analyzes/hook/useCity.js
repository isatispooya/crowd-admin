import { useQuery } from '@tanstack/react-query';
import { fetchCity } from '../service/cityService';

const useCity = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['city'],
    queryFn: fetchCity,
  });

  return { data, isLoading, error };
};

export default useCity;
