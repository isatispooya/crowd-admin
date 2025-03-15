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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Contract = ({ data }) => {
  const { 
    agencyContract, 
    updateAgencyContractFile, 
    initializeStore
  } = useCompanyInfoStore();
  
  useEffect(() => {
    if (data) {
      initializeStore(data);
    }
  }, [data, initializeStore]);

  const links = [
    { id: 1, title: 'قرارداد عاملیت' },
    { id: 2, title: 'نامه حسابرسی' },
    { id: 3, title: 'نامه بانکی' },
  ];

  const uploadLabels = [
    { id: 'account_number_letter', label: 'نامه شماره حساب', value: data?.account_number_letter },
    { id: 'financial_exel', label: 'اکسل مالی', value: data?.financial_exel },
    { id: 'auditor_response', label: 'پاسخ حسابرس', value: data?.auditor_response },
    { id: 'warranty', label: 'ضمانت نامه', value: data?.warranty },
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
                {!agencyContract[item.id] ? (
                  <TextField
                    type="file"
                    fullWidth
                    inputProps={{ accept: '*' }}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        updateAgencyContractFile(item.id, e.target.files[0]);
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
                    <Typography>
                      {typeof agencyContract[item.id] === 'object' 
                        ? (
                          <span>{agencyContract[item.id].name}</span>
                        ) : (
                          <a
                            href={`${OnRun}/${agencyContract[item.id]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue', textDecoration: 'none' }}
                          >
                            {item.label} 📂
                          </a>
                        )
                      }
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      onClick={() => updateAgencyContractFile(item.id, null)}
                    >
                      تغییر فایل
                    </Button>
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

Contract.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Contract;
