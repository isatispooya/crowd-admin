import { Typography, Paper, TextField, Box, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Cancel, CheckCircle, Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
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

  const [selectedButton, setSelectedButton] = useState(data || null);

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
      label: 'ثبت ',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      id: 'rejected',
      label: 'رد ',
      icon: <Cancel />,
      color: 'error',
    },
    {
      id: 'changed',
      label: ' اصلاح',
      icon: <Edit />,
      color: 'info',
    },
  ];
  const handleButtonClick = async (actionType) => {
    setSelectedButton(actionType);
    setActionStatus(actionType);

    if (cartId) {
      setInvestorRequestIdForFees(cartId);
    }

    const feesFormData = await submitFeesForm();

    if (feesFormData) {
      console.log('Fees form data to be submitted:', feesFormData);

      if (!feesFormData.get('investor_request_id') && cartId) {
        feesFormData.append('investor_request_id', cartId);
      }

      Array.from(feesFormData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          {button.map((item) => (
            <Button
              key={item.id}
              color={item.color}
              startIcon={item.icon}
              variant={selectedButton === item.id ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick(item.id)}
              disabled={isLoading}
              sx={{
                ...(selectedButton === item.id && {
                  boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                  transform: 'scale(1.05)',
                }),
              }}
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
