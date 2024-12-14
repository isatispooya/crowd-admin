import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableRow,
  InputLabel,
  Select,
  TableCell,
} from '@mui/material';
import * as React from 'react';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';
import { formatNumber } from 'src/utils/formatNumbers';
import { errorMsg } from './dargahmsg';
import { useDialogPopup } from './hooks/popup';

const DialogPopup = ({
  openDialog,
  setOpenDialog,
  selectedRow,
  setSelectedRow,
  statusSwitch,
  setStatusSwitch,
  status,
  localData,
  setLocalData,
  refetch,
  refetchReciept,
  setStatus,
}) => {
  const { handleConfirm, handlePostInquiry, respiet } = useDialogPopup(
    selectedRow,
    localData,
    setLocalData
  );

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusSwitch(newStatus);
    setStatus(newStatus);
  };

  const handleInquiryClick = async (id) => {
    await handlePostInquiry(id, refetchReciept);
    refetchReciept();
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogContent sx={{ p: 4, minWidth: '600px' }}>
        <FormControl fullWidth>
          <InputLabel>وضعیت</InputLabel>
          <Select value={status} onChange={handleStatusChange} label="وضعیت">
            <MenuItem value="0">رد شده</MenuItem>
            <MenuItem value="1">در حال بررسی</MenuItem>
            <MenuItem value="2">تایید موقت</MenuItem>
            <MenuItem value="3">تایید نهایی</MenuItem>
          </Select>
        </FormControl>

        {respiet && Array.isArray(respiet) && respiet.length > 0 ? (
          respiet.map((item, index) => (
            <Table key={index}>
              <TableBody>
                <TableRow>
                  <TableCell>نوع پرداخت</TableCell>
                  <TableCell>{item.document ? 'فیش' : 'درگاه'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>مقدار</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>شماره فاکتور</TableCell>
                  <TableCell>{item.payment_id}</TableCell>
                </TableRow>

                {item.document === false && (
                  <>
                    <TableRow>
                      <TableCell> شماره ارجاع درگاه</TableCell>
                      <TableCell>{item.reference_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>شماره پیگیری</TableCell>
                      <TableCell>{item.track_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>شماره کارت</TableCell>
                      <TableCell>{item.card_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>کد وضعیت درگاه</TableCell>
                      <TableCell>{item.code_status_payment}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell> وضعیت درگاه</TableCell>
                      <TableCell>{errorMsg[item.code_status_payment]}</TableCell>
                    </TableRow>
                  </>
                )}

                <TableRow>
                  <TableCell>مبلغ</TableCell>
                  <TableCell>{formatNumber(item.value)}</TableCell>
                </TableRow>
                {item.picture ? (
                  <TableRow>
                    <TableCell>دانلود فایل</TableCell>
                    <TableCell>
                      <a
                        href={`${OnRun}${item.picture}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#1976d2',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        دانلود فایل
                      </a>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <span className="text-sm mt-6">فایلی برای دانلود وجود ندارد</span>
                    </TableCell>
                  </TableRow>
                )}
                {item.document === false && (
                  <TableRow>
                    <TableCell>استعلام پرداخت</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleInquiryClick(item.id)}
                      >
                        دریافت
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ))
        ) : (
          <p>هیچ داده‌ای برای نمایش وجود ندارد.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirm(statusSwitch, setOpenDialog)} color="primary">
          تایید
        </Button>
        <Button onClick={() => setOpenDialog(false)} color="secondary">
          لغو
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogPopup.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func.isRequired,
  statusSwitch: PropTypes.string,
  status: PropTypes.string.isRequired,
  localData: PropTypes.array.isRequired,
  setLocalData: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  refetchReciept: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setStatusSwitch: PropTypes.func.isRequired,
};

export default DialogPopup;
