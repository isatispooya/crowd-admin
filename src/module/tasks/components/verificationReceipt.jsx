import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useVerificationReceipt from '../hooks/VerificationReceipt';

const VerificationReceipt = () => {
  const { data, isError, isPending } = useVerificationReceipt();

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">خطا در دریافت اطلاعات</Alert>;
  }
  console.log(data, '123456789098765432');
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>مبلغ</TableCell>
            <TableCell>تاریخ سود سرمایه گذار</TableCell>
            <TableCell>تاریخ</TableCell>
            <TableCell>طرح</TableCell>
            <TableCell>کامنت</TableCell>
            <TableCell>سود پرداخت تکمیل شده</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.amount_operator}</TableCell>
              <TableCell>{row.date_capitalization_operator}</TableCell>
              <TableCell>{row.date_operator}</TableCell>
              <TableCell>{row.plan}</TableCell>
              <TableCell>{row.profit_payment_comment}</TableCell>
              <TableCell>{row.profit_payment_completed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VerificationReceipt;
