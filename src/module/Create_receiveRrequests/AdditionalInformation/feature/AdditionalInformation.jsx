import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { OnRun } from 'src/api/OnRun';
import useCompanyInfoStore from '../../store/companyInfo.store';

const AdditionalInformation = ({ data }) => {
  const { 
    additionalInfo, 
    updateAdditionalInfoFile, 
    interest_rate_plan,
    buoyancy_plan,
    updateNumberField,
    initializeStore 
  } = useCompanyInfoStore();

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
    { id: 'balance_sheet', label: 'مجوزها', value: data?.balance_sheet },
    { id: 'account_turnover', label: 'گردش حساب (حساب اصلی)', value: data?.account_turnover },
    { id: 'shareholder_list', label: 'لیست سهامداران', value: data?.shareholder_list },
    {
      id: 'three_recent_buying_and_selling_factors',
      label: 'سه فاکتور خرید و فروش اخیر',
      value: data?.three_recent_buying_and_selling_factors,
    },
  ];

  const numberFields = [
    { id: 'interest_rate_plan', label: 'سود طرح' },
    { id: 'buoyancy_plan', label: 'شناوری طرح' },
  ];

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      updateAdditionalInfoFile(id, file);
    }
  };

  const handleChangeFile = (id) => {
    updateAdditionalInfoFile(id, null);
  };

  const handleNumberChange = (id, event) => {
    const value = String(event.target.value);
    updateNumberField(id, value);
  };

  return (
    <Box sx={{ padding: 2, borderRadius: '8px' }}>
      <Stack direction="row" spacing={2} wrap="wrap">
        {numberFields.map(({ id, label }) => (
          <Grid key={id} item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginBottom: 2,
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
                {label}
              </Typography>
              <TextField
                fullWidth
                type="text"
                id={id}
                name={id}
                variant="outlined"
                value={id === 'interest_rate_plan' ? interest_rate_plan || '' : buoyancy_plan || ''}
                onChange={(e) => handleNumberChange(id, e)}
                inputProps={{
                  pattern: '[0-9]+(\\.[0-9]+)?'
                }}
              />
            </Box>
          </Grid>
        ))}

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
              <Typography
                variant="p"
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
                {label}
              </Typography>

              {additionalInfo[id] ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 1,
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    borderRadius: '10px',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: 1 }}>
                    {typeof additionalInfo[id] === 'object' ? (
                      <span>{additionalInfo[id].name}</span>
                    ) : (
                      <a
                        href={`${OnRun}/${additionalInfo[id]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginLeft: '10px', color: 'blue', textDecoration: 'none' }}
                      >
                        {label} 📂
                      </a>
                    )}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleChangeFile(id)}
                  >
                    تغییر فایل
                  </Button>
                </Box>
              ) : (
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    type="file"
                    id={id}
                    name={id}
                    onChange={(e) => handleFileChange(id, e)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '10px',
                        borderRadius: '10px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <Typography
                          variant="body2"
                          sx={{
                            marginRight: 1,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          📂
                        </Typography>
                      ),
                    }}
                  />
                </Box>
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
