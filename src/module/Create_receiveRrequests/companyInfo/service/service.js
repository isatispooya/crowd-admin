import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

export const getComanyInfo = async (cartId) => {
  const response = await api.get(`/api/investor/request/${cartId}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const useGetCompanyInfo = (cartId) => {
  const { data: responseData } = useQuery({
    queryKey: ['companyInfo', cartId],
    queryFn: () => getComanyInfo(cartId),
  });

  return { data: responseData };
};

export default useGetCompanyInfo;
