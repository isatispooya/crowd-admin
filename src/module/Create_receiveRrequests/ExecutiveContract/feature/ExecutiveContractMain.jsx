import React from 'react';
import PropTypes from 'prop-types';
import ExecutiveContract from './ExecutiveContract';
import CompanyConst from './companyConst';
import ProfitLossForecast from './profiLossForecast';
import Assumptions from './assumptions';
import PerformanceForecast from './performanceForecast';
import Checks from './checks';
import Warranty from './warranty';
import GuarantorMain from './gurantorMain';
import BankAccesable from './bank_accesable';

const ExecutiveContractMain = ({ data, allData, refetch }) => (
  <div>
    <ExecutiveContract data={data} refetch={refetch} />
    <CompanyConst allData={allData} refetch={refetch} />
    <GuarantorMain allData={allData} refetch={refetch} />
    <ProfitLossForecast allData={allData} refetch={refetch} />
    <Assumptions allData={allData} refetch={refetch} />
    <PerformanceForecast allData={allData} refetch={refetch} />
    <Checks allData={allData} refetch={refetch} />
    <Warranty allData={allData} refetch={refetch} />
    <BankAccesable allData={allData} refetch={refetch}/>
  </div>
);

ExecutiveContractMain.propTypes = {
  data: PropTypes.object.isRequired,
  allData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ExecutiveContractMain;
