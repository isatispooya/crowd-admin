import { motion } from 'framer-motion';
import UseCartId from 'src/hooks/card_id';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsArchive, BsArchiveFill, BsInbox, BsInboxFill, BsGrid } from 'react-icons/bs';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_materialize.min.css';
import { OnRun } from 'src/api/OnRun';
import Nonlogo from '../feature/Artboard 1 copy 3.png';
import useGetCards from '../service/cartService';

const CardPage = () => {
  const { setCartId } = UseCartId([]);
  const { data: responseData } = useGetCards();
  const navigate = useNavigate();
  const [filterArchived, setFilterArchived] = useState(false);

  const handleCardClick = (id) => {
    setCartId(id);
    navigate(`/cartDetail/${id}`);
  };

  const investorRequests = responseData?.investor_requests || [];
  const filteredRequests = investorRequests.filter((request) => {
    if (filterArchived === 'all') return true;
    return request.archive === filterArchived;
  });

  const columns = [
    {
      title: 'لوگو',
      field: 'logo',
      formatter: (cell) => {
        const logo = cell.getValue();
        return `<img src="${logo ? `${OnRun}/${logo}` : Nonlogo}" alt="logo" class="w-12 h-12 " />`;
      },
      width: 100,
      headerSort: false,
    },

    {
      title: 'نام پشنهادی طرح',
      field: 'suggestion_plan_name',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => `<div>${cell.getValue() || 'نوع طرح نامشخص'}</div>`,
    },
    {
      title: 'شماره قرارداد',
      field: 'contract_number',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => `<div>${cell.getValue() || 'نامشخص'}</div>`,
    },
    {
      title: 'مبلغ طرح',
      field: 'amount_of_investment',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<div>${
          value ? `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ریال` : 'نامشخص'
        }</div>`;
      },
    },
    {
      title: ' وضعیت پرداخت',
      field: 'code-status',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<div>${value === 'success' ? 'موفق' : 'ناموفق'}</div>`;
      },
    },
    {
      title: 'نام شرکت',
      field: 'company.title',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => `<div>${cell.getValue() || 'نامشخص'}</div>`,
    },

    {
      title: 'شناسه شرکت',
      field: 'company.national_id',
      headerFilter: 'input',
      filter: 'contains',
      formatter: (cell) => `<div>${cell.getValue() || 'نامشخص'}</div>`,
    },
  ];

  const options = {
    layout: 'fitColumns',
    responsiveLayout: 'hide',
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 50],
    movableColumns: true,
    resizableColumns: true,
    initialSort: [{ column: 'suggestion_plan_name', dir: 'asc' }],
    rowClick: (e, row) => handleCardClick(row.getData().id),
  };

  return (
    <div className="sm:p-2 lg:p-2 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-2 sm:p-4 lg:p-6 max-w-8xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-2 sm:p-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">لیست درخواست ها</h1>
        </div>
        <div className="p-4 sm:p-6 flex justify-center space-x-4 rtl:space-x-reverse">
          <motion.button
            type="button"
            onClick={() => setFilterArchived(false)}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm ${
              filterArchived === false ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: filterArchived === false ? [0, 10, 0] : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              {filterArchived === false ? <BsInboxFill size={16} /> : <BsInbox size={16} />}
            </motion.span>
            فعال
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setFilterArchived('all')}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm ${
              filterArchived === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: filterArchived === 'all' ? [0, 10, 0] : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              <BsGrid size={16} />
            </motion.span>
            همه
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setFilterArchived(true)}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm ${
              filterArchived === true ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: filterArchived === true ? [0, 10, 0] : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              {filterArchived === true ? <BsArchiveFill size={16} /> : <BsArchive size={16} />}
            </motion.span>
            آرشیو
          </motion.button>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {filteredRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <ReactTabulator
                data={filteredRequests}
                columns={columns}
                options={options}
                className="custom-tabulator"
              />
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">درخواستی با این فیلتر یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPage;
