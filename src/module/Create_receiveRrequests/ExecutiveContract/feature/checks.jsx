import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useChecks } from '../service/checks';

const Checks = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data: responseData } = useChecks();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    date: allData?.checks?.date || null,
    amount: allData?.checks?.amount || null,
    bank_name: allData?.checks?.bank_name || '',
    branch_name: allData?.checks?.branch_name || '',
    type: allData?.checks?.type || null,
    fishing: allData?.checks?.fishing|| '',
  });




  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        investor_request: allData.id,
        ...formData,
      };

      await mutate(payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  React.useEffect(() => {
    if (responseData) {
      setFormData({
        date: responseData.date,
        amount: responseData.amount,
        bank_name: responseData.bank_name,
        branch_name: responseData.branch_name,
        type: responseData.type,
        fishing: responseData.fishing,
        investor_request: responseData.investor_request,
      });
    }
  }, [responseData, cartId]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion
        sx={{
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>چک ها</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                fullWidth
                label="تاریخ چک"
                value={formData.date}
                onChange={handleChange('date')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                fullWidth
                label="مبلغ چک"
                value={formData.amount}
                onChange={handleChange('amount')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام بانک"
                value={formData.bank_name}
                onChange={handleChange('bank_name')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام شعبه"
                value={formData.branch_name}
                onChange={handleChange('branch_name')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نوع چک"
                value={formData.type}
                onChange={handleChange('type')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شماره فیش"
                value={formData.fishing_id}
                onChange={handleChange('fishing_id')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                ذخیره اطلاعات
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

Checks.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Checks;
