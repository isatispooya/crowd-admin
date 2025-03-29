import React from 'react';
import { PropTypes } from 'prop-types';

const Page6 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
        <p className="text-[23px]">
          <span className="font-bold">تبصره ۳:</span> در صورت عدم ارائه گزارش پایانی یا گزارش
          حسابرسی طرح تا پایان مهلتهای مقرر کلیه سودهای پیش بینی شده طرح حال شده فرض گشته و سود پیش
          بینی شده معیار کلیه تسویه حسابها قرار خواهد گرفت در فرض اخیر خسارت عدم ارائه گزارش پایانی
          طرح توسط متقاضی پرداخت خواهد شد.
        </p>

        <p className="text-[23px]">
          6) متقاضی متعهد است امکان نظارت مستمر عامل و حضور در محل انجام فعالیتهای موضوع قرارداد در
          هر زمان به تشخیص عامل و دسترسی کامل به اطلاعات لازم را فراهم می کند.
        </p>
        <p className="text-[23px]">
          1) با عنایت به آنکه عامل صرفاً از طریق خدمات ارائه شده در بستر پلتفرم مقدمات تأمین مالی
          جمعی متقاضی و سرمایه گذاری را برای تأمین کنندگان فراهم می آورد، لذا هیچگونه مسئولیتی در
          قبال موفقیت کمپین نداشته و در صورت عدم موفقیت کمپین وجوه واریزی از جانب سرمایه گذاران را
          وفق مفاد این قرارداد به آنان مسترد خواهد نمود.
        </p>
      </div>
    </div>
  );
};

Page6.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page6;
