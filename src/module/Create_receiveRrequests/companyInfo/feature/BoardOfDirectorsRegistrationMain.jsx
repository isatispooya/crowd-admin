import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from 'react-bootstrap';
import { CheckCircle, Cancel, Edit } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CompanyBankInfo from './companyBankInfo';
import CompanyInfo from './companyInfo';
import CompanyRegister from './companyRegister';
import useCompanyInfoStore from '../../store/companyInfo.store';
import { useCreateExecutiveContract } from '../../pages/service';

const BoardOfDirectorsRegistrationMain = ({ companyInfo }) => {
  const { cartId } = useParams();
  const { mutate: submitExecutiveContract } = useCreateExecutiveContract(cartId);
  const [selectedButton, setSelectedButton] = React.useState(companyInfo?.step_1 || null);


  const { 
    commentStep1, 
    setCommentStep1, 
    setActionStatus, 
    isLoading, 
    submitStep1Form,
    uploadedFiles
  } = useCompanyInfoStore();

  React.useEffect(() => {
    if (companyInfo?.status) {
      setSelectedButton(companyInfo.status);
      setActionStatus(companyInfo.status);
    }
  }, [companyInfo?.status, setActionStatus]);

  const handleButtonClick = async (actionType) => {
    setSelectedButton(actionType);
    setActionStatus(actionType);
    
    if (!uploadedFiles.picture) {
      alert('لطفا لوگوی شرکت را آپلود کنید');
      return;
    }

    const formData = await submitStep1Form();
    if (formData) {
      submitExecutiveContract(formData);
    }
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
      id: 'changed',
      label: ' اصلاح',
      icon: <Edit />,
      color: 'info',
    },
  ];

  return (
    <Box>
      <Accordion sx={{ boxShadow: 4, borderRadius: 1, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات شرکت
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyInfo companyInfo={companyInfo} />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات بانکی ضمانت نامه
          </Typography>
          <CompanyBankInfo data={companyInfo} />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات ثبت
          </Typography>
          <CompanyRegister data={companyInfo} />
        </AccordionDetails>
      </Accordion>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <TextField
          label="توضیحات"
          multiline
          rows={4}
          fullWidth
          type="textarea"
          value={commentStep1}
          onChange={(e) => setCommentStep1(e.target.value)}
        />

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
    </Box>
  );
};

BoardOfDirectorsRegistrationMain.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};

export default BoardOfDirectorsRegistrationMain;
