import { useQuery } from '@tanstack/react-query';
import filterUsers from '../services/filterUsers';

const useFilterUsers = (filters) =>
  useQuery({
    queryKey: ['filterUsers', filters],
    queryFn: () => filterUsers(filters),
  });

export default useFilterUsers;
