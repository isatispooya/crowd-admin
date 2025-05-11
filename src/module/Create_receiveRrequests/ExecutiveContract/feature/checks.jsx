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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { useChecks, useDeleteChecks } from '../service/checks';

const Checks = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useChecks(cartId);
  const { mutate: deleteCheck } = useDeleteChecks();

  const formatNumber = (number) => {
    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    date: allData?.checks?.date
      ? new DateObject({ date: allData?.checks?.date, calendar: persian })
      : null,
    amount: allData?.checks?.amount || null,
    bank_name: allData?.checks?.bank_name || '',
    branch_name: allData?.checks?.branch_name || '',
    type: allData?.checks?.type || null,
    fishing: allData?.checks?.fishing_id || '',
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
      let formattedDate = null;
      if (formData.date) {
        if (typeof formData.date.toDate === 'function') {
          formattedDate = formData.date.toDate().toISOString();
        } else {
          formattedDate = new Date(formData.date).toISOString();
        }
      }

      const payload = {
        investor_request: allData.id,
        ...formData,
        date: formattedDate,
      };

      await mutate(payload);
      setFormData({
        investor_request_id: cartId,
        date: '',
        amount: '',
        bank_name: '',
        branch_name: '',
        type: '',
        fishing_id: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = (id) => {
    deleteCheck(id);
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
          <Typography>چک ها</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">تاریخ چک</Typography>
              <div style={{ direction: 'rtl' }}>
                <DatePicker
                  value={formData.date}
                  onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                fullWidth
                label="مبلغ چک"
                value={formatNumber(formData.amount)}
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
              <FormControl fullWidth>
                <InputLabel id="check-type-label">نوع چک</InputLabel>
                <Select
                  labelId="check-type-label"
                  id="check-type"
                  value={formData.type || ''}
                  label="نوع چک"
                  onChange={handleChange('type')}
                >
                  <MenuItem value="خسارت">خسارت</MenuItem>
                  <MenuItem value="اصل">اصل</MenuItem>
                  <MenuItem value="فرع">فرع</MenuItem>
                  <MenuItem value="وجه التزام">وجه التزام</MenuItem>
                </Select>
              </FormControl>
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
          <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
            {allData?.checks && allData.checks.length > 0 ? (
              allData.checks
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
                      position: 'relative',
                    }}
                  >
                    <Tooltip title="حذف چک">
                      <IconButton 
                        sx={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10, 
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.04)'
                          }
                        }}
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>تاریخ چک:</strong>{' '}
                          {item.date
                            ? new DateObject({
                                date: new Date(item.date),
                                calendar: persian,
                                locale: persian_fa,
                              }).format('YYYY/MM/DD')
                            : '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مبلغ چک:</strong> {formatNumber(item.amount)} ریال
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>نام بانک:</strong> {item.bank_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>نام شعبه:</strong> {item.branch_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>نوع چک:</strong> {item.type}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>شماره فیش:</strong> {item.fishing_id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                          تاریخ ایجاد:{' '}
                          {item.created_at
                            ? new DateObject({
                                date: new Date(item.created_at),
                                calendar: persian,
                                locale: persian_fa,
                              }).format('YYYY/MM/DD')
                            : '—'}
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

Checks.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Checks;
