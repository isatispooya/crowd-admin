import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import useGetAuditt from './getAudit';

const usePostAuditt = () => {
  const queryClient = useQueryClient();
  const { refetch: refreshList } = useGetAuditt();

  const patchAudit = async (data) => {
    const response = await api.patch(`/api/audit/report/id/admin/`, data, {
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchAudit'],
    mutationFn: patchAudit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit'] });
      refreshList();
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostAuditt;
