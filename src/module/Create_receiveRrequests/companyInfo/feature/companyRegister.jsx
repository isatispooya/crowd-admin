import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const fields = [
  { id: 'company-logo', label: 'نام طرح', type: 'text' },
  { id: 'credit-report', label: 'مبلغ تامین مالی', type: 'number' },
];

const CompanyRegister = () => (
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
          <TextField fullWidth type={field.type} required id={field.id} variant="outlined" />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CompanyRegister;
