import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import useGetWarranty from './getWarranty';

const usePostWarranty = () => {
  const queryClient = useQueryClient();
  const { refetch: refreshList } = useGetWarranty();

  const patchWarranty = async (data) => {
    const response = await api.patch(`/api/warranty/admin/`, data, {
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchWarranty'],
    mutationFn: patchWarranty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warranty'] });
      refreshList();
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostWarranty;
