import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';

const CompanyInfo = ({ companyInfo }) => {

  const initialFields = [
    {
      id: 'picture',
      label: 'لوگو شرکت',
      value: companyInfo?.company?.picture,
    },
    {
      id: 'validation_report',
      label: 'گزارش اعتبارسنجی',
      value: companyInfo?.company?.validation_report,
    },
    {
      id: 'financial_statement',
      label: 'صورت مالی',
      value: companyInfo?.company?.financial_statement,
    },
  ];

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileValues, setFileValues] = useState(
    initialFields.reduce((acc, field) => {
      acc[field.id] = field.value ? `${OnRun}/${field.value}` : '';
      return acc;
    }, {})
  );

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

    setFileValues((prevValues) => ({
      ...prevValues,
      [fieldId]: '',
    }));
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        {initialFields.map((field) => (
          <Grid item xs={12} md={6} key={field.id}>
            <Typography variant="p" sx={{ fontSize: '15px' }}>
              <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
              {field.label}
            </Typography>

            {uploadedFiles[field.id] || fileValues[field.id] ? (
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
                  {uploadedFiles[field.id] && <span>{uploadedFiles[field.id]}</span>}
                  {fileValues[field.id] && !uploadedFiles[field.id] && (
                    <a
                      href={fileValues[field.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: '10px', color: 'blue', textDecoration: 'none' }}
                    >
                      {field.label} 📂
                    </a>
                  )}
                </Typography>

                <button type="button" onClick={() => handleDeleteFile(field.id)}>
                  🗑️
                </button>
              </Box>
            ) : (
              <TextField
                fullWidth
                type="file"
                required
                id={field.id}
                variant="outlined"
                onChange={(e) => handleFileChange(e, field.id)}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

CompanyInfo.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};

export default CompanyInfo;
