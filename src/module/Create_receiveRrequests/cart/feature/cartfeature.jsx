import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { OnRun } from 'src/api/OnRun';
import Nonlogo from './Artboard 1 copy 3.png';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' },
};

const CardFeature = ({ handleCardClick, cardData }) => (
  <motion.div
    className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-200 rounded-2xl p-6 shadow-lg cursor-pointer overflow-hidden relative"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    onClick={() => handleCardClick()}
  >
    <div className="flex items-center gap-4 mb-5">
      <motion.img
        src={cardData?.logo ? `${OnRun}/${cardData.logo}` : Nonlogo}
        alt={cardData?.company?.title || 'بدون نام'}
        className="w-20 h-20 object-contain rounded-full border-2 border-purple-300 p-1 bg-white"
      />
      <p className="text-xl font-bold text-indigo-800 truncate">
        {cardData.suggestion_plan_name || 'طرح نامشخص'}
      </p>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-purple-600 font-medium">شناسه ملی:</p>
        <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
          {cardData.company.national_id || 'نامشخص'}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-purple-600 font-medium">سرمایه:</p>
        <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
          {(cardData.amount_of_investment)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 'نامشخص'} ریال
        </span>
      </div>
    </div>

    <motion.div
      className="mt-5 text-center"
    >
      <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:from-indigo-600 hover:to-purple-600">
        مشاهده جزئیات
      </span>
    </motion.div>
  </motion.div>
);

CardFeature.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  cardData: PropTypes.object.isRequired,
};

export default CardFeature;
