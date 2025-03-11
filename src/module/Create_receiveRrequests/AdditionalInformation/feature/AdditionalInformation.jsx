import { Grid, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';

const AdditionalInformation = ({ data }) => {
  const [files, setFiles] = useState(data || {});

  const uploadLabels = [
    { id: 'tax_return', label: 'اظهارنامه مالیاتی' },
    { id: 'salary_list_for_the_last_3_months', label: 'لیست حقوق 3 ماه اخیر' },
    { id: 'trial_balance_current_year', label: 'تراز آزمایشی سال جاری' },
    { id: 'balance_sheet', label: 'ترازنامه' },
    { id: 'account_turnover', label: 'گردش حساب' },
    { id: 'shareholder_list', label: 'لیست سهامداران' },
    { id: 'three_recent_buying_and_selling_factors', label: 'سه فاکتور خرید و فروش اخیر' },
    { id: 'company_articles_of_association', label: 'اساسنامه شرکت' },
    { id: 'announcement_of_establishment', label: 'آگهی تاسیس' },
    { id: 'announcement_of_the_latest_managers', label: 'آگهی آخرین مدیران' },
    { id: 'announcement_of_the_latest_changes', label: 'آگهی آخرین تغییرات' },
  ];

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: file.name,
      }));
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
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
              {files[id] ? (
                <a
                  href={files[id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  {files[id]} 📂
                </a>
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
