import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';

export const getComanyInfo = async (cartId) => {
  const response = await api.get(`/api/investor/request/${cartId}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const createExecutiveContract = async (cartId, data) => {
  const response = await api.patch(`/api/update/investor/request/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useGetCompanyInfo = (cartId) => {
  const { data: responseData, refetch } = useQuery({
    queryKey: ['companyInfo', cartId],
    queryFn: () => getComanyInfo(cartId),
    onSuccess: () => {
      refetch();
    },
  });

  return { data: responseData, refetch };
};

export const useCreateExecutiveContract = (cartId) => {
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createExecutiveContract(cartId, data),
    onSuccess: () => {
      refetch();
      toast.success('اطلاعات با موفقیت ثبت شد');
    },
  });

  return { mutate, data: responseData, refetch };
};
