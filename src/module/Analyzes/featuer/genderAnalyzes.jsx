import { FaCheckCircle, FaUser } from 'react-icons/fa';
import useGender from '../hook/useGender';

const GenderAnalyzes = () => {
  const { data: genderData } = useGender();
  return (
    <div className="p-2">
      <h2 className="text-base font-medium text-gray-700 mb-2">تحلیل جنسیتی</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded border border-gray-100 p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaCheckCircle className="text-emerald-500 text-sm" />
            <span className="text-xs text-gray-500">پرداخت‌های موفق</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">مرد</span>
              <span className="text-base font-semibold text-blue-600">
                {genderData?.successful_payments_gender?.data?.Male || '0'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">زن</span>
              <span className="text-base font-semibold text-pink-600">
                {genderData?.successful_payments_gender?.data?.Female || '0'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded border border-gray-100 p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaUser className="text-violet-500 text-sm" />
            <span className="text-xs text-gray-500">تعداد کاربران</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">مرد</span>
              <span className="text-base font-semibold text-blue-600">
                {genderData?.users_gender?.data?.Male || '0'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">زن</span>
              <span className="text-base font-semibold text-pink-600">
                {genderData?.users_gender?.data?.Female || '0'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderAnalyzes;
