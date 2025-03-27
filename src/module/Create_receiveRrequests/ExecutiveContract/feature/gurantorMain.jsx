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

const GuarantorMain = ({ allData, refetch }) => {
  const [activeForm, setActiveForm] = useState('haghighi');

  return (
    <Box>
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
                onClick={() => setActiveForm('haghighi')}
                variant={activeForm === 'haghighi' ? 'contained' : 'outlined'}
              >
                اطلاعات حقیقی
              </Button>
              <Button
                onClick={() => setActiveForm('hoghughi')}
                variant={activeForm === 'hoghughi' ? 'contained' : 'outlined'}
              >
                اطلاعات حقوقی
              </Button>
            </ButtonGroup>
          </Box>

          {activeForm === 'haghighi' ? (
            <Guarantor allData={allData} refetch={refetch} />
          ) : (
            <LegalGuarantor allData={allData} refetch={refetch} />
          )}
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
