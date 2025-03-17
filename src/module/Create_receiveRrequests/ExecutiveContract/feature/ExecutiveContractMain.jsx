import React from 'react';
import PropTypes from 'prop-types';
import ExecutiveContract from './ExecutiveContract';
import CompanyConst from './companyConst';
import Guarantor from './guarantor';

const ExecutiveContractMain = ({ data,allData }) => {
  console.log('data', data);
  console.log('allData', allData);
  return (
    <div>
      <ExecutiveContract data={data} />
      <CompanyConst allData={allData} />
      <Guarantor allData={allData} />
    </div>
  );
};

ExecutiveContractMain.propTypes = {
  data: PropTypes.object.isRequired,
  allData: PropTypes.object.isRequired,
};

export default ExecutiveContractMain;
