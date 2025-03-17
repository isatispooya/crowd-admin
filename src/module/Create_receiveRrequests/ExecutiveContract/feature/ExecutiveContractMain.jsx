import React from 'react';
import PropTypes from 'prop-types';
import ExecutiveContract from './ExecutiveContract';
import CompanyConst from './companyConst';
import Guarantor from './guarantor';
import ProfitLossForecast from './profiLossForecast';
import Assumptions from './assumptions';
import PerformanceForecast from './performanceForecast';
import Checks from './checks';
import Warranty from './warranty';

const ExecutiveContractMain = ({ data, allData }) => {
  console.log('data', data);
  console.log('allData', allData);
  return (
    <div>
      <ExecutiveContract data={data} />
      <CompanyConst allData={allData} />
      <Guarantor allData={allData} />
      <ProfitLossForecast allData={allData} />
      <Assumptions allData={allData} />
      <PerformanceForecast allData={allData} />
      <Checks allData={allData} />
      <Warranty allData={allData} />
    </div>
  );
};

ExecutiveContractMain.propTypes = {
  data: PropTypes.object.isRequired,
  allData: PropTypes.object.isRequired,
};

export default ExecutiveContractMain;
