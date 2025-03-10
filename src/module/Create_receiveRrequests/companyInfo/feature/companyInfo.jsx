import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const fields = [
  { id: 'company-logo', label: 'لوگو شرکت' },
  { id: 'credit-report', label: 'گزارش اعتبارسنجی' },
  { id: 'financial-statement', label: 'صورت مالی' },
];

const CompanyInfo = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (event, fieldId) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [fieldId]: file.name,
      }));
    }
  };

  const handleDeleteFile = (fieldId) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[fieldId];
      return newFiles;
    });
  };

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
            {!uploadedFiles[field.id] ? (
              <TextField
                fullWidth
                type="file"
                required
                id={field.id}
                variant="outlined"
                onChange={(e) => handleFileChange(e, field.id)}
              />
            ) : (
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
                  {uploadedFiles[field.id]}
                </Typography>
                <button type="button" onClick={() => handleDeleteFile(field.id)}>
                  🗑️
                </button>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyInfo;
