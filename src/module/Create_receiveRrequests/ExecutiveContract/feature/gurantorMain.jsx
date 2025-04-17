import React, { useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Guarantor from './guarantor';
import LegalGuarantor from './LegalGuarantor';
import useCompanyInfoStore from '../../store/companyInfo.store';

const GuarantorMain = ({ allData, refetch }) => {
  const [activeForm, setActiveForm] = useState('');
  const { updateGuarantorInfo } = useCompanyInfoStore();

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    updateGuarantorInfo('type', formType === 'physical' ? 'individual' : 'legal');
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion
        sx={{
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px ',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اطلاعات ضامن</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="outlined" aria-label="گروه دکمه‌های اصلی">
              <Button
                onClick={() => handleFormChange('physical')}
                variant={activeForm === 'physical' ? 'contained' : 'outlined'}
              >
                اطلاعات حقیقی
              </Button>
              <Button
                onClick={() => handleFormChange('legal')}
                variant={activeForm === 'legal' ? 'contained' : 'outlined'}
              >
                اطلاعات حقوقی
              </Button>
            </ButtonGroup>
          </Box>
          {activeForm === 'physical' && <Guarantor allData={allData} refetch={refetch} />}
          {activeForm === 'legal' && <LegalGuarantor allData={allData} refetch={refetch} />}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

GuarantorMain.propTypes = {
  allData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default GuarantorMain;
