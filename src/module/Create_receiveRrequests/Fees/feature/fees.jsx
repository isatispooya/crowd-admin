import React, { useEffect } from 'react';
import { Box, Grid, AccordionDetails, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Fees = ({ allData, onFormDataChange }) => {
  const { cartId } = useParams();

  const { fees, updateFeeField, setInvestorRequestIdForFees } = useCompanyInfoStore();

  useEffect(() => {
    if (allData?.company_cost) {
      setInvestorRequestIdForFees(cartId);

      if (allData.company_cost.design_wage)
        updateFeeField('design_wage', allData.company_cost.design_wage);
      if (allData.company_cost.farabours_wage)
        updateFeeField('farabours_wage', allData.company_cost.farabours_wage);
      if (allData.company_cost.execution_wage)
        updateFeeField('execution_wage', allData.company_cost.execution_wage);
      if (allData.company_cost.marketing_wage)
        updateFeeField('marketing_wage', allData.company_cost.marketing_wage);
      if (allData.company_cost.company_certificate_wage)
        updateFeeField('company_certificate_wage', allData.company_cost.company_certificate_wage);
    }
  }, [allData, cartId, setInvestorRequestIdForFees, updateFeeField]);

  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    updateFeeField(field, value);

    if (onFormDataChange) {
      onFormDataChange({
        ...fees,
        [field]: value,
      });
    }
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              fullWidth
              label="دستمزد طراحی"
              value={fees.design_wage}
              onChange={handleChange('design_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              fullWidth
              label="دستمزد فرابورس"
              value={fees.farabours_wage}
              onChange={handleChange('farabours_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              fullWidth
              label="دستمزد اجرا"
              value={fees.execution_wage}
              onChange={handleChange('execution_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              fullWidth
              label="دستمزد بازاریابی"
              value={fees.marketing_wage}
              onChange={handleChange('marketing_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              fullWidth
              label="دستمزد گواهی شرکت"
              value={fees.company_certificate_wage}
              onChange={handleChange('company_certificate_wage')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Box>
  );
};

Fees.propTypes = {
  allData: PropTypes.object.isRequired,
  onFormDataChange: PropTypes.func,
};

export default Fees;
