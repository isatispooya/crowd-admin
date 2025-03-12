import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const CompanyRegister = ({ data }) => {
  const fields = [
    {
      id: 'suggestion_plan_name',
      label: 'نام طرح',
      type: 'text',
      value: data?.suggestion_plan_name || '',
    },
    {
      id: 'amount_of_investment',
      label: 'مبلغ تامین مالی',
      type: 'number',
      value: data?.amount_of_investment || '',
    },
  ];
  return (
    <Box
      component="form"
      sx={{
        padding: 2,
        borderRadius: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.id}>
            <Typography variant="p" sx={{ fontSize: '15px' }}>
              <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
              {field.label}
            </Typography>
            <TextField
              value={field.value}
              fullWidth
              type={field.type}
              required
              id={field.id}
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

CompanyRegister.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CompanyRegister;
