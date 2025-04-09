import { useQuery } from '@tanstack/react-query';
import { fetchGender } from '../service/genderService';

const useGender = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['gender'],
    queryFn: fetchGender,
  });

  return { data, isLoading, error };
};

export default useGender;
