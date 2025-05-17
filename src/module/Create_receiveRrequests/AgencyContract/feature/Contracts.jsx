import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Contracts = ({ data }) => {
  const { agencyContract, initializeStore } = useCompanyInfoStore();

  useEffect(() => {
    if (data) {
      initializeStore(data);
    }
  }, [data, initializeStore]);

  console.log(data, 1212342434);

  const checkPayment =
    data.code_status_payment !== 'success' ||
    !agencyContract.bank_letter_number ||
    !agencyContract.agency_agreement_date;

  const links = [
    { id: 1, title: 'قرارداد عاملیت', path: `/agency/${data?.uuid}`, disabled: checkPayment },
    { id: 3, title: 'نامه بانکی', path: `/bankLetter/?uuid=${data?.uuid}`, disabled: checkPayment },
    {
      id: 4,
      title: 'قرارداد اجرایی',
      path: `/executiveContract/${data?.uuid}`,
      disabled: checkPayment,
    },
    { id: 5, title: 'قرارداد مشارکت', path: `/WarTreaty/${data?.uuid}`, disabled: checkPayment },
  ];

  return (
    <Container maxWidth="md" dir="rtl">
      {links.map((link) => (
        <Button
          key={link.id}
          component={Link}
          to={link.path}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          variant="outlined"
          sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
          disabled={link.disabled}
        >
          {link.title}
        </Button>
      ))}
    </Container>
  );
};

Contracts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Contracts;
