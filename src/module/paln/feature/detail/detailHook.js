import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateDetails from './updateDetails';

const useUpdatePlanDetail = (traceCode) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateDetails', traceCode],
    mutationFn: (data) => updateDetails(traceCode, data),
    onSuccess: () => {
      // Invalidate and refetch the plan detail query
      queryClient.invalidateQueries(['planDetail', traceCode]);
      // Invalidate the picture query if it exists
      queryClient.invalidateQueries(['planPicture', traceCode]);
    },
  });
};

export default useUpdatePlanDetail;
