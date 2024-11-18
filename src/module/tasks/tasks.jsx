import { Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import VerificationPayment from './components/verificationPayment';
import VerificationReceipt from './components/verificationReceipt';

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
        return <h1>tdrufhfgfksfgnhfkgjghjf</h1>;
      case 3:
        return <h1>dfghjkhgfg</h1>;
      case 4:
        return <h1>dfghjkhgfg</h1>;
      default:
        return null;
    }
  };
  return (
    <Container>
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
    </Container>
  );
};

export default Tasks;
