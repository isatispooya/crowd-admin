import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import useGetProgressReport from './getProgressReport';

const usePostProgresss = () => {
  const accessApi = getCookie('accessApi');
  const queryClient = useQueryClient();
  const { refetch: refreshList } = useGetProgressReport();

  const patchProgresss = async (data) => {
    const response = await api.patch(`/api/progres/report/id/admin/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchProgresss'],
    mutationFn: patchProgresss,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      refreshList();
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostProgresss;
