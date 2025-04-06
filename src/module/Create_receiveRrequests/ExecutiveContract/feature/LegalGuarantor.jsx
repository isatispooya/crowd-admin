import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';

const LegalGuarantor = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useGuarantor();

  const { guarantorInfo, setGuarantorInfo, updateGuarantorInfo, submitGuarantorInfo } =
    useCompanyInfoStore();

  const handleChange = (field) => (event) => {
    updateGuarantorInfo(field, event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        const payload = new FormData();
        payload.append('investor_request_id', allData.id || cartId);
        payload.append('type', 'legal');
        payload.append('company_rasmio_national_id', guarantorInfo.company_rasmio_national_id);

        await mutate(payload);

        setGuarantorInfo({
          Type: '',
          company_rasmio_national_id: '',
        });
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  };

  React.useEffect(() => {
    if (allData) {
      setGuarantorInfo({
        Type: allData.id || cartId,
        company_rasmio_national_id: allData.guarantor?.company_rasmio_national_id || '',
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

  const legalGuarantors = allData?.guarantor ? allData.guarantor : [];

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ضامن حقوقی"
            value={guarantorInfo.company_rasmio_national_id}
            onChange={handleChange('company_rasmio_national_id')}
            InputLabelProps={{ shrink: true }}
          />
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

      <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
        {legalGuarantors.length > 0 ? (
          legalGuarantors
            .slice()
            .reverse()
            .filter((item) => item.type === 'legal')
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
                      <strong> نوع ضامن:</strong>{' '}
                      {item.type === 'legal' ? 'حقوقی' : item.type || 'تعیین نشده'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong> شناسه ملی ضامن:</strong>{' '}
                      {item.company_rasmio?.national_id || 'تعیین نشده'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
        ) : (
          <Typography align="center">ضامن حقوقی ثبت نشده است</Typography>
        )}
      </Box>
    </Box>
  );
};

LegalGuarantor.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default LegalGuarantor;
