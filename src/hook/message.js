import api from 'src/api/apiClient';



export const sendMessage = async (id, message, sms) => {
  const url = sms ? `/api/message/admin/${id}/?send_sms=true` : `/api/message/admin/${id}/`;
  const response = await api.post(
    url,
    {
      message,
    },
    
  );
  return response.data;
};

export const fetchUserMessage = async (id) => {
  const response = await api.get(`/api/message/admin/${id}/`, {
  });

  
  return response.data;
};
