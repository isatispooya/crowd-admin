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
import { useGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Guarantor = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useGuarantor();

  // استفاده از استور زوستند
  const { guarantorInfo, setGuarantorInfo, updateGuarantorInfo, submitGuarantorInfo } =
    useCompanyInfoStore();

  const handleChange = (field) => (event) => {
    updateGuarantorInfo(field, event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        await mutate(formData);
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  };

  React.useEffect(() => {
    if (allData) {
      setGuarantorInfo({
        investor_request_id: allData.id || cartId,
        guarantor_name: allData.guarantor?.guarantor_name || '',
        guarantor_national_id: allData.guarantor?.guarantor_national_id || '',
        phone_number: allData.guarantor?.phone_number || '',
        birth_date: allData.guarantor?.birth_date || null,
        guarantor_address: allData.guarantor?.guarantor_address || '',
        postal_code: allData.guarantor?.postal_code || '',
        gender: allData.guarantor?.gender ?? true,
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

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
          <Typography>اطلاعات ضامن</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام ضامن"
                value={guarantorInfo.guarantor_name}
                onChange={handleChange('guarantor_name')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="کد ملی ضامن"
                value={guarantorInfo.guarantor_national_id}
                onChange={handleChange('guarantor_national_id')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شماره تلفن"
                value={guarantorInfo.phone_number}
                onChange={handleChange('phone_number')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                fullWidth
                label="تاریخ تولد"
                value={
                  guarantorInfo.birth_date
                    ? new Date(guarantorInfo.birth_date).toISOString().split('T')[0]
                    : ''
                }
                onChange={handleChange('birth_date')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="آدرس ضامن"
                value={guarantorInfo.guarantor_address}
                onChange={handleChange('guarantor_address')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="کد پستی"
                value={guarantorInfo.postal_code}
                onChange={handleChange('postal_code')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="جنسیت"
                value={guarantorInfo.gender}
                onChange={handleChange('gender')}
                SelectProps={{
                  native: true,
                }}
              >
                <option>مرد</option>
                <option>زن</option>
              </TextField>
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

Guarantor.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Guarantor;
