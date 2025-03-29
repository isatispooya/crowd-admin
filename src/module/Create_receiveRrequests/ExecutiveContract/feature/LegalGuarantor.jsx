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
        payload.append('company_rasmio_national_id', guarantorInfo.guarantor_name);

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
        company_rasmio_national_id: allData.guarantor?.guarantor_name || '',
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ضامن حقوقی"
            value={guarantorInfo.guarantor_name}
            onChange={handleChange('guarantor_name')}
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
        {allData?.guarantor && allData.guarantor.length > 0 ? (
          allData.guarantor
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
                      <strong>حقوقی ضامن:</strong> {item.guarantor_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong> نوع ضامن:</strong> {item.guarantor_national_id}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
        ) : (
          <Typography align="center">اطلاعاتی موجود نیست</Typography>
        )}
      </Box>
    </Box>
  );
};

LegalGuarantor.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default LegalGuarantor;
