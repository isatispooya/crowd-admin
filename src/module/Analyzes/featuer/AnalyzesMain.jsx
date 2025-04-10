import { Divider } from '@mui/material';
import AgeAnalyzes from './ageAnalyzes';
import GenderAnalyzes from './genderAnalyzes';
import CityAnalyzes from './cityAnalyzes';

const AnalyzesMain = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold text-gray-800 mb-8">تحلیل‌های جمعیتی</h1>
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <AgeAnalyzes />
      </div>
      <Divider />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <GenderAnalyzes />
      </div>
      <Divider />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <CityAnalyzes />
      </div>
    </div>
  </div>
);

export default AnalyzesMain;
