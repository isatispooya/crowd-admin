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
  CircularProgress,
  MenuItem,
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
import { useWarranty, useDeleteWarranty } from '../service/warranty';

const Warranty = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useWarranty(cartId);
  const { mutate: deleteWarranty } = useDeleteWarranty();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    date: allData?.warranty?.date || null,
    description: allData?.warranty?.description || '',
    value: allData?.warranty?.value || null,
    number: allData?.warranty?.number || '',
    sepam_id: allData?.warranty?.sepam_id || '',
    type: allData?.warranty?.type || '',
    fishing_id: allData?.warranty?.fishing_id || '',
    exporter: allData?.warranty?.exporter || '',
    project_end_date: allData?.warranty?.project_end_date || null,
    warranty_validity_date: allData?.warranty?.warranty_validity_date || null,
  });
  const [loading, setLoading] = React.useState(false);

  const formatNumber = (number) => {
    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getWarrantyTypeInPersian = (type) => {
    switch (type) {
      case 'warranty':
        return 'ضمانت‌نامه';
      case 'check':
        return 'چک';
      default:
        return type || '—';
    }
  };

  const handleChange = (field) => (event) => {
    const value = field === 'type' ? event.target.value : event.target.value.replace(/,/g, '');
    console.log('Field:', field, 'Value:', value);
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      };
      console.log('New Form Data:', newData);
      return newData;
    });
  };

  const handleDelete = (id) => {
    deleteWarranty(id);
  };

  const calculateDateDifference = () => {
    if (!formData.project_end_date || !formData.warranty_validity_date) return null;

    const projectEnd = new DateObject({
      date: formData.project_end_date,
      calendar: persian,
      locale: persian_fa,
    }).toDate();

    const warrantyEnd = new DateObject({
      date: formData.warranty_validity_date,
      calendar: persian,
      locale: persian_fa,
    }).toDate();

    const diffTime = Math.abs(warrantyEnd - projectEnd);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let isoDate;
      let isoProjectEndDate;
      let isoWarrantyValidityDate;

      if (formData.date instanceof Date) {
        isoDate = formData.date.toISOString();
      } else {
        isoDate = new DateObject({
          date: formData.date,
          calendar: persian,
          locale: persian_fa,
        })
          .toDate()
          .toISOString();
      }

      if (formData.project_end_date) {
        isoProjectEndDate = new DateObject({
          date: formData.project_end_date,
          calendar: persian,
          locale: persian_fa,
        })
          .toDate()
          .toISOString();
      }

      if (formData.warranty_validity_date) {
        isoWarrantyValidityDate = new DateObject({
          date: formData.warranty_validity_date,
          calendar: persian,
          locale: persian_fa,
        })
          .toDate()
          .toISOString();
      }

      const payload = {
        investor_request: allData.id,
        ...formData,
        date: isoDate,
        project_end_date: isoProjectEndDate,
        warranty_validity_date: isoWarrantyValidityDate,
      };

      await mutate(payload);
      setFormData({
        investor_request_id: cartId,
        date: '',
        description: '',
        value: '',
        number: '',
        sepam_id: '',
        type: '',
        fishing_id: '',
        exporter: '',
        project_end_date: null,
        warranty_validity_date: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
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
          <Typography>ضمانت ها</Typography>
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
                type="text"
                fullWidth
                label="مبلغ"
                value={formatNumber(formData.value)}
                onChange={handleChange('value')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="نوع ضمانت‌نامه"
                value={formData.type || ''}
                onChange={handleChange('type')}
              >
                <MenuItem value="">انتخاب کنید</MenuItem>
                <MenuItem value="warranty">ضمانت‌نامه</MenuItem>
                <MenuItem value="check">چک</MenuItem>
              </TextField>
            </Grid>
            {formData.type === 'warranty' && (
              <>
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
                    label="صادرکننده"
                    value={formData.exporter}
                    onChange={handleChange('exporter')}
                  />
                </Grid>
              </>
            )}
            {formData.type === 'check' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="شناسه صیاد"
                    value={formData.fishing_id}
                    onChange={handleChange('fishing_id')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="صادرکننده"
                    value={formData.exporter}
                    onChange={handleChange('exporter')}
                  />
                </Grid>
              </>
            )}
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
            <Grid item xs={12} md={6}>
              <Typography variant="body2">تاریخ خاتمه طرح</Typography>
              <div style={{ direction: 'rtl' }}>
                <DatePicker
                  value={formData.project_end_date || null}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, project_end_date: value }))
                  }
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">تاریخ اعتبار ضمانت نامه</Typography>
              <div style={{ direction: 'rtl' }}>
                <DatePicker
                  value={formData.warranty_validity_date || null}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, warranty_validity_date: value }))
                  }
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                />
              </div>
            </Grid>
            {formData.project_end_date && formData.warranty_validity_date && (
              <Grid item xs={12}>
                <Typography variant="body2" color="primary">
                  اختلاف تاریخ: {calculateDateDifference()} روز
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="secondary" /> : 'ذخیره اطلاعات'}
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
                      position: 'relative',
                    }}
                  >
                    <Tooltip title="حذف ضمانت">
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                          },
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
                          <strong>تاریخ:</strong>{' '}
                          {item.date
                            ? new DateObject({
                                date: new Date(item.date),
                                calendar: persian,
                                locale: persian_fa,
                              }).format('YYYY/MM/DD')
                            : '---'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          <strong>مبلغ:</strong> {formatNumber(item.value)} ریال
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
                          <strong>نوع ضمانت‌نامه:</strong> {getWarrantyTypeInPersian(item.type)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>توضیحات:</strong> {item.description}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>تاریخ ضمانت:</strong>{' '}
                          {item.date
                            ? new DateObject({
                                date: new Date(item.date),
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

Warranty.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Warranty;
