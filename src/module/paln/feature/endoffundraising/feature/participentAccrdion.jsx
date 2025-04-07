/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import useGetParticipationsTable from 'src/module/paln/service/participantcertifit/usePostparticipant';
import { motion, AnimatePresence } from 'framer-motion';
import { localeText } from 'src/module/tasks/consts/localText';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import ParticipantDetailsDialog from './ParticipantDetailsDialog';
import usePostFinishPlanSms from '../hooks/usePostFinishPlanSms';

const ParticipentAccrdion = ({ form }) => {
  const { trace_code } = useParams();
  const { data, isError, isSuccess, mutate } = useGetParticipationsTable(trace_code);
  const { mutate: finishSms } = usePostFinishPlanSms(trace_code);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [sendStatusFilter, setSendStatusFilter] = useState('all');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSend = () => {
    const selectedData = data
      .filter((row) => selectedRows.includes(row.track_id))
      .map((row) => row.id);

    mutate({
      data: selectedData,
      traceCode: trace_code,
    });
    setShowConfirm(false);
  };

  const handleFinishSms = () => {
    finishSms();
    setShowConfirm(false);
  };

  const columns = [
    {
      field: 'selection',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(params.row.track_id)}
          onChange={(e) => {
            if (e.target.checked) {
              if (selectedRows.length < 3) {
                setSelectedRows([...selectedRows, params.row.track_id]);
              }
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== params.row.track_id));
            }
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 cursor-pointer"
          style={{ transform: 'scale(1.5)' }}
          disabled={!selectedRows.includes(params.row.track_id) && selectedRows.length >= 3}
        />
      ),
    },
    {
      field: 'amount',
      headerName: 'مقدار',
      flex: 1,
    },
    {
      field: 'value',
      headerName: 'مبلغ',
      flex: 1,
    },
    {
      field: 'document',
      headerName: 'نوع پرداخت',
      flex: 1,
      valueFormatter: (params) => (params.value ? 'فیش بانکی' : 'درگاه'),
    },
    {
      field: 'provided_finance_price_farabourse',
      headerName: 'مبلغ تایید شده',
      flex: 1,
    },
    {
      field: 'send_farabours',
      headerName: 'وضعیت ارسال به فرابورس',
      flex: 1,
      renderCell: (params) => {
        const value = params.row.send_farabours;
        return <span>{value ? 'ارسال شده' : 'ارسال نشده'}</span>;
      },
    },
    {
      field: 'track_id',
      headerName: 'شماره پیگیری',
      flex: 1,
    },
    {
      field: 'trace_code_payment_farabourse',
      headerName: 'شماره پیگیری فرابورس',
      flex: 1,
    },
    {
      field: 'message_farabourse',
      headerName: 'پیام فرابورس',
      flex: 1,
    },
    {
      field: 'error_no_farabourse',
      headerName: 'خطای فرابورس',
      flex: 1,
    },
    {
      field: 'user_name',
      headerName: 'نام کاربر',
      flex: 1,
    },
    {
      field: 'user',
      headerName: 'شناسه ملی کاربر',
      flex: 1,
    },
  ];

  const filteredData = data?.filter((row) => {
    const matchPaymentType =
      paymentTypeFilter === 'all' ||
      (paymentTypeFilter === 'bank' && row.document) ||
      (paymentTypeFilter === 'gateway' && !row.document);

    const matchSendStatus =
      sendStatusFilter === 'all' ||
      (sendStatusFilter === 'sent' && row.send_farabours === true) ||
      (sendStatusFilter === 'notSent' && row.send_farabours === false);

    return matchPaymentType && matchSendStatus;
  });

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="paymentType" className="text-gray-700">
              نوع پرداخت:
            </label>
            <select
              id="paymentType"
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">همه</option>
              <option value="bank">فیش بانکی</option>
              <option value="gateway">درگاه</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sendStatus" className="text-gray-700">
              وضعیت ارسال:
            </label>
            <select
              id="sendStatus"
              value={sendStatusFilter}
              onChange={(e) => setSendStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">همه</option>
              <option value="sent">ارسال شده</option>
              <option value="notSent">ارسال نشده</option>
            </select>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                   shadow-md hover:shadow-lg transition-all duration-200 font-medium
                   flex items-center gap-2"
          onClick={handleFinishSms}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          ارسال تاییده
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          disabled={selectedRows.length === 0}
          className={`px-6 py-2 ${
            selectedRows.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg
                   shadow-md hover:shadow-lg transition-all duration-200 font-medium
                   flex items-center gap-2`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          ارسال به فرابورس
        </button>
      </div>

      {isSuccess && filteredData && (
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.track_id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          disableColumnMenu
          filterMode="client"
          localeText={localeText}
          autoHeight
          onRowClick={(params) => {
            setSelectedRow(params.row);
            setShowDetails(true);
          }}
          getRowClassName={(params) =>
            selectedRows.includes(params.row.track_id) ? 'bg-blue-50' : ''
          }
          slots={{
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={filteredData}
                fileName="گزارش-مشارکت‌کنندگان"
              />
            ),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      )}

      {isError && <div className="text-red-500">خطا در دریافت اطلاعات</div>}

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 pt-40"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">تایید ارسال</h3>
                <p className="text-gray-500 ">آیا از ارسال به فرابورس اطمینان دارید؟</p>
                <p className="text-red-500  mb-6">این عملیات بدون بازگشت هست</p>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                           shadow-md hover:shadow-lg transition-colors duration-200 font-medium"
                  onClick={handleSend}
                >
                  بله، ارسال شود
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg
                           shadow-md hover:shadow-lg transition-colors duration-200 font-medium"
                  onClick={() => setShowConfirm(false)}
                >
                  انصراف
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticipantDetailsDialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        rowData={selectedRow}
        traceCode={trace_code}
      />
    </div>
  );
};

export default ParticipentAccrdion;
