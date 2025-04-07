import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const createBoardOfDirectors = async (cartId, data) => {
  const response = await api.patch(`/api/update/company/member/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useBoardOfDirectors = (cartId) => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createBoardOfDirectors(cartId, data),
    onSuccess: () => {
      toast.success('اطلاعات با موفقیت ثبت شد');
    },
    onError: () => {
      toast.error('ارسال اطلاعات با خطا مواجه شد');
    },
  });

  return { mutate, data: responseData };
};
