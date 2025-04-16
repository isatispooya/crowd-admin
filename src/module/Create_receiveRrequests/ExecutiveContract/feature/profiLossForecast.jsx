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
import { usePerformanceForecast } from '../service/performanceForecast';

const ProfitLossForecast = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = usePerformanceForecast(cartId);
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    three_month_sales_profit_and_loss_forecast: allData?.investor_request?.three_month_sales_profit_and_loss_forecast || '',
    annual_sales_profit_and_loss_forecast: allData?.investor_request?.annual_sales_profit_and_loss_forecast || '',
    three_month_cost_profit_and_loss_forecast: allData?.investor_request?.three_month_cost_profit_and_loss_forecast || '',
    three_month_profit_and_loss_forecast: allData?.investor_request?.three_month_profit_and_loss_forecast || '',
    annual_cost_profit_and_loss_forecast: allData?.investor_request?.annual_cost_profit_and_loss_forecast || '',
    annual_profit_and_loss_forecast: allData?.investor_request?.annual_profit_and_loss_forecast || '',
    amount_production: allData?.investor_request?.amount_production || '',
  });

  const formatNumber = (number) => {
    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    if (field === 'subject_activity_document' || (!Number.isNaN(Number(value)) || value === '')) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
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
          <Typography>پیش بینی سود و زیان</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی فروش سه ماهه"
                value={formatNumber(formData.three_month_sales_profit_and_loss_forecast)}
                onChange={handleChange('three_month_sales_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی فروش سالیانه"
                value={formatNumber(formData.annual_sales_profit_and_loss_forecast)}
                onChange={handleChange('annual_sales_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی هزینه سه ماهه"
                value={formatNumber(formData.three_month_cost_profit_and_loss_forecast)}
                onChange={handleChange('three_month_cost_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی هزینه سالیانه"
                value={formatNumber(formData.annual_cost_profit_and_loss_forecast)}
                onChange={handleChange('annual_cost_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی سود و زیان سه ماهه"
                value={formatNumber(formData.three_month_profit_and_loss_forecast)}
                onChange={handleChange('three_month_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
           
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="پیش‌بینی سود و زیان سالیانه"
                value={formatNumber(formData.annual_profit_and_loss_forecast)}
                onChange={handleChange('annual_profit_and_loss_forecast')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="میزان تولید"
                value={formatNumber(formData.amount_production)}
                onChange={handleChange('amount_production')}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <Typography variant="caption">ریال</Typography>,
                }}
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

ProfitLossForecast.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default ProfitLossForecast;
