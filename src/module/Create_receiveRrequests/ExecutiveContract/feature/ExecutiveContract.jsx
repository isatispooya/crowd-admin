import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const banks = [
  { id: 1, name: 'بانک ملی ایران' },
  { id: 2, name: 'بانک سپه' },
  { id: 3, name: 'بانک صنعت و معدن' },
  { id: 4, name: 'بانک کشاورزی' },
  { id: 5, name: 'بانک مسکن' },
  { id: 6, name: 'بانک توسعه صادرات ایران' },
  { id: 7, name: 'بانک توسعه تعاون' },
  { id: 8, name: 'پست بانک ایران' },
  { id: 9, name: 'بانک اقتصاد نوین' },
  { id: 10, name: 'بانک پارسیان' },
  { id: 11, name: 'بانک کارآفرین' },
  { id: 12, name: 'بانک سامان' },
  { id: 13, name: 'بانک سینا' },
  { id: 14, name: 'بانک خاورمیانه' },
  { id: 15, name: 'بانک شهر' },
  { id: 16, name: 'بانک دی' },
  { id: 17, name: 'بانک صادرات ایران' },
  { id: 18, name: 'بانک ملت' },
  { id: 19, name: 'بانک تجارت' },
  { id: 20, name: 'بانک رفاه کارگران' },
  { id: 21, name: 'بانک حکمت ایرانیان' },
  { id: 22, name: 'بانک گردشگری' },
  { id: 23, name: 'بانک ایران زمین' },
  { id: 24, name: 'بانک قوامین' },
  { id: 25, name: 'بانک انصار' },
  { id: 26, name: 'بانک سرمایه' },
  { id: 27, name: 'بانک پاسارگاد' },
  { id: 28, name: 'بانک مشترک ایران-ونزوئلا' },
];

const ExecutiveContract = ({ data }) => {
  const initialFormData = {
    bank: '',
    bank_branch: '',
    bank_branch_code: '',
    evaluation: '',
    executive_contract: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        ...data,
        bank: banks.find((b) => b.name === data.bank || b.id === data.bank)?.id || '',
      }));
    }
  }, [data]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion sx={{borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' ,marginBottom: '10px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اطلاعات بانکی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>نام بانک</Typography>
              <Select name="bank" value={formData.bank} onChange={handleChange} fullWidth required>
                {banks.map((bank) => (
                  <MenuItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>شعبه</Typography>
              <TextField
                type="text"
                name="bank_branch"
                value={formData.bank_branch}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>کد شعبه</Typography>
              <TextField
                type="numbet"
                name="bank_branch_code"
                value={formData.bank_branch_code}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>گزارشات</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>ارزیابی</Typography>
              <TextField
                type="file"
                name="evaluation"
                value={formData.evaluation}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>قرارداد اجرایی</Typography>
              <TextField
                type="file"
                name="executive_contract"
                value={formData.executive_contract}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

ExecutiveContract.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExecutiveContract;
