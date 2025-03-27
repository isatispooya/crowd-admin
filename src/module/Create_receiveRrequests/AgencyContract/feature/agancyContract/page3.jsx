import React from 'react';
import { PropTypes } from 'prop-types';

const Page4 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
        <table className="table-auto w-full text-center border-collapse border border-gray-300 text-[22px]">
        <thead>
          <tr>
            <th className="border border-gray-300">ردیف</th>
            <th className="border border-gray-300">شرایط</th>
            <th className="border border-gray-300">توضیحات</th>
          </tr>
        </thead>

 

        <tbody className="border border-gray-300">
        <tr>
              <td className="border border-gray-300 text-[23px]">10</td>
              <td className="border border-gray-300 text-[23px]">ارائه گزارشات</td>
              <td className="border border-gray-300 text-[23px]">
                متقاضي متعهد است نسبت به ارائة گزارش عملكرد از پيشرفت فيزيكي-ريالي اجراي طرح به صورت
                سه ماهه و ارائه صورتهاي مالي طرح (حسابرسي نشده) به صورت شش ماهه و ارائة صورتهاي مالي
                طرح (حسابرسي شده توسط حسابرس) در انتهاي دوره اقدام نمايد.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[23px]">11</td>
              <td className="border border-gray-300 text-[23px]">مدت فراخوان جمع‌آوری وجوه</td>
              <td className="border border-gray-300 text-[23px]">
                مدت فراخوان جمع آوري وجوه به تشخيص عامل تعيين ميگردد اين دوره با نظر عامل براي يك
                مرتبه قابل تمديد است. لازم به ذكر است تاريخ شروع جمع آوري وجوه از طريق نامه كتبي به
                استحضار متقاضي خواهد رسيد.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[23px]">12</td>
              <td className="border border-gray-300 text-[23px]"> نرخ سود مشارکت اسمی </td>
              <td className="border border-gray-300 text-[23px]">
                {agencyContract.investor_request.annualized_profit_forecast * 100} درصد ساليانه.
                <br /> تبصره 7: متقاضي متعهد است در سررسيد گواهي شراكت مطابق با شرايط مندرج در
                قرارداد اقدامات اجرايي به محاسبة سود قطعي گواهي هاي شراكت اقدام نمايد و سود قطعي
                محاسبه شده را به تأييد حسابرس برساند.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[23px]">13</td>
              <td className="border border-gray-300 text-[23px]">ضامن </td>
              <td className="border border-gray-300 text-[23px]">
                ضامن معرفی شده توسط متقاضی که در قرارداد اقدامات اجرایی تعیین می شود.{' '}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

Page4.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page4;
