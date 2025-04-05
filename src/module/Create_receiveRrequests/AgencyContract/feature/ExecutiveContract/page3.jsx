import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const Page3 = ({ data }) => {
  if (!data) return null;

  const renderContractClauses = () => {
    const { investor_request, one_year_return_on_investment } = data;

    const formatPercentage = (value) => (value ? `${value}%` : '0%');

    return (
      <div className="contract-clauses p-4 text-[23px] leading-relaxed">
        <p className="text-[23px]">
          تبصره 1: متقاضی تأیید و اقرار می‌نماید بنا به تخصص و با تکیه بر تجربه تاریخی حاصل از خرید
          دو دستگاه تراک 10 چرخ جهت حمل، به هیچ عنوان سود ناخالص حاصل از به‌کارگیری 250,000 میلیون
          ریال سرمایه در گردش مورد نیاز دستگاه بنز کمپرسی 10 چرخ ایران خودرو، کمتر از 181,588 میلیون
          ریال سالیانه نخواهد شد. بنابراین هرگونه تغییری در این روند صرفاً متوجه متقاضی خواهد بود و
          متقاضی حق هیچگونه ادعا و مطالبه‌ای در این خصوص نخواهد داشت.
          <br />
          تبصره 2: در پایان دوره، تمامی مطالبات حال شده و متقاضی تأیید و تعهد می‌نماید تمامی
          درآمدهای برآورد شده طی دوره یکسالۀ طرح به صورت نقدی می‌باشد.
          <br />
          تبصره 3: مبنای تقسیم سود ناخالص در هر بازه از جدول این بند میان متقاضی و عامل حاصل از
          اجرای طرح موضوع قرارداد، حداقل سود ناخالص در هر بازه خواهد بود. فقط در صورت افزایش سود
          ناخالص برآورد شده بیش از 181,588 ریال سالیانه، مابه‌تفاوت آن از سود برآورد شده به نسبت
          99.9 درصد سهم متقاضی و 0.1 درصد سهم عامل تقسیم خواهد شد.
          <br />
          تبصره 4: در صورتی که سود ناخالص طرح کمتر از سود علی‌حساب پرداختی باشد، متقاضی،
          مابه‌التفاوت آن را تا میزان سودهای علی‌الحساب پرداخت شده از محل سهم خود یا سایر دارایی‌های
          خود مجاناً و بلاعوض تأمین و به دارندگان گواهی‌های شراکت صلح می‌نماید. به استناد این تبصره
          متقاضی حق هرگونه ادعایی در این خصوص را از خود سلب و اسقاط نمود.
        </p>
        <h2 className="text-[23px] font-bold mb-2">بازدهی یک ساله طرح*</h2>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">نسبت تسهیم سود</th>
              <th className="border border-gray-300 p-2 text-left">رنج بازدهی</th>
              {one_year_return_on_investment?.map((item, index) => (
                <th key={index} className="border border-gray-300 p-2 text-left">
                  {item?.rate_from || '0'} تا {item?.rate_to || '0'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">سرمایه‌گذار</td>
              <td className="border border-gray-300 p-2" />
              {one_year_return_on_investment?.map((item, index) => (
                <td key={index} className="border border-gray-300 p-2">
                  {formatPercentage(item?.share_company)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">متقاضی</td>
              <td className="border border-gray-300 p-2" />
              {one_year_return_on_investment?.map((item, index) => (
                <td key={index} className="border border-gray-300 p-2">
                  {formatPercentage(item?.share_investor)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-[23px]">
          نرخ بازده سرمایه‌گذار: {formatPercentage(45)}-{formatPercentage(47)}
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 4) مبلغ تأمین مالی</h2>
        <p className="text-[23px]">
          1. مبلغ تأمین مالی انجام شده برای متقاضی {investor_request?.amount_of_investment} میلیون
          ریال گواهی شراکت 1,000 ریالی با اعتبار {investor_request?.duration_of_plan} ماهه، با نرخ
          سود علی‌الحساب {investor_request?.interest_rate_plan} درصد سالیانه (
          {investor_request?.interest_rate_plan && investor_request?.refund_of_plan
            ? (investor_request.interest_rate_plan / investor_request.refund_of_plan || 0).toFixed(
                2
              )
            : '0.00'}{' '}
          درصد دوره 3 ماهه) است. بازپرداخت سود علی الحساب طی {investor_request?.duration_of_plan}{' '}
          ماه به صورت ماهیانه و پرداخت اصل مبلغ گواهی شراکت در انتهای دوره سرمایه‌گذاری توسط متقاضی
          خواهد بود.
          <br />
          تبصره: لازم به ذکر است مبلغ {investor_request?.amount_of_investment} میلیون ریال، گواهی
          شراکت خریداری شده توسط متقاضی از مجموع گواهی‌های شراکت ابطال شده، و بنابراین هیچگونه سود و
          امتیازی به آن تعلق نمی‌گیرد.
        </p>
      </div>
    );
  };

  return <div className="contract-page page-3">{renderContractClauses()}</div>;
};

Page3.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.shape({
      title: PropTypes.string,
      national_id: PropTypes.string,
      economic_code: PropTypes.string,
      registration_number: PropTypes.string,
      address: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    investor_request: PropTypes.shape({
      logo: PropTypes.string,
      contract_number: PropTypes.string,
      agency_agreement_date: PropTypes.string,
      suggestion_plan_name: PropTypes.string,
      amount_of_investment: PropTypes.number,
      duration_of_plan: PropTypes.number,
      interest_rate_plan: PropTypes.number,
      refund_of_plan: PropTypes.number,
    }),
    one_year_return_on_investment: PropTypes.arrayOf(
      PropTypes.shape({
        rate_from: PropTypes.number,
        rate_to: PropTypes.number,
        share_company: PropTypes.number,
        share_investor: PropTypes.number,
      })
    ),
    company_cost: PropTypes.shape({
      description: PropTypes.string,
      amount_of_months: PropTypes.number,
      amount_of_year: PropTypes.number,
    }),
    profit_and_loss_forecast: PropTypes.shape({
      description: PropTypes.string,
      amount_of_year: PropTypes.number,
      amount_of_months: PropTypes.number,
    }),
    guarantor: PropTypes.shape({
      guarantor_name: PropTypes.string,
      national_id: PropTypes.string,
      phone_number: PropTypes.string,
      birth_date: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    company_members: PropTypes.shape({
      person_title: PropTypes.string,
      uniqueIdentifier: PropTypes.string,
      signture_document: PropTypes.string,
    }),
  }).isRequired,
};

export default Page3;
