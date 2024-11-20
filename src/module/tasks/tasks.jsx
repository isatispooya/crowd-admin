import { Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import VerificationPayment from './components/verificationPayment';
import VerificationReceipt from './components/verificationReceipt';

const Tasks = () => {
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([]);

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
        return <h1>تمدید ضمانت نامه ها</h1>;
      case 3:
        return <h1>گزارش پیشرفت سه ماهه</h1>;
      case 4:
        return <h1>گزارش حسابرسی شش ماهه</h1>;
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
              <Tab label="گزارش پیشرفت سه ماهه" />
              <Tab label="گزارش حسابرسی شش ماهه" />
            </Tabs>
            {renderTabsComponents()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
