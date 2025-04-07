import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['companyInfo', cartId],
    queryFn: () => getComanyInfo(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo', cartId]);
    },
  });
};

export const useCreateExecutiveContract = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);

  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createExecutiveContract(cartId, data),
    onSuccess: () => {
      refetchGet();
      toast.success('اطلاعات با موفقیت ثبت شد');
    },
    onError: () => {
      toast.error('ارسال اطلاعات با خطا مواجه شد');
    },
  });

  return { mutate, data: responseData, refetch };
};
