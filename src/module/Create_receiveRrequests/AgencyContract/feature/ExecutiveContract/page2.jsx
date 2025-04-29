/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'jalali-moment';
import { formatAmount, formatMillionRials } from '../../utils/formatters_func';

const Page2 = ({ data }) => {
  if (!data) return null;

  const renderContractClauses = () => {
    const { company_cost, investor_request } = data;

    const getJalaliDate = (date) => {
      if (!date) return '';
      const m = moment(date);
      if (!m.isValid()) return '';
      return m.format('jYYYY/jMM/jDD');
    };

    return (
      <div className="contract-clauses p-4 text-[23px] leading-relaxed">
        <p>
          18-2. طرح: فعالیتی است که متقاضی برای انجام آن، اقدام به تامین منابع مالی می کند. حداقل
          منابع مالی جمع آوری شده: مقدار وجوه نقدی است که در صورت جمع آوری و پرداخت آن توسط تامین
          کنندگان، فرض میشود طرح در جذب سرمایه موردنیاز متقاضی موفق بوده است. در قرارداد حاضر حداقل
          منابع مالی جمع آوری شده 175،000،000،000 ریال است.
          <br />
          19-2. سکو: پلتفرمی است که برای تامین مالی جمعی توسط عامل ایجاد شده است و اطلاعات لازم طبق
          مفاد دستورالعمل در آن منتشر میشود.
          <br />
          20-2. تاریخ موفقیت طرح در جذب سرمایه: تاریخی است که در آن، کل یا حداقل منابع مالی موردنیاز
          متقاضی طبق این قرارداد، توسط تامین کنندگان پرداخت شده باشد.
          <br />
          21-2. گزارش تسویه: منظور گزارشی است که حسب مورد و طبق سازوکارهای شرکت فرابورس ایران (یا
          کارگروه ارزیابی)، به ترتیب اولویت از سوی فرابورس یا کارگروه ارزیابی (در مواردی که فرابورس
          یا کارگروه ارزیابی در پایان دوره اجرای طرح ظرف مدت 1 ماه در مورد وضعیت آن اعلام نظر
          ننمایند و یا نتوانند اعلام نظر نمایند مشروط به مهر و امضای آن توسط نهاد مالی) در خصوص
          وضعیت موفقیت و شکست طرح، میزان سود و یا زیان وارده تنظیم و تایید می گردد. تبصره: سایر
          عبارات و اصطلاحات تعریف نشده حسب مورد مطابق قوانین و مقررات لازم الاجرا است
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 2) موضوع فعالیت</h2>
        <p className="text-[23px]  mt-4 mb-2">
          موضوع قرارداد عبارت است از تامین سرمایه مورد نیاز اجرای طرح «
          {investor_request?.suggestion_plan_name}» این شرکت بر اساس اساسنامه فعالیت آن، به شرح زیر
          توسط متقاضی:
          <br />
          1. در راستای اجرای طرح موضوع قرارداد، متقاضی متعهد است همزمان با واریز وجوه جمع‌آوری شده
          به متقاضی، بصورت آنی و به یکباره مواد اولیه مورد نیاز اجرای طرح در این قرارداد را خریداری
          و نسبت به استفاده و ایجاد ارزش افزوده در چرخه‌های عملیاتی خود اقدام نماید.
          <br />
          {/* <span className="ml-4">
            تبصره 1: متقاضی متعهد است مواد اولیه خریداری شده را طی نامه کتبی و با پیوست مستندات خرید
            به استحضار عامل برساند.
          </span>
          <br />
          <span className="ml-4">
            تبصره 2: به استناد {investor_request?.subject_activity_document} ، در صورت وجود هرگونه
            مشکل در اجرای طرح و یا خرید مواد اولیه، متقاضی متعهد است از طریق سایر دارایی‌ها و
            دستگاه‌های تحت تملک خود نسبت به اجرای طرح اقدام نماید.
          </span> */}
          <br />
          2. استفاده از امکانات فراهم شده توسط عامل تنها در صورتی ممکن است که متقاضی نسبت به ثبت طرح
          خود در سکوی عامل طبق رویه تعیین شده و مندرج در دستورالعمل تامین مالی جمعی و مقررات و ضوابط
          عامل اقدام و کد اختصاصی دریافت کند و ضمانت نامه تعهد پرداخت را به عامل تودیع نماید.
          <br />
          <span className="ml-4">
            تبصره 1: متقاضی متعهد است مواد اولیه خریداری شده را طی نامه کتبی و با پیوست مستندات خرید
            به استحضار عامل برساند. لذا در فرض انحراف از طرح، ملزم به تادیه خسارت وجه التزام به
            میزان 150 درصد مبلغ تامین مالی می باشد.
          </span>
          <br />
          <span className="ml-4">
            تبصره 2: به استناد صورت مالی منتهی به 1402/12/29، در صورت وجود هرگونه مشکل در اجرای طرح
            و یا خرید مواد اولیه، متقاضی متعهد است از طریق سایر دارایی ها و دستگاه های تحت تملک خود
            نسبت به اجرای طرح اقدام نماید.
          </span>
          <br />
          3. با توجه به نسبت هزینه‌های عملیاتی به بهای تمام‌شدۀ خدمات که بر اساس میانگین ترکیب بهای
          تمام شده خدمات منتهی به 
          {/* {getJalaliDate(investor_request?.agency_agreement_date)} */}
          1401/
           اظهار شده
          توسط متقاضی محاسبه شده است، مبلغ کل مواد اولیه مورد نیاز و همچنین هزینۀ کل دستمزد و سایر
          موارد ملزوم جهت در هر چرخۀ عملیاتی در این طرح، به‌شرح جدول زیر برآورد می‌گردد. از{' '}
          {formatAmount(investor_request?.amount_of_investment)} میلیون ریال بهای تمام شده فروش
          محصولات در هر چرخۀ عملیاتی{' '}
          {formatAmount((investor_request?.amount_of_investment ?? 0) * 0.9)} میلیون ریال آن از محل
          وجوه جمع‌آوری شده از طریق دارندگان گواهی شراکت برای خرید کل مواد اولیه مورد نیاز و بخشی از
          دستمزد و سایر هزینه‌ها و{' '}
          {formatAmount((investor_request?.amount_of_investment ?? 0) * 0.1)} میلیون ریال آن توسط
          متقاضی برای هزینه دستمزد و سایر هزینه‌های فروش محصولات و خدمات تأمین می‌گردد.
        </p>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-right">شرح</th>
              <th className="border border-gray-300 p-2 text-right">مبلغ (دوره سه ماهه)</th>
              <th className="border border-gray-300 p-2 text-right">مبلغ (سالیانه)</th>
            </tr>
          </thead>
          <tbody>
            {company_cost && company_cost.length > 0 ? (
              company_cost.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="border border-gray-300 p-2">{item.description || ''}</td>
                  <td className="border border-gray-300 p-2">
                    {formatMillionRials(item.amount_of_3_months)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatMillionRials(item.amount_of_year)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 p-2">
                  {company_cost?.description || 'توضیحات'}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatMillionRials(company_cost?.amount_of_months)}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatMillionRials(company_cost?.amount_of_year)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p>
          تبصره 1: متقاضی تأیید و اقرار می‌نماید در صورت افزایش بهای تمام‌شدۀ خرید مواد اولیه و سایر
          موارد موجود در این قرارداد، مابه‌التفاوت بهای تمام‌شدۀ انجام طرح مذکور «
          {investor_request?.suggestion_plan_name}» را از دارایی‌های خود مجاناً و بلاعوض تأمین
          نماید. متقاضی بر اساس این تبصره حق هرگونه اعتراضی را از خود سلب و اسقاط نمود.
        </p>

        <p>
          4- متقاضی متعهد است از اجرای طرح فوق درآمد عملیاتی به شرح جدول زیر، حداقل به{' '}
          {investor_request?.annual_total_income_forecast?.toLocaleString()},
          {`(${investor_request?.three_months_total_income_forecast?.toLocaleString()})`} میلیون
          ریال سالیانه (دوره 3 ماهه) ایجاد نماید. ارقام به میلیون ریال می‌باشد.
        </p>
        <h3 className="text-[23px] font-bold mt-2 mb-2">
          پیش‌بینی سود و زیان (ارقام به میلیون ریال)
        </h3>
      
      </div>
    );
  };

  return <div className="contract-page page-2">{renderContractClauses()}</div>;
};

Page2.propTypes = {
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
      subject_activity_document: PropTypes.string,
      contract_number: PropTypes.string,
      agency_agreement_date: PropTypes.string,
      suggestion_plan_name: PropTypes.string,
      amount_of_investment: PropTypes.number,
      suggestion_plan_amount_of_investment: PropTypes.number,
      three_months_total_income_forecast: PropTypes.number,
      annual_total_income_forecast: PropTypes.number,
      three_months_total_cost_forecast: PropTypes.number,
      annual_total_cost_forecast: PropTypes.number,
      three_months_gross_profit_of_the_plan_forecast: PropTypes.number,
      annual_gross_profit_of_the_plan_forecast: PropTypes.number,
      three_months_profit_margin_of_the_plan_forecast: PropTypes.number,
      annual_profit_margin_of_the_plan_forecast: PropTypes.number,
      three_months_shareholders_equity_ratio_forecast: PropTypes.number,
      annual_shareholders_equity_ratio_forecast: PropTypes.number,
      amount_production: PropTypes.number,
    }),
    company_cost: PropTypes.shape({
      description: PropTypes.string,
      amount_of_3_months: PropTypes.number,
      amount_of_year: PropTypes.number,
      amount_of_months: PropTypes.number,
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
    one_year_return_on_investment: PropTypes.arrayOf(
      PropTypes.shape({
        rate_from: PropTypes.number,
        rate_to: PropTypes.number,
        share_company: PropTypes.number,
        share_investor: PropTypes.number,
      })
    ),
    performance_forecast: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, value: PropTypes.string })
    ),
  }).isRequired,
};

export default Page2;
