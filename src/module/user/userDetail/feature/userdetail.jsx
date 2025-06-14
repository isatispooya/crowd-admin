import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import useUserPermissions from 'src/hooks/usePermission';
import Addresses from './addresses';
import FinancialInfo from './financialInfo';
import JobInfo from './jobInfo';
import PrivatePerson from './privatePerson';
import TradingCodes from './tradingcodes';
import Refresh from './refreshDetails';
import usePostOtpUser from '../service/usePostOtpUser';
import useGetUserDetail from '../service/useGetUserDetail';
import UserAccounts from './userAccounts';
import useOneTimeLogin from '../hooks/useOneTime';
import CompanyDetails from './companyDetails';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  flexDirection: 'row-reverse',
  padding: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'center',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const UserDetail = () => {
  const [expandedPanel, setExpandedPanel] = React.useState(false);

  const [showRefresh, setShowRefresh] = useState(false);
  const { mutate } = usePostOtpUser();
  const { userId } = useParams();
  const { data, isLoading, refetch } = useGetUserDetail(userId);
  const { checkPermission } = useUserPermissions();
  const nationalCode = data?.private_person?.[0]?.uniqueIdentifier;
  const uniqueIdentifier = data?.uniqueIdentifier;
  const { mutate: oneTimeLogin } = useOneTimeLogin();

  const handleOneTimeLogin = () => {
    oneTimeLogin({
      uniqueIdentifier,
    });
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpandedPanel(newExpanded ? panel : false);
  };

  const openModal = () => {
    mutate(nationalCode);
    setShowRefresh(true);
  };

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  const sections = [
    { id: 'private', label: 'اطلاعات شخصی', component: <PrivatePerson /> },
    { id: 'address', label: 'اطلاعات آدرس', component: <Addresses /> },
    { id: 'financial', label: 'اطلاعات مالی', component: <FinancialInfo /> },
    { id: 'job', label: 'اطلاعات شغلی', component: <JobInfo /> },
    { id: 'trading', label: 'کدهای معاملاتی', component: <TradingCodes /> },
    { id: 'accounts', label: 'اطلاعات بانکی', component: <UserAccounts /> },
    { id: 'companies', label: 'اطلاعات شرکت', component: <CompanyDetails /> },
  ];

  const permissions = checkPermission(['authentication.can_access_user_dashboard']);

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          padding: 2,
          borderRadius: '12px',
          boxShadow: 3,
          width: '90%',
          margin: '0 auto',
          backgroundColor: '#fff',
        }}
      >
        <Box className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
          <Typography variant="h4" className="text-gray-700 font-bold">
            اطلاعات کاربر
          </Typography>
          {permissions && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              onClick={handleOneTimeLogin}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ورود به کارتابل کاربر
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={openModal}
            whileHover={{ rotate: 180, scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
            className="absolute top-5 left-20 ml-3 transition-colors p-3 text-white font-medium hover:scale-110 duration-700"
          >
            <AutoModeIcon className="text-black text-3xl" />
          </motion.button>
          {showRefresh && <Refresh setShowRefresh={setShowRefresh} />}
        </Box>

        {sections.map(({ id, label, component }) => (
          <Accordion key={id} expanded={expandedPanel === id} onChange={handleChange(id)}>
            <AccordionSummary aria-controls={`panel-${id}-content`} id={id}>
              <Typography
                sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center', width: '100%' }}
              >
                {label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{component}</AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <ToastContainer />
    </>
  );
};

export default UserDetail;
