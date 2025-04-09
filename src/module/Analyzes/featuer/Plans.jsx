import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';

const Plans = () => {
  const [plans] = useState([
    {
      id: 1,
      name: 'طرح طلایی',
      status: 'فعال',
      users: 150,
      startDate: '1402/12/01',
      endDate: '1403/12/01',
    },
    {
      id: 2,
      name: 'طرح نقره‌ای',
      status: 'غیرفعال',
      users: 75,
      startDate: '1402/11/15',
      endDate: '1403/11/15',
    },
    {
      id: 3,
      name: 'طرح برنزی',
      status: 'فعال',
      users: 200,
      startDate: '1402/10/20',
      endDate: '1403/10/20',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'فعال':
        return 'success';
      case 'غیرفعال':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        لیست طرح‌ها
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام طرح</TableCell>
              <TableCell align="right">وضعیت</TableCell>
              <TableCell align="right">تعداد کاربران</TableCell>
              <TableCell align="right">تاریخ شروع</TableCell>
              <TableCell align="right">تاریخ پایان</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow
                key={plan.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{plan.name}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={plan.status}
                    color={getStatusColor(plan.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{plan.users}</TableCell>
                <TableCell align="right">{plan.startDate}</TableCell>
                <TableCell align="right">{plan.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Plans; 