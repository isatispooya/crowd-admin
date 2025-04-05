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
      <div className="contract-clauses p-4 text-sm leading-relaxed">
        <h2 className="text-lg font-bold mb-2">بازدهی یک ساله طرح*</h2>
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

        <p className="mt-4">
          نرخ بازده سرمایه‌گذار: {formatPercentage(45)}-{formatPercentage(47)}
        </p>

        <h2 className="text-lg font-bold mt-4 mb-2">ماده 4) مبلغ تأمین مالی</h2>
        <p>
          1. مبلغ تأمین مالی انجام شده برای متقاضی {investor_request?.amount_of_investment} میلیون
          ریال گواهی شراکت 1,000 ریالی با اعتبار {investor_request?.duration_of_plan} ماهه، با نرخ
          سود علی‌الحساب {investor_request?.interest_rate_plan} درصد سالیانه (
          {(investor_request?.interest_rate_plan / (investor_request?.refund_of_plan || 4)).toFixed(
            2
          )}{' '}
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
