import PropTypes from 'prop-types';
import ExecutiveContract from '../feateure';

const ExecutiveContractPage = ({ data }) => (
  <div>
    <ExecutiveContract data={data} />
  </div>
);

ExecutiveContractPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExecutiveContractPage;
