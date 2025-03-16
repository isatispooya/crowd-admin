import { motion } from 'framer-motion';
import UseCartId from 'src/hooks/card_id';
import { useNavigate } from 'react-router-dom';
import CardFeature from '../feature/cartfeature';
import useGetCards from '../service/cartService';

const CardPage = () => {
  const { setCartId } = UseCartId([]);
  const { data: responseData } = useGetCards();
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setCartId(id);
    navigate(`/cartDetail/${id}`);
  };

  return (
    <div className=" sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">لیست درخواست ها</h1>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {responseData?.length > 0 &&
              responseData.map((card) => (
                <motion.div
                  key={card.id}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <CardFeature cardData={card} handleCardClick={handleCardClick} />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
