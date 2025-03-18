import { useQuery } from '@tanstack/react-query';
import getAgencyContract from '../service/agencyContract';

const useAgencyContract = (uuid) => 
  useQuery({
    queryKey: ['agencyContract', uuid],
    queryFn: () => getAgencyContract(uuid),
    enabled: !!uuid && uuid !== 'undefined',
    onError: (error) => {
      console.error('Error fetching agency contract:', error);
    },
  });

export default useAgencyContract;
