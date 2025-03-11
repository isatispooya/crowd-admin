import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from 'react-bootstrap';
import { CheckCircle, Cancel, Edit } from '@mui/icons-material';
import CompanyBankInfo from './companyBankInfo';
import CompanyInfo from './companyInfo';
import CompanyRegister from './companyRegister';
import useGetCompanyInfo from '../service/service';

const BoardOfDirectorsRegistrationMain = () => {
  const { cartId } = useParams();
  const { data: companyInfo } = useGetCompanyInfo(cartId);

  const button = [
    {
      id: 1,
      label: 'ثبت ',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      id: 2,
      label: 'رد ',
      icon: <Cancel />,
      color: 'error',
    },
    {
      id: 3,
      label: ' اصلاح',
      icon: <Edit />,
      color: 'info',
    },
  ];

  return (
    <Box>
      <Accordion sx={{ boxShadow: 4, borderRadius: 1, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات شرکت
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyInfo companyInfo={companyInfo} />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات بانکی
          </Typography>
          <CompanyBankInfo data={companyInfo} />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            اطلاعات ثبت
          </Typography>
          <CompanyRegister data={companyInfo} />
        </AccordionDetails>
      </Accordion>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 8 }}>
        <TextField label="توضیحات" multiline rows={4} fullWidth type="textarea" />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          {button.map((item) => (
            <Button key={item.id} variant="outlined" color={item.color} startIcon={item.icon}>
              {item.label}
            </Button>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default BoardOfDirectorsRegistrationMain;
