import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Contract = () => {
  const [files, setFiles] = useState({
    account_number_letter: null,
    financial_exel: null,
    auditor_response: null,
    warranty: null,
  });

  const links = [
    { id: 1, title: 'قرارداد عاملیت'},
    { id: 2, title: 'نامه حسابرسی'},
    { id: 3, title: 'نامه بانکی'},
  ];

  const uploadLabels = [
    { id: 'account_number_letter', label: 'نامه شماره حساب' },
    { id: 'financial_exel', label: 'اکسل مالی' },
    { id: 'auditor_response', label: 'پاسخ حسابرس' },
    { id: 'warranty', label: 'ضمانت نامه' },
  ];

  return (
    <Container maxWidth="md" dir="rtl">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">قرارداد </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {links.map((link) => (
              <Button
                key={link.id}
                component={Link}
                fullWidth
                variant="outlined"
                sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                {link.title}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">اسناد</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {uploadLabels.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography>{item.label}</Typography>
                {!files[item.id] ? (
                  <TextField
                    type="file"
                    fullWidth
                    inputProps={{ accept: '*' }}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setFiles((prev) => ({ ...prev, [item.id]: e.target.files[0] }));
                      }
                    }}
                  />
                ) : (
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
                    <Typography>{files[item.id].name}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => setFiles((prev) => ({ ...prev, [item.id]: null }))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default Contract;
