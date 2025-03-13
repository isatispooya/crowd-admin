import { Grid, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import useCompanyInfoStore from '../../store/companyInfo.store';

const AdditionalInformation = ({ data }) => {
  const { additionalInfo, updateAdditionalInfoFile, initializeStore } =
    useCompanyInfoStore();

  useEffect(() => {
    if (data) {
      initializeStore(data);
    }
  }, [data, initializeStore]);

  const uploadLabels = [
    { id: 'tax_return', label: 'اظهارنامه مالیاتی', value: data?.tax_return },
    {
      id: 'salary_list_for_the_last_3_months',
      label: 'لیست حقوق 3 ماه اخیر',
      value: data?.salary_list_for_the_last_3_months,
    },
    {
      id: 'trial_balance_current_year',
      label: 'تراز آزمایشی سال جاری',
      value: data?.trial_balance_current_year,
    },
    { id: 'balance_sheet', label: 'ترازنامه', value: data?.balance_sheet },
    { id: 'account_turnover', label: 'گردش حساب', value: data?.account_turnover },
    { id: 'shareholder_list', label: 'لیست سهامداران', value: data?.shareholder_list },
    {
      id: 'three_recent_buying_and_selling_factors',
      label: 'سه فاکتور خرید و فروش اخیر',
      value: data?.three_recent_buying_and_selling_factors,
    },
  ];

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      updateAdditionalInfoFile(id, file);
    }
  };

  return (
    <Box sx={{ padding: 2, borderRadius: '8px' }}>
      <Stack direction="row" spacing={2} wrap="wrap">
        {uploadLabels.map(({ id, label }) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginBottom: 2,
              }}
            >
              <label
                htmlFor={id}
                style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}
              >
                {label}
              </label>
              {additionalInfo[id] ? (
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <a
                    href={typeof additionalInfo[id] === 'string' ? additionalInfo[id] : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    {typeof additionalInfo[id] === 'object' ? additionalInfo[id].name : label} 📂
                  </a>
                </Box>
              ) : (
                <TextField
                  fullWidth
                  type="file"
                  id={id}
                  name={id}
                  onChange={(e) => handleFileChange(id, e)}
                  sx={{
                    display: 'block',
                    marginTop: '0.5rem',
                    padding: '10px',
                    borderRadius: '10px',
                    justifyContent: 'space-between',
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

AdditionalInformation.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AdditionalInformation;
