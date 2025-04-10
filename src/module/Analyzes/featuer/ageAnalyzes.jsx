import { FaChartLine, FaBalanceScale, FaChartBar } from 'react-icons/fa';
import useAge from '../hook/useAge';

const AgeAnalyzes = () => {
  const { data: ageData } = useAge();
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-700 mb-4">تحلیل سنی کاربران</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded border border-gray-100 p-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaChartLine className="text-blue-500" />
            <span className="text-sm text-gray-500">میانگین سنی</span>
          </div>
          <p className="text-2xl font-semibold text-blue-600 text-center">
            {ageData?.average_age?.toFixed(2) || '0'}
          </p>
        </div>

        <div className="bg-white rounded border border-gray-100 p-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaBalanceScale className="text-emerald-500" />
            <span className="text-sm text-gray-500">میانه سنی</span>
          </div>
          <p className="text-2xl font-semibold text-emerald-600 text-center">
            {ageData?.median_age || '0'}
          </p>
        </div>

        <div className="bg-white rounded border border-gray-100 p-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaChartBar className="text-violet-500" />
            <span className="text-sm text-gray-500">انحراف معیار سنی</span>
          </div>
          <p className="text-2xl font-semibold text-violet-600 text-center">
            {ageData?.std_dev_age?.toFixed(2) || '0'}
          </p>
        </div>
        <div className="col-span-3">
          <p className="text-start text-sm font-medium text-gray-700">
            <span className="text-blue-600 text-lg">80%</span> سن کاربران مابین{' '}
            <span className="font-semibold  border-b-2 ">
              {((ageData?.average_age || 0) + (ageData?.std_dev_age || 0)).toFixed(1)}
            </span>{' '}
            و{' '}
            <span className="font-semibold  border-b-2 ">
              {((ageData?.average_age || 0) - (ageData?.std_dev_age || 0)).toFixed(1)}
            </span>{' '}
            میباشد
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeAnalyzes;
