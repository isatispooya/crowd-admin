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
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Contract = ({ data }) => {
  const { agencyContract, updateAgencyContractFile, initializeStore } = useCompanyInfoStore();

  useEffect(() => {
    if (data) {
      initializeStore(data);
    }
  }, [data, initializeStore]);

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const links = [
    { id: 1, title: 'قرارداد عاملیت', path: `/agency/${data?.uuid}` },
    { id: 3, title: 'نامه بانکی', path: `/bankLetter/?uuid=${data?.uuid}` },
    { id: 4, title: 'قرارداد اجرایی', path: `/executiveContract/${data?.uuid}` },
    { id: 5, title: 'قرارداد محاربت', path: `/WarTreaty/${data?.uuid}` },
  ];

  const uploadLabels = [
    {
      id: 'agency_agreement_date',
      label: 'تاریخ',
      value: data?.agency_agreement_date,
      type: 'date',
    },
    {
      id: 'bank_letter_number',
      label: 'شماره نامه بانک',
      value: data?.bank_letter_number,
      type: 'text',
    },
    {
      id: 'account_number_letter',
      label: 'نامه شماره حساب',
      value: data?.account_number_letter,
      type: 'file',
    },
    { id: 'financial_exel', label: 'اکسل مالی', value: data?.financial_exel, type: 'file' },
    { id: 'auditor_response', label: 'پاسخ حسابرس', value: data?.auditor_response, type: 'file' },
    { id: 'warranty', label: 'ضمانت نامه', value: data?.warranty, type: 'file' },
  ];

  const renderFieldByType = (item) => {
    if (item.type === 'date') {
      let dateValue = null;
      if (agencyContract.agency_agreement_date) {
        if (typeof agencyContract.agency_agreement_date === 'string') {
          dateValue = new DateObject({
            date: agencyContract.agency_agreement_date,
            calendar: persian,
            locale: persian_fa,
          });
        } else {
          dateValue = agencyContract.agency_agreement_date;
        }
      }

      return (
        <div style={{ width: '100%' }}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            style={{ width: '100%' }}
            value={dateValue}
            onChange={(date) => updateAgencyContractFile('agency_agreement_date', date)}
          />
        </div>
      );
    }

    if (item.type === 'file' && agencyContract[item.id]) {
      return (
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
            {typeof agencyContract[item.id] === 'object' ? (
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
            )}
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
      );
    }

    if (item.type === 'text' && agencyContract[item.id]) {
      return (
        <TextField
          fullWidth
          value={agencyContract[item.id]}
          onChange={(e) => updateAgencyContractFile(item.id, e.target.value)}
        />
      );
    }

    return (
      <TextField
        type={item.type === 'file' ? 'file' : item.type}
        fullWidth
        inputProps={{ accept: item.type === 'file' ? '*' : undefined }}
        onChange={(e) => {
          if (item.type === 'file') {
            if (e.target.files.length > 0) {
              updateAgencyContractFile(item.id, e.target.files[0]);
            }
          } else {
            updateAgencyContractFile(item.id, e.target.value);
          }
        }}
      />
    );
  };

  const isButtonsDisabled =
    !agencyContract.bank_letter_number || !agencyContract.agency_agreement_date;

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
                to={link.path}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                variant="outlined"
                sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
                disabled={link.id === 3 ? isButtonsDisabled : false}
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
                {renderFieldByType(item)}
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
