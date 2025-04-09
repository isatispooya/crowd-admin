import { useQuery } from '@tanstack/react-query';
import { fetchAge } from '../service/ageService';

const useAge = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['age'],
    queryFn: fetchAge,
  });

  return { data, isLoading, error };
};

export default useAge;
