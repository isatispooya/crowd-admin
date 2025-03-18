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
import { useProfitAndLossForecast } from '../service/profitAndLossForecast';

const ProfitLossForecast = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data: responseData, refetch } = useProfitAndLossForecast();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    amount_of_year: allData?.profit_and_loss_forecast?.amount_of_year || '',
    amount_of_3_months: allData?.profit_and_loss_forecast?.amount_of_3_months || '',
    description: allData?.profit_and_loss_forecast?.description || '',
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
      setFormData({
        investor_request_id: cartId || '',
        amount_of_year: '',
        amount_of_3_months: '',
        description: '',
      });
      refetch();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  React.useEffect(() => {
    if (responseData) {
      setFormData({
        investor_request_id: cartId || '',
        amount_of_year: responseData.amount_of_year || '',
        amount_of_3_months: responseData.amount_of_3_months || '',
        description: responseData.description || '',
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
          <Typography>پیش بینی سود و زیان</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                fullWidth
                label="مبلغ سالیانه"
                value={formData.amount_of_year}
                onChange={handleChange('amount_of_year')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                fullWidth
                label="مبلغ سه ماهه"
                value={formData.amount_of_3_months}
                onChange={handleChange('amount_of_3_months')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="توضیحات"
                value={formData.description}
                onChange={handleChange('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                ذخیره اطلاعات
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
            {allData?.profit_and_loss_forecast && allData.profit_and_loss_forecast.length > 0 ? (
              allData.profit_and_loss_forecast
                .slice()
                .reverse()
                .map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مبلغ سالیانه:</strong> {item.amount_of_year?.toLocaleString()}{' '}
                          ریال
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مبلغ سه ماهه:</strong> {item.amount_of_3_months?.toLocaleString()}{' '}
                          ریال
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>توضیحات:</strong> {item.description}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                          تاریخ ایجاد: {new Date(item.created_at).toLocaleDateString('fa-IR')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
            ) : (
              <Typography align="center">اطلاعاتی موجود نیست</Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

ProfitLossForecast.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default ProfitLossForecast;
