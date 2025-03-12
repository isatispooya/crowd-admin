import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  IconButton,
  Paper,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const BoardOfDirectors = ({data}) => {
  const [files, setFiles] = useState({});
  const members = data?.company_members || [];

  const uploadFields = [
    { id: 'validation_report', label: 'گزارش اعتبارسنجی', value: data?.validation_report },
    { id: 'previous_article', label: 'مقاله قبلی', value: data?.previous_article },
    { id: 'national_card', label: 'کارت ملی', value: data?.national_card },
    { id: 'identity_card', label: 'شناسنامه', value: data?.identity_card },
  ];

  const handleFileChange = (memberId, fieldId, file) => {
    setFiles((prev) => ({
      ...prev,
      ...prev[memberId],
      [fieldId]: file,
    }));
  };

  console.log(files);

  return (
    <Container maxWidth="md" dir="rtl">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
        {members.length > 0 ? (
          members.map((member) => (
            <Accordion key={member.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>{member.person_title}</strong> - {member.position_title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uploadFields.map((field) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <Typography>{field.label}</Typography>
                    {files[member.id]?.[field.id] || field.value ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                        }}
                      >
                        <Typography>{files[member.id]?.[field.id]?.name || field.value}</Typography>
                        <IconButton
                          color="error"
                          onClick={() => handleFileChange(member.id, field.id, null)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <TextField
                        type="file"
                        fullWidth
                        inputProps={{ accept: '*' }}
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            handleFileChange(member.id, field.id, e.target.files[0]);
                          }
                        }}
                      />
                    )}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>هیچ عضوی در هیئت مدیره یافت نشد.</Typography>
        )}
      </Paper>
    </Container>
  );
};

BoardOfDirectors.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BoardOfDirectors;
