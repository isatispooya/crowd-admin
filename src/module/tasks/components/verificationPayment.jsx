import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import useVerificationPayment from '../hooks/VerificationPayment';
import usePostVerificationPayment from '../hooks/postVerificationPayment';
import { useState } from 'react';

const VerificationPayment = () => {
  const { data, isError, isPending } = useVerificationPayment();
  const { mutate, isPending: isPendingMutation } = usePostVerificationPayment();

  // Add state for managing comments
  const [comments, setComments] = useState({});

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">دریافت اطلاعات با خطا مواجه شد</Alert>;
  }

  const handleSubmit = (row) => {
    mutate({
      id: row.id,
      profit_payment_comment: comments[row.id] ?? row.profit_payment_comment,
      profit_payment_completed: !row.profit_payment_completed,
    });
  };

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
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.amount_operator}</TableCell>
              <TableCell>{row.date_capitalization_operator}</TableCell>
              <TableCell>{row.date_operator}</TableCell>
              <TableCell>{row.plan}</TableCell>
              <TableCell>
                <input
                  type="text"
                  value={(comments[row.id] ?? row.profit_payment_comment) || ''}
                  onChange={(e) => {
                    setComments((prev) => ({
                      ...prev,
                      [row.id]: e.target.value,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>{row.profit_payment_completed ? 'بله' : 'خیر'}</TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => handleSubmit(row)}
                  disabled={isPendingMutation}
                >
                  {row.profit_payment_completed ? 'لغو تکمیل' : 'تکمیل پرداخت'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VerificationPayment;
