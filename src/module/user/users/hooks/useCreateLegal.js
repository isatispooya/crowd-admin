import { useMutation } from '@tanstack/react-query';
import createLegalPerson from '../services/createLegalPerson';

const useCreateLegal = () =>
  useMutation({
    mutationKey: ['createLegalPerson'],
    mutationFn: (data) => createLegalPerson(data),
  });

export default useCreateLegal;
