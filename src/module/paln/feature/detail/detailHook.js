import { useMutation } from '@tanstack/react-query';
import updateDetails from './updateDetails';

const useUpdatePlanDetail = (traceCode) =>
  useMutation({
    mutationKey: ['updateDetails', traceCode],
    mutationFn: (data) => updateDetails(traceCode, data),
  });

export default useUpdatePlanDetail;
