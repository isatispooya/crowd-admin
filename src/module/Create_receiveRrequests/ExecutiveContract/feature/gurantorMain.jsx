import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import GuarantorList from './GuarantorList';
import { useDeleteGuarantor } from '../service/guarantorService';

const GuarantorMain = ({ allData, refetch }) => {
  const [activeForm, setActiveForm] = useState('');
  const [editGuarantor, setEditGuarantor] = useState(null);
  const { cartId } = useParams();
  const { mutate: deleteGuarantor } = useDeleteGuarantor(cartId);

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    setEditGuarantor(null); 
  };

  const handleDelete = async (guarantorId) => {
    try {
      await deleteGuarantor(guarantorId);
      await refetch();
    } catch (error) {
      console.error('خطا در حذف ضامن:', error);
    }
  };

  const handleEdit = (guarantor) => {
    setEditGuarantor(guarantor);
    setActiveForm('physical');
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion
        sx={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}
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
              '& > *': { m: 1 },
            }}
          >
            <ButtonGroup variant="outlined">
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

          {activeForm === 'physical' && (
            <Guarantor
              allData={allData}
              refetch={refetch}
              initialValues={editGuarantor}
              onFinishEdit={() => setEditGuarantor(null)}
            />
          )}

          {activeForm === 'legal' && (
            <LegalGuarantor
              allData={allData}
              refetch={refetch}
              initialValues={editGuarantor}
              onFinishEdit={() => setEditGuarantor(null)}
            />
          )}

          {allData?.guarantor && allData.guarantor.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                لیست ضامن‌ها
              </Typography>
              <GuarantorList
                guarantors={allData.guarantor}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Box>
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
