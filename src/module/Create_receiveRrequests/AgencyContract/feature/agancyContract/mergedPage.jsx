import React from 'react';
import { PropTypes } from 'prop-types';

const MergedPage = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page a4-page">
      <div className="text-justify leading-tight text-[8px]">
        {/* Content from Page 7 */}
        <p className="mb-1 pr-2">
          <span className="font-bold">2)</span>
          متقاضي متعهد است در زمان امضاي قرارداد كليه مدارك لازم جهت تهيه گزارشات لازم كه توسط عامل
          تعيين ميشود، ظرف <strong>سه روز</strong> از تاريخ اعلامي تحويل عامل دهد.
        </p>

        <p className="mb-1 pr-2">
          <span className="font-bold">13)</span>
          متقاضي اقرار و تعهد مي كند كه دعاوي مؤثر با اهميت حقوقي يا كيفري عليه شركت، اعضاي هيات
          مديره يا مديرعامل وي كه موجب اخلال در اجراي موضوع قرارداد مي باشد وجود ندارد.
        </p>

    

        <h3 className="font-bold my-1">ماده 8) تعهدات و تأییدات عامل </h3>

       
        <p className="mb-1 pr-2">
          <span className="font-bold">تبصره 16</span>
          فروش گواهي هاي شراكت منوط به تأييد طرح توسط شركت فرابورس ايران است.
        </p>

        <h3 className="font-bold my-1">ماده 9) شرایط اتمام قرارداد </h3>

      </div>
    </div>
  );
};

MergedPage.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default MergedPage;
