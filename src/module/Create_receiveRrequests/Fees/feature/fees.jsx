import React, { useEffect, useState } from 'react';
import { Box, Grid, AccordionDetails, TextField, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useCreateExecutiveContract } from '../../pages/service';

const Fees = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate: submitExecutiveContract } = useCreateExecutiveContract(cartId);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    design_wage: '',
    farabours_wage: '',
    execution_wage: '',
    marketing_wage: '',
    company_certificate_wage: '',
  });

  useEffect(() => {
    if (allData) {
      setFormData({
        design_wage: allData.design_wage || '',
        farabours_wage: allData.farabours_wage || '',
        execution_wage: allData.execution_wage || '',
        marketing_wage: allData.marketing_wage || '',
        company_certificate_wage: allData.company_certificate_wage || '',
      });
    }
  }, [allData]);

  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedData);
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await submitExecutiveContract(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              label="دستمزد طراحی"
              value={formatNumber(formData.design_wage)}
              onChange={handleChange('design_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              label="دستمزد فرابورس"
              value={formatNumber(formData.farabours_wage)}
              onChange={handleChange('farabours_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              label="دستمزد اجرا"
              value={formatNumber(formData.execution_wage)}
              onChange={handleChange('execution_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              label="دستمزد بازاریابی"
              value={formatNumber(formData.marketing_wage)}
              onChange={handleChange('marketing_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              label="دستمزد گواهی شرکت"
              value={formatNumber(formData.company_certificate_wage)}
              onChange={handleChange('company_certificate_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>

      <Stack spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            sx={{ width: '100%', maxWidth: 400 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'در حال ارسال...' : 'ارسال اطلاعات'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

Fees.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Fees;
