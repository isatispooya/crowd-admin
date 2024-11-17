/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetParticipationsTable from 'src/module/paln/service/participantcertifit/usePostparticipant';

const ParticipentAccrdion = ({ form }) => {
  const { trace_code } = useParams();
  const { data, isError, isSuccess } = useGetParticipationsTable(trace_code);

  const handleSend = () => {
    
  };

  console.log(data)

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleSend} className="bg-blue-700 py-2 px-3 rounded-md text-white">fgjh</button>
    </div>
  );
};

export default ParticipentAccrdion;
