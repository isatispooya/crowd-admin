import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useGetWarranty = () => {
  const getWarranty = async () => {
    const accessApi = getCookie('accessApi');
    const response = await api.get(`/api/warranty/list/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };
  const { data, isError, isPending } = useQuery({
    queryKey: ['warranty'],
    queryFn: () => getWarranty(),
  });

  return { data, isError, isPending };
};
export default useGetWarranty;
