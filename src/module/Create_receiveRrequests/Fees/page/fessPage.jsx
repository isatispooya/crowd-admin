import { Typography, Paper, Box, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { CheckCircle } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import useCompanyInfoStore from '../../store/companyInfo.store';
import { useCreateExecutiveContract } from '../../pages/service';
import Fees from '../feature';
import { useFees } from '../service/BoardOfDirectors';

const FeesPage = ({ data }) => {
  const {
    setActionStatus,
    submitBoardDirectorsForm,
    isLoading,
    updateFeesData,
    submitFeesForm,
    setInvestorRequestIdForFees,
  } = useCompanyInfoStore();

  const { cartId } = useParams();
  const { mutate: submitExecutiveContract } = useCreateExecutiveContract(cartId);
  const { mutate: submitFees } = useFees(cartId);

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const button = [
    {
      id: 'approved',
      label: 'ارسال',
      icon: <CheckCircle />,
    },
  ];
  const handleButtonClick = async (actionType) => {
    setActionStatus(actionType);

    if (cartId) {
      setInvestorRequestIdForFees(cartId);
    }

    const feesFormData = await submitFeesForm();

    if (feesFormData) {

      if (!feesFormData.get('investor_request_id') && cartId) {
        feesFormData.append('investor_request_id', cartId);
      }
      submitFees({ ...Object.fromEntries(feesFormData), investor_request_id: cartId });
    }

    const formData = await submitBoardDirectorsForm();
    if (formData) {
      submitExecutiveContract(formData);
    }
  };

  const handleFeesFormDataChange = (formData) => {
    updateFeesData(formData);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '90%',
        maxWidth: '1000px',
        margin: '2rem auto',
        boxShadow: '0 10px 30px rgba(149, 157, 165, 0.15)',
        borderRadius: '20px',
        padding: '2.5rem',
        background: '#FFFFFF',
        border: `1px solid ${pastelBlue.dark}`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 15px 35px rgba(149, 157, 165, 0.2)',
        },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: pastelBlue.contrastText,
          fontWeight: 700,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '10%',
            width: '80%',
            height: '3px',
            background: `linear-gradient(90deg, ${pastelBlue.main}, ${pastelBlue.contrastText})`,
            borderRadius: '2px',
          },
        }}
      >
        اطلاعات کارمزد ها را وارد کنید
      </Typography>
      <Fees allData={data} onFormDataChange={handleFeesFormDataChange} />

      <Stack spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {button.map((item) => (
            <Button
              sx={{ width: '100%' }}
              key={item.id}
              startIcon={item.icon}
              variant="contained"
              onClick={() => handleButtonClick(item.id)}
              disabled={isLoading}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
};

FeesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FeesPage;
