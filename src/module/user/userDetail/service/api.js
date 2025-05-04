import api from 'src/api/apiClient';


export const getUserDetail = async (userId) => {

  const response = await api.get(`/api/information/user/admin/${userId}/`);


  return response.data.success;
};

export const postOtpUser = async (nationalCode) => {
  const response = await api.post(
    `/api/otp/update/`,

    {uniqueIdentifier:nationalCode},

  );
  return response;
};
export const updateUser = async (data) => {

  const response = await api.patch(
    `/api/update/profile/`,
     data ,
  );


  return response;
};


export const postTradingCodes = async (data) => {
  
  const response = await api.post(`/api/add/trading/code/admin/`, data);

  return response.data.success;
};
