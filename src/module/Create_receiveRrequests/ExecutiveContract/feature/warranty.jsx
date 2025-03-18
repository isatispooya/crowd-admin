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
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { useWarranty } from '../service/warranty';

const Warranty = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data: responseData } = useWarranty();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    date: allData?.warranty?.date || null,
    description: allData?.warranty?.description || '',
    value: allData?.warranty?.value || null,
    number: allData?.warranty?.number || '',
    sepam_id: allData?.warranty?.sepam_id || '',
    type: allData?.warranty?.type || '',
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
        date: formData.date,
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
        fishing_id: responseData.fishing_id,
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
          <Typography> ضمانت ها</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">تاریخ ضمانت</Typography>
              <div style={{ direction: 'rtl' }}>
                <DatePicker
                  value={formData.date || null}
                  onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                fullWidth
                label="مبلغ"
                value={formData.value}
                onChange={handleChange('value')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شماره ضمانت‌نامه"
                value={formData.number}
                onChange={handleChange('number')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شناسه سپام"
                value={formData.sepam_id}
                onChange={handleChange('sepam_id')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نوع ضمانت‌نامه"
                value={formData.type}
                onChange={handleChange('type')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
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
            {allData?.warranty && allData.warranty.length > 0 ? (
              allData.warranty
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
                          <strong>تاریخ:</strong>
                          {new DateObject({
                            date: item.date,
                            calendar: persian,
                            locale: persian_fa,
                          }).format('YYYY/MM/DD')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مبلغ:</strong> {item.value?.toLocaleString()} ریال
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>شماره ضمانت‌نامه:</strong> {item.number}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>شناسه سپام:</strong> {item.sepam_id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>نوع ضمانت‌نامه:</strong> {item.type}
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

Warranty.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Warranty;
