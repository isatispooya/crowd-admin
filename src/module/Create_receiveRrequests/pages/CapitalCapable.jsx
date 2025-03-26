import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgress, Paper, Container, alpha } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CompanyInfoPage } from '../companyInfo/page';
import BoardofDirectorsPage from '../BoardOfDrectors/page';
import ExecutiveContractPage from '../ExecutiveContract/page';
import AdditionalInformationPage from '../AdditionalInformation/pages';
import AgencyContractPage from '../AgencyContract/page';
import { useGetCompanyInfo } from './service';
import FeesPage from '../Fees/page';

const CapitalCapable = () => {
  const { cartId } = useParams();

  const { data: companyInfo, refetch } = useGetCompanyInfo(cartId);
  const investorRequest = companyInfo?.investor_request;
  const isLoading = !companyInfo;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-center">
        <CircularProgress color="primary" thickness={4} size={48} />
        <Typography component="span" sx={{ ml: 2, fontWeight: 500, fontSize: '1.1rem' }}>
          در حال بارگذاری اطلاعات...
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className="py-6">
      <Paper
        elevation={0}
        sx={{
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
          border: '1px solid #eaedf2',
          pt: 2,
          pb: 4,
        }}
      >
        <div className="w-full flex justify-center items-center sticky top-0 z-10 py-4 mb-4 bg-white shadow-sm">
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.4rem',
              fontWeight: 700,
              zIndex: 1000,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '80%',
                height: '3px',
                bottom: '-8px',
                left: '10%',
                backgroundColor: 'primary.main',
                borderRadius: '10px',
              },
            }}
          >
            {investorRequest?.suggestion_plan_name}
          </Typography>
        </div>

        {['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6'].map((panel, index) => {
          const titles = [
            'ثبت شرکت',
            'ثبت هیئت مدیره',
            'اطلاعات تکمیلی',
            'قرارداد عاملیت',
            'قرارداد اجرایی',
            'کارمزد ها',
          ];
          const contents = [
            <CompanyInfoPage companyInfo={investorRequest} />,
            <BoardofDirectorsPage data={investorRequest} />,
            <AdditionalInformationPage data={investorRequest} />,
            <AgencyContractPage data={investorRequest} />,
            <ExecutiveContractPage
              allData={companyInfo}
              data={investorRequest}
              refetch={refetch}
            />,
            <FeesPage data={investorRequest} />,
          ];

          return (
            <Accordion
              key={panel}
              expanded={expanded === panel}
              onChange={handleChange(panel)}
              sx={{
                mb: 2,
                mx: 3,
                boxShadow: expanded === panel ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                borderRadius: '12px!important',
                overflow: 'hidden',
                border: '1px solid #eaedf2',
                transition: 'all 0.3s ease',
                '&:before': {
                  display: 'none',
                },
                '&:hover': {
                  backgroundColor: alpha('#f5f7fa', 0.8),
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ArrowDownwardIcon
                    sx={{
                      transform: expanded === panel ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: expanded === panel ? 'primary.main' : 'text.secondary',
                    }}
                  />
                }
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
                sx={{
                  backgroundColor: expanded === panel ? alpha('#f0f7ff', 0.5) : 'transparent',
                  borderBottom: expanded === panel ? '1px solid #eaedf2' : 'none',
                  transition: 'all 0.3s ease',
                  borderRadius: '12px',
                  minHeight: '60px',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: expanded === panel ? 600 : 500,
                    color: expanded === panel ? 'primary.main' : 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600">
                    {index + 1}
                  </span>
                  {titles[index]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: '#ffffff' }}>
                {contents[index]}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </Container>
  );
};

export default CapitalCapable;
