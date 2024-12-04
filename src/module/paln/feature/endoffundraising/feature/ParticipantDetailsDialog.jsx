import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { formatNumber } from 'src/utils/formatNumbers';
import PropTypes from 'prop-types';
import UseCerParticipent from '../hooks/usePostCerParticipent';

const ParticipantDetailsDialog = ({ open, onClose, rowData, traceCode }) => {
  if (!rowData) return null;

  const { mutate, data, isLoading, error } = UseCerParticipent(traceCode);

  const handlePostCer = () => {
    if (rowData?.user) {
      mutate({ uniqueIdentifier: rowData.user });
    } else {
      console.error('User data is missing');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <span>جزئیات مشارکت</span>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <p className="font-bold">نام کاربر:</p>
            <p>{rowData.user_name}</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">شناسه ملی:</p>
            <p>{rowData.user}</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold">مبلغ:</p>
            <p>{formatNumber(rowData.value)}</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">نوع پرداخت:</p>
            <p>{rowData.document ? 'فیش بانکی' : 'درگاه'}</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">گواهی مشارکت:</p>
            <button 
              type="button" 
              onClick={handlePostCer}
              disabled={isLoading}
            >
              {isLoading ? 'در حال ایجاد...' : 'ایجاد'}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
            {data?.message && <p className="text-green-500">{data.message}</p>}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg
                   shadow-md hover:shadow-lg transition-colors duration-200 font-medium"
        >
          بستن
        </button>
      </DialogActions>
    </Dialog>
  );
};

ParticipantDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rowData: PropTypes.shape({
    user: PropTypes.string,
    user_name: PropTypes.string,
    value: PropTypes.number,
    document: PropTypes.bool,
  }),
  traceCode: PropTypes.string.isRequired,
};

export default ParticipantDetailsDialog;
