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

const PerformanceForecast = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data: responseData, refetch } = usePerformanceForecast();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    title: allData?.performance_forecast?.title || '',
    value: allData?.performance_forecast?.value || '',
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
        title: '',
        value: '',
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
        title: responseData.title || '',
        value: responseData.value || '',
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
          <Typography>پیش بینی عملکرد</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="عنوان"
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="مقدار"
                value={formData.value}
                onChange={handleChange('value')}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                ذخیره اطلاعات
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
            {allData?.performance_forecast && allData.performance_forecast.length > 0 ? (
              allData.performance_forecast
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
                          <strong>عنوان:</strong> {item.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مقدار:</strong> {item.value?.toLocaleString()} ریال
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

PerformanceForecast.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default PerformanceForecast;
