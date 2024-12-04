import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import VerificationPayment from './components/verificationPayment';
import VerificationReceipt from './components/verificationReceipt';
import Warranty from './components/warranty';
import AuditReport from './components/auditReport';
import ProgressReport from './components/prgressReport';

const Tasks = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabsComponents = () => {
    switch (value) {
      case 0:
        return <VerificationPayment />;
      case 1:
        return <VerificationReceipt />;
      case 2:
        return <Warranty />;
      case 3:
        return <ProgressReport />;
      case 4:
        return <AuditReport />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">فرایند ها</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="چک های سرمایه پذیر" />
              <Tab label="پرداخت سود سرمایه گذار" />
              <Tab label="تمدید ضمانت نامه ها" />
              <Tab label="گزارش پیشرفت" />
              <Tab label="گزارش حسابرسی" />
            </Tabs>
            {renderTabsComponents()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
