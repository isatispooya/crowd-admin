import api from 'src/api/apiClient';


export const sendMessage = async (cardSelected, message, sendStatus) => {
  const url = `/api/message/admin/${cardSelected}/`;
  const response = await api.post(
    url,
    {
      message,
      send_sms: sendStatus,
    },
  );
  return response.data;
};

export const fetchUserMessage = async (cardSelected) => {
  const response = await api.get(`/api/message/admin/${cardSelected}/`, {
  });  
  return response.data;
};
