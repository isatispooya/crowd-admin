import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostWarranty = () => {
  const postWarranty = async (data) => {
    const accessApi = getCookie('accessApi');
    const response = await api.post(`/api/warranty/admin/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['postWarranty'],
    mutationFn: postWarranty,
  });

  return { mutate, data, isError, isPending };
};

export default usePostWarranty;
