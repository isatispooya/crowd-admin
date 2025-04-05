import React from 'react';
import { PropTypes } from 'prop-types';

const Page13 = ({ data }) => {
  if (!data) return null;
  console.log(data);

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] space-y-6">



      </div>
    </div>
  );
};

Page13.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Page13;
