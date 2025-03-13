import { Typography, Paper, TextField, Box, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Cancel, CheckCircle, Edit } from '@mui/icons-material';
import AgencyContract from '../feature';
import useCompanyInfoStore from '../../store/companyInfo.store';
import { useParams } from 'react-router-dom';
import { useCreateExecutiveContract } from '../../pages/service';

const AgencyContractPage = ({ data }) => {
  const { 
    description, 
    setDescription, 
    setActionStatus, 
    submitForm,
    isLoading 
  } = useCompanyInfoStore();
  const { cartId } = useParams();
  const { mutate: submitExecutiveContract } = useCreateExecutiveContract(cartId);

  const handleButtonClick = async (actionType) => {
    setActionStatus(actionType);
    const formData = await submitForm();
    if (formData) {
      submitExecutiveContract(formData);
    }
  };

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };
  
  const button = [
    {
      id: 'submit',
      label: 'ثبت ',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      id: 'reject',
      label: 'رد ',
      icon: <Cancel />,
      color: 'error',
    },
    {
      id: 'edit',
      label: ' اصلاح',
      icon: <Edit />,
      color: 'info',
    },
  ];

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
        اطلاعات قرارداد عاملیت را برسی کنید
      </Typography>

      <AgencyContract data={data} />

      <Stack spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <TextField 
          label="توضیحات" 
          multiline 
          rows={4} 
          fullWidth 
          type="textarea" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          {button.map((item) => (
            <Button 
              key={item.id} 
              variant="outlined" 
              color={item.color} 
              startIcon={item.icon}
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

AgencyContractPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AgencyContractPage;
