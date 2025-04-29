/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber, formatPercentage, formatRials } from '../../utils/formatters_func';

const Page4 = ({ data }) => {
  if (!data) return null;

  const { investor_request, checks, one_year_return_on_investment } = data;

  const totalAmount = checks?.reduce((sum, check) => sum + (check?.amount || 0), 0) || 0;

  const renderContractClauses = () => (
    <div className="contract-clauses p-4 text-[23px] leading-relaxed">
      {/* <p>


        تبصره 12: مبنای تقسیم سود ناخالص در هر بازه از جدول این بند میان متقاضی و عامل حاصل از
          اجرای طرح موضوع قرارداد، حداقل سود ناخالص در هر بازه خواهد بود. فقط در صورت افزایش سود
          ناخالص برآورد شده بیش از 217،334 ریال سالیانه، مابه‌تفاوت آن از سود برآورد شده به
          نسبت.99.9 درصد سهم متقاضی و 0.1 درصد سهم عامل تقسیم خواهد شد.
          <br />
          تبصره 13: در صورتی که سود ناخالص طرح کمتر از سود علی¬الحساب پرداختی باشد، متقاضی،
          مابه‌التفاوت آن را تا میزان سودهای علی‌الحساب پرداخت شده از محل سهم خود یا سایر دارایی‌های
          خود مجاناً و بلاعوض تأمین و به دارندگان گواهی‌های شراکت صلح می‌نماید. به استناد این تبصره
          متقاضی حق هرگونه ادعایی در این خصوص را از خود سلب و اسقاط نمود.

          </p> */}

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
        {formatNumber(investor_request?.amount_of_investment || 0)} میلیون ریال گواهی شراکت 1,000
        ریالی با اعتبار {investor_request?.duration_of_plan} ماهه، با نرخ سود علی‌الحساب{' '}
        {investor_request.interest_rate_plan} درصد است. بازپرداخت سود علی الحساب طی{' '}
        {investor_request?.duration_of_plan} ماه به صورت ماهیانه و پرداخت اصل مبلغ گواهی شراکت در
        انتهای دوره سرمایه‌گذاری توسط متقاضی خواهد بود.
        <br />
        تبصره 4: لازم به ذکر است مبلغ{' '}
        {formatNumber((investor_request?.amount_of_investment || 0) * 0.1)} میلیون ریال، گواهی شراکت
        خریداری شده توسط متقاضی از مجموع گواهی‌های شراکت ابطال شده، و بنابراین هیچگونه سود و امتیازی
        به آن تعلق نمی‌گیرد.
      </p>

      <p className="text-[23px]">
        4-2. متقاضی متعهد است مبلغ تأمین مالی را صرفاً در جهت اجرای طرح موضوع ماده 3 این قرارداد
        استفاده خواهد شد و غیر از آن. در صورت تخلف متقاضی از این مقرره، سود علی‌الحساب به تناسب دوره
        نگهداری، اصل مبلغ دریافتی و جریمه‌ای به میزان 2/5 درصد از مبلغ کل گواهی‌های شراکت، از متقاضی
        اخذ می‌گردد و عامل مخیر به فسخ قرارداد می‌باشد.
        <br />
        تبصره 5: در صورت عدم استرداد وجه از سوی متقاضی، عامل می‌تواند تضامین مندرج در ماده 6 این
        قرارداد را به نحو عرضی اجرا بگذارد.
      </p>

      <p className="text-[23px]">
        4-3. چنانچه در طول اجرای طرح هزینه‌ای خارج از موارد ذکر شده در موضوع قرارداد ایجاد گردد، اعم
        از اینکه قابل پیش‌بینی بوده و یا خیر، مسئولیت تأمین آن به عهده متقاضی می‌باشد و عامل در خصوص
        هزینه‌های فوق هیچ‌گونه مسئولیتی به عهده نخواهد داشت. متقاضی حق هرگونه اعتراض در این باره را
        از خود سلب و ساقط نموده است.
      </p>

      <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 5) تعهدات متقاضی</h2>

      <p className="text-[23px]">
        5-1. تسلیم چک‌های پرداخت اقساط: متقاضی چک‌های پرداخت اقساط بابت اصل و متفرعات (سود علی
        الحساب) را مطابق جدول زیر به عامل تسلیم نموده است و مکلف است نسبت به پرداخت اقساط بابت اصل و
        متفرعات (سود علی الحساب) مطابق جدول زیر، در مواعد مقرر اقدام نماید.
      </p>

      <table className="w-full border-collapse border border-gray-300 mb-4 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2  text-center">ردیف</th>
            <th className="border border-gray-300 p-2  text-center">شناسه صیادی</th>
            <th className="border border-gray-300 p-2  text-center">تاریخ</th>
            <th className="border border-gray-300 p-2  text-center">مبلغ (ریال)</th>
            <th className="border border-gray-300 p-2  text-center">بانک</th>
            <th className="border border-gray-300 p-2  text-center">شعبه</th>
            <th className="border border-gray-300 p-2  text-center">نوع</th>
          </tr>
        </thead>
        <tbody>
          {checks?.map((check, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{check?.fishing_id || 'N/A'}</td>
              <td className="border border-gray-300 p-2">
                {check?.date ? new Date(check.date).toLocaleDateString('fa-IR') : 'N/A'}
              </td>
              <td className="border border-gray-300 p-2">{formatRials(check?.amount)}</td>
              <td className="border border-gray-300 p-2">{check?.bank_name || '_'}</td>
              <td className="border border-gray-300 p-2">{check?.branch_name || '_'}</td>
              <td className="border border-gray-300 p-2">{check?.type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="border border-gray-300 p-2 font-bold">
              مجموع مبلغ چک‌ها (ریال)
            </td>
            <td colSpan="4" className="border border-gray-300 p-2 font-bold">
              {formatRials(totalAmount)}
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="text-[23px]">
        تبصره 6: در صورت عدم ایفای تعهدات جدول فوق، متقاضی علاوه بر پرداخت سود علی‌الحساب، ملزم به
        پرداخت وجه التزامی مطابق دو دهم مبلغ پرداخت نشده به ازای هر روز تأخیر به عامل خواهد بود. وجه
        التزام مبالغ پرداخت نشده از محل تضامین قابل برداشت است.
        <br />
        تبصره 7: متقاضی تأیید و اقرار نموده است، در صورت عدم ایفای تعهدات جدول فوق توسط متقاضی و
        رجوع عامل به بانک صادرکننده ضمانت‌نامه تعهد پرداخت و به ازای هر روز تأخیر در پرداخت مبلغ
        مطالبه شده توسط بانک، عامل وجه التزامی به میزان دو دهم مبلغ پرداخت نشده به ازای هر روز تأخیر
        در پرداخت از متقاضی مطالبه می‌نماید که از محل چک‌های اقساط و سایر تضامین به صورت عرضی قابل
        برداشت است و متقاضی حق هرگونه اعتراض و ادعایی در این خصوص را از خود سلب و اسقاط نمودند.
        <br />
        تبصره 8: با توجه به خرید 10 درصد از گواهی‌های شراکت توسط متقاضی به مبلغ{' '}
        {formatNumber((investor_request?.amount_of_investment || 0) * 0.1)} میلیون ریال، آن
        گواهی‌های شراکت ابطال و از مجموع کسر شده و پرداخت اقساط لازم‌الاداء به همان میزان تعدیل
        می‌شود. بنابراین مبنای پرداخت اقساط بر اساس میزان مشارکت دارندگان گواهی‌های شراکت به مبلغ{' '}
        {formatNumber((investor_request?.amount_of_investment || 0) * 0.9)} میلیون ریال محاسبه
        گردیده است.
      </p>
    </div>
  );

  return <div className="contract-page page-4">{renderContractClauses()}</div>;
};

Page4.propTypes = {
  data: PropTypes.shape({
    investor_request: PropTypes.shape({
      amount_of_investment: PropTypes.number,
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

export default Page4;
