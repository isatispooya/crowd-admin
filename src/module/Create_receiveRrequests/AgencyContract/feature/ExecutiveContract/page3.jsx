/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';


import { formatMillionRials, formatPercentage } from '../../utils/formatters_func';

const Page3 = ({ data }) => {
  if (!data) return null;

  const renderContractClauses = () => {
    const { investor_request, one_year_return_on_investment } = data;

    return (
      <div className="contract-clauses p-4 text-[23px] leading-relaxed">
        <table className="w-full border-collapse border border-gray-300 mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-right">شرح</th>
              <th className="border border-gray-300 p-2 text-right">سه ماهه</th>
              <th className="border border-gray-300 p-2 text-right">سال</th>
            </tr>
          </thead>

          <tbody className="text-[23px]">
            <tr>
              <td className="border border-gray-300 p-2">پیش بینی درآمد کل</td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(investor_request?.three_months_total_income_forecast)}
              </td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(investor_request?.annual_total_income_forecast)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">پیش بینی هزینه کل</td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(investor_request?.three_months_total_cost_forecast)}
              </td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(investor_request?.annual_total_cost_forecast)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">پیش بینی سود ناخالص طرح</td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(
                  investor_request?.three_months_gross_profit_of_the_plan_forecast
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(investor_request?.annual_gross_profit_of_the_plan_forecast)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">پیش بینی حاشیه سود طرح</td>
              <td className="border border-gray-300 p-2">
                {formatPercentage(
                  investor_request?.three_months_profit_margin_of_the_plan_forecast
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {formatPercentage(investor_request?.annual_profit_margin_of_the_plan_forecast)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">پیش بینی نسبت حقوق صاحبان سهام</td>
              <td className="border border-gray-300 p-2">
                {formatPercentage(
                  investor_request?.three_months_shareholders_equity_ratio_forecast
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {formatPercentage(investor_request?.annual_shareholders_equity_ratio_forecast)}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          تبصره 1: ترکیب فروش موضوع {investor_request?.suggestion_plan_name?.toLocaleString()} با
          تأیید عامل، به صلاحدید متقاضی خواهد بود، اما جمع درآمد حاصل از فروش مندرج در جدول فوق به
          مبلغ {investor_request?.annual_total_income_forecast?.toLocaleString()} میلیون ریال
          سالیانه و {investor_request?.three_months_total_income_forecast?.toLocaleString()} میلیون
          ریال دوره سه ماهه توسط متقاضی تضمین شده است.
          <br />
          تبصره 2: متقاضی متعهد است از محل فروش محصولات مندرج در جدول فوق، درآمدی جمعاً به مبلغ
          حداقل {investor_request?.annual_total_income_forecast?.toLocaleString()} (
          {investor_request?.three_months_total_income_forecast?.toLocaleString()}) میلیون ریال
          سالیانه (دوره سه ماهه) محقق نماید و در صورت عدم تحقق درآمد مذکور به هر علت و جهتی، متقاضی
          درآمد برآورد شده را از محل سایر دارایی‌های خود در شرکت تضمین می‌نماید.
        </p>
        <p>
          <br />
          تبصر ه 3: با توجه به اینکه مبلغ بهای تمام شده فروش محصولات و مبلغ مندرج در جدول فوق بر
          اساس اطلاعات صورت‌های مالی منتهی به 29 اسفند 1402 و اطلاعات اظهار شده توسط متقاضی محاسبه
          گردیده است، متقاضی تأیید و اقرار می‌نماید هرگونه انحرافی در خصوص کاهش مبلغ فروش و افزایش
          مبلغ بهای تمام شده به هر علت و جهتی، تماماً متوجه متقاضی خواهد بود و متقاضی متعهد به تأمین
          مابه‌التفاوت آن از سایر دارایی‌های خود می‌باشد و به واسطۀ این تبصره حق هرگونه اعتراضی را
          از خود سلب و اسقاط نمود.
          <br />
          تبصره 4: متقاضی تأیید و اقرار می‌نماید در صورت افزایش دورۀ وصول مطالبات، تمامی مطالبات
          وصول نشده، حال شده فرض خواهد شد.
          <br />
          تبصره 5: متقاضی با تأیید عامل مخیر است در صورت محیا نشدن محصولات موضوع این طرح{' '}
          {investor_request?.suggestion_plan_name}، آن را به صورت سایر انواع محصولات و خدمات مندرج
          در صورت‌های مالی تولید ارائه نماید و به فروش رساند و حداقل مبلغ سود ناخالص برآورد شده در
          قرارداد حاضر را ایجاد کند.
        </p>

        <p>
          <p>
            <span className="text-[23px] font-bold">1.</span>
            سود ناخالص (دوره سه ماهه){' '}
            {formatMillionRials(
              investor_request?.three_months_gross_profit_of_the_plan_forecast
            )}{' '}
            برآورد گردیده است.
          </p>
          <br />
          تبصره: سایر هزینه‌های متعلقه به موضوع قرارداد به جز بهای تمام شده درآمدهای عملیاتی، بر
          عهده متقاضی خواهد بود. بنابراین برآورد سود ناخالص حاصل، با احتساب بهای تمام شده درآمدهای
          عملیاتی بوده است.
        </p>

        <p>
          <span className="text-[23px] font-bold">2.</span>
          تقسیم سود ناخالص دوره 3 ماهه حاصل از اجرای طرح میان متقاضی و عامل (به وکالت از دارندگان
          گواهی شراکت)، در صورت تحقق سود ناخالص برآورد شده دوره 3 ماهه به میزان{' '}
          {formatMillionRials(investor_request?.three_months_gross_profit_of_the_plan_forecast)}, به
          نسبت {investor_request?.annual_shareholders_equity_ratio_forecast} درصد سهم عامل و{' '}
          {investor_request?.annual_shareholders_equity_ratio_forecast
            ? 100 - investor_request.annual_shareholders_equity_ratio_forecast
            : 0}{' '}
          درصد سهم متقاضی خواهد بود.
        </p>
        <p>
          تبصره 1: متقاضی تأیید و اقرار می‌نماید بنا به تخصص و با تکیه بر تجربه تاریخی حاصل از{' '}
          {investor_request?.suggestion_plan_name}، به هیچ عنوان سود ناخالص حاصل از به‌کارگیری
          {investor_request?.amount_of_investment
            ? (investor_request.amount_of_investment / 1000000).toLocaleString()
            : 0}{' '}
          میلیون ریال سرمایه در گردش مورد نیاز {investor_request?.suggestion_plan_name}، کمتر از{' '}
          {formatMillionRials(investor_request?.three_months_gross_profit_of_the_plan_forecast)}{' '}
          میلیون ریال سالیانه نخواهد شد. بنابراین هرگونه تغییری در این روند صرفاً متوجه متقاضی خواهد
          بود و متقاضی حق هیچگونه ادعا و مطالبه‌ای در این خصوص نخواهد داشت.
        </p>

        <p className="text-[23px]">
          تبصره 2: در پایان دوره، تمامی مطالبات حال شده و متقاضی تأیید و تعهد می‌نماید تمامی
          درآمدهای برآورد شده طی دوره یکسالۀ طرح به صورت نقدی می‌باشد.
          <br />
          تبصره 3: مبنای تقسیم سود ناخالص در هر بازه از جدول این بند میان متقاضی و عامل حاصل از
          اجرای طرح موضوع قرارداد، حداقل سود ناخالص در هر بازه خواهد بود. فقط در صورت افزایش سود
          ناخالص برآورد شده بیش از{' '}
          {formatMillionRials(investor_request?.annual_gross_profit_of_the_plan_forecast)} ریال
          سالیانه، مابه‌تفاوت آن از سود برآورد شده به نسبت 99.9 درصد سهم متقاضی و 0.1 درصد سهم عامل
          تقسیم خواهد شد.
          <br />
        </p>
        <h2 className="text-[23px] font-bold mb-2">بازدهی یک ساله طرح*</h2>
        <table className="w-full border-collapse border border-gray-300 mb-4 text-lg p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1 text-right">نسبت تسهیم سود</th>
              {one_year_return_on_investment?.map((item, index) => (
                <th key={index} className="border border-gray-300 p-1 text-right">
                  {Math.round(item?.rate_from || 0)} تا {Math.round(item?.rate_to || 0)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">سرمایه‌گذار</td>
              {one_year_return_on_investment?.map((item, index) => (
                <td key={index} className="border border-gray-300 p-1">
                  {formatPercentage(
                    item?.share_company ? Math.round(item.share_company * 10000) / 100 : 0
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">متقاضی</td>
              {one_year_return_on_investment?.map((item, index) => (
                <td key={index} className="border border-gray-300 p-1">
                  {formatPercentage(
                    item?.share_investor ? Math.round(item.share_investor * 10000) / 100 : 0
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-[23px]">
          نرخ بازده سرمایه‌گذار: {one_year_return_on_investment[0]?.rate_to}٪-
          {one_year_return_on_investment[2]?.rate_to}٪
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 4) مبلغ تأمین مالی</h2>
        <p className="text-[23px]">
          4-1. مبلغ تأمین مالی انجام شده برای متقاضی{' '}
          {investor_request?.amount_of_investment
            ? (investor_request.amount_of_investment / 1000000).toLocaleString()
            : 0}{' '}
          میلیون ریال گواهی شراکت 1,000 ریالی با اعتبار {investor_request?.duration_of_plan} ماهه، با
          نرخ سود علی‌الحساب{' '}
          {investor_request.interest_rate_plan} درصد است. بازپرداخت سود علی الحساب طی{' '}
          {investor_request?.duration_of_plan} ماه به صورت ماهیانه و پرداخت اصل مبلغ گواهی شراکت در
          انتهای دوره سرمایه‌گذاری توسط متقاضی خواهد بود.
          <br />
          تبصره 4: لازم به ذکر است مبلغ{' '}
          {investor_request?.amount_of_investment
            ? (investor_request.amount_of_investment * 0.1 / 1000000).toLocaleString()
            : 0}{' '}
          میلیون ریال، گواهی شراکت خریداری شده توسط متقاضی از مجموع گواهی‌های شراکت ابطال شده، و
          بنابراین هیچگونه سود و امتیازی به آن تعلق نمی‌گیرد.
          امتیازی به آن تعلق نمی‌گیرد.
        </p>

        <p className="text-[23px]">
          4-2. متقاضی متعهد است مبلغ تأمین مالی را صرفاً در جهت اجرای طرح موضوع ماده 3 این قرارداد
          استفاده خواهد شد و غیر از آن. در صورت تخلف متقاضی از این مقرره، سود علی‌الحساب به تناسب
          دوره نگهداری، اصل مبلغ دریافتی و جریمه‌ای به میزان 150 درصد از مبلغ کل گواهی‌های شراکت، از
          متقاضی اخذ می‌گردد و عامل مخیر به فسخ قرارداد می‌باشد.
          <br />

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
    checks: PropTypes.arrayOf(
      PropTypes.shape({
        fishing_id: PropTypes.string,
        date: PropTypes.string,
        amount: PropTypes.number,
        bank_name: PropTypes.string,
        branch_name: PropTypes.string,
        type: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Page3;
