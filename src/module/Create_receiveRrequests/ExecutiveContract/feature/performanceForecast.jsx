import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { usePerformanceForecast } from '../service/performanceForecast';
import useCompanyInfoStore from '../../store/companyInfo.store';

// فیلدهای سالانه
const ANNUAL_FIELDS = [
  { id: 'annual_total_income_forecast', label: 'پیش بینی درآمد کل سالانه' },
  { id: 'annual_total_cost_forecast', label: 'پیش بینی هزینه کل سالانه' },
  { id: 'annual_gross_profit_of_the_plan_forecast', label: 'پیش بینی سود ناخالص طرح سالانه' },
  { id: 'annual_profit_margin_of_the_plan_forecast', label: 'پیش بینی حاشیه سود طرح سالانه' },
  {
    id: 'annual_shareholders_equity_ratio_forecast',
    label: 'پیش بینی نسبت حقوق صاحبان سهام سالانه',
  },
];

// فیلدهای سه ماهه
const QUARTERLY_FIELDS = [
  { id: 'three_months_total_income_forecast', label: 'پیش بینی درآمد کل سه ماهه' },
  { id: 'three_months_total_cost_forecast', label: 'پیش بینی هزینه کل سه ماهه' },
  {
    id: 'three_months_gross_profit_of_the_plan_forecast',
    label: 'پیش بینی سود ناخالص طرح سه ماهه',
  },
  {
    id: 'three_months_profit_margin_of_the_plan_forecast',
    label: 'پیش بینی حاشیه سود طرح سه ماهه',
  },
  {
    id: 'three_months_shareholders_equity_ratio_forecast',
    label: 'پیش بینی نسبت حقوق صاحبان سهام سه ماهه',
  },
];

const PerformanceForecast = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = usePerformanceForecast(cartId);
  const { updatePerformanceForecast, submitPerformanceForecast } = useCompanyInfoStore();

  console.log('allData:', allData);

  const getFormState = useCallback(() => {
    const formState = {
      investor_request_id: cartId,
    };

    [...ANNUAL_FIELDS, ...QUARTERLY_FIELDS].forEach((field) => {
      const value = allData?.investor_request?.[field.id];
      formState[field.id] = value !== undefined && value !== null ? value.toString() : '';
    });

    return formState;
  }, [allData, cartId]);

  const [formData, setFormData] = useState(getFormState());

  useEffect(() => {
    setFormData(getFormState());
  }, [allData, getFormState]);

  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    if (!Number.isNaN(Number(value)) || value === '') {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      updatePerformanceForecast(field, value);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        investor_request: allData.id,
        ...formData,
      };

      console.log('Submitting payload:', payload);
      await submitPerformanceForecast();
      await mutate(payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderFields = (fields) =>
    fields.map((field) => (
      <Grid item xs={12} md={6} key={field.id}>
        <TextField
          fullWidth
          label={field.label}
          value={formData[field.id] || ''}
          onChange={handleChange(field.id)}
        />
      </Grid>
    ));

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
          <Typography>پیش بینی عملکرد</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: '8px', mb: 2 }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                  پیش‌بینی‌های سالانه
                </Typography>
                <Grid container spacing={2}>
                  {renderFields(ANNUAL_FIELDS)}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                  پیش‌بینی‌های سه ماهه
                </Typography>
                <Grid container spacing={2}>
                  {renderFields(QUARTERLY_FIELDS)}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: 2 }}
              >
                ذخیره اطلاعات
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

PerformanceForecast.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default PerformanceForecast;
