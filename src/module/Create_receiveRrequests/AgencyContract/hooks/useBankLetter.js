import { useQuery } from '@tanstack/react-query';
import  getBankLetter  from '../service/bankLetter';

const useBankLetter = (uuid) => useQuery({
  queryKey: ['bankLetter', uuid],
  queryFn: () => getBankLetter(uuid),
  enabled: !!uuid && uuid !== 'undefined',
  onError: (error) => {
    console.error('Error fetching bank letter:', error);
  },
});

export default useBankLetter;
