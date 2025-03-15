import {
  Typography,
  Paper,
  TextField,
  Box,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Cancel, CheckCircle, Edit } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { useParams } from 'react-router-dom';
import AdditionalInformation from '../feature';
import useCompanyInfoStore from '../../store/companyInfo.store';
import { useCreateExecutiveContract } from '../../pages/service';

const AdditionalInformationPage = ({ data }) => {
  const { commentStep3, setCommentStep3, setActionStatus, submitAdditionalInfoForm, isLoading } =
    useCompanyInfoStore();

  const [selectedButton, setSelectedButton] = React.useState(data?.step_3 || null);
  const { cartId } = useParams();
  const { mutate: submitExecutiveContract } = useCreateExecutiveContract(cartId);

  const handleButtonClick = async (actionType) => {
    setSelectedButton(actionType);
    setActionStatus(actionType);
    const formData = await submitAdditionalInfoForm();
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
      id: 'approved',
      label: 'تایید ',
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
      id: 'chenged',
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
        اطلاعات تکمیلی را برسی کنید
      </Typography>

      <Accordion sx={{ boxShadow: 4, padding: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="additional-info-content"
          id="additional-info-header"
        >
          <Typography>اطلاعات تکمیلی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdditionalInformation data={data} />
        </AccordionDetails>
      </Accordion>

      <Stack spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <TextField
          label="توضیحات"
          multiline
          rows={4}
          fullWidth
          type="textarea"
          value={commentStep3}
          onChange={(e) => setCommentStep3(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          {button.map((item) => (
            <Button
              key={item.id}
              variant={selectedButton === item.id ? 'contained' : 'outlined'}
              color={item.color}
              startIcon={item.icon}
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

AdditionalInformationPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AdditionalInformationPage;
