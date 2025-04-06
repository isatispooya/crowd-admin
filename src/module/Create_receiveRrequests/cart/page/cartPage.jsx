import { motion } from 'framer-motion';
import UseCartId from 'src/hooks/card_id';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CardFeature from '../feature/cartfeature';
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

  return (
    <div className="sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">لیست درخواست ها</h1>
        </div>
        <div className="p-4 sm:p-6 flex justify-center space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => setFilterArchived(false)}
            className={`px-4 py-2 rounded-lg ${
              filterArchived === false ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            فعال
          </button>
          <button
            type="button"
            onClick={() => setFilterArchived('all')}
            className={`px-4 py-2 rounded-lg ${
              filterArchived === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            همه
          </button>
          <button
            type="button"
            onClick={() => setFilterArchived(true)}
            className={`px-4 py-2 rounded-lg ${
              filterArchived === true ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            آرشیو
          </button>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                  onClick={() => handleCardClick(request.id)}
                >
                  <CardFeature cardData={request} handleCardClick={handleCardClick} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                درخواستی با این فیلتر یافت نشد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
