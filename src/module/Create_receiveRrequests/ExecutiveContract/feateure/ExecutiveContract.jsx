import PropTypes from 'prop-types';

const ExecutiveContract = ({ data }) => {
  console.log(data);
  return <div>ExecutiveContract</div>;
};

ExecutiveContract.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExecutiveContract;
