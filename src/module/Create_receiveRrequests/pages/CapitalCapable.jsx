import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, CircularProgress, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CompanyInfoPage } from '../companyInfo/page';
import BoardofDirectorsPage from '../BoardOfDrectors/page';
import ExecutiveContractPage from '../ExecutiveContract/page';
import AdditionalInformationPage from '../AdditionalInformation/pages';
import AgencyContractPage from '../AgencyContract/page';
import { useGetCompanyInfo } from './service';

const CapitalCapable = () => {
  const { cartId } = useParams();

  const { data: companyInfo } = useGetCompanyInfo(cartId);

  const isLoading = !companyInfo;

  const handleCreateExecutiveContract = () => {
    console.log('createExecutiveContract');
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-center">
        <CircularProgress />
        <Typography component="span" sx={{ ml: 2 }}>
          در حال بارگذاری اطلاعات...
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <Box
        sx={{
          width: '100%',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginTop: '40px',
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">ثبت شرکت</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CompanyInfoPage
              companyInfo={companyInfo}
              handleCreateExecutiveContract={handleCreateExecutiveContract}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">ثبت هیئت مدیره</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <BoardofDirectorsPage data={companyInfo} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">اطلاعات تکمیلی</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalInformationPage data={companyInfo} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">قرارداد عاملیت</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgencyContractPage data={companyInfo} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">قرارداد اجرایی</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExecutiveContractPage data={companyInfo} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default CapitalCapable;
