import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useGetWarranty = () => {
  const getWarranty = async () => {
    const response = await api.get(`/api/warranty/list/admin/`, {
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
