import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const Page3 = ({ data }) => {
  if (!data) return null;

  const renderContractClauses = () => {
    const { investor_request, one_year_return_on_investment, checks } = data;

    const formatPercentage = (value) => (value ? `${value}%` : '0%');

    const formatNumber = (amount) => {
      if (!amount) return '0';
      const millionAmount = amount / 1000000;
      return millionAmount.toLocaleString('en-US');
    };

    const formatRials = (value) => {
      if (!value) return '0 ریال';
      return `${value.toLocaleString('en-US')} ریال`;
    };

    const totalAmount = checks?.reduce((sum, check) => sum + (check?.amount || 0), 0) || 0;

    return (
      <div className="contract-clauses p-4 text-[23px] leading-relaxed">
        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 4) مبلغ تأمین مالی</h2>
        <p className="text-[23px]">
          1. مبلغ تأمین مالی انجام شده برای متقاضی{' '}
          {formatNumber(investor_request?.amount_of_investment)} میلیون ریال گواهی شراکت 1,000 ریالی
          با اعتبار {investor_request?.duration_of_plan} ماهه، با نرخ سود علی‌الحساب{' '}
          {investor_request?.interest_rate_plan} درصد سالیانه (
          {investor_request?.interest_rate_plan && investor_request?.refund_of_plan
            ? (investor_request.interest_rate_plan / investor_request.refund_of_plan || 0).toFixed(
                2
              )
            : '0.00'}{' '}
          درصد دوره 3 ماهه) است. بازپرداخت سود علی الحساب طی {investor_request?.duration_of_plan}{' '}
          ماه به صورت ماهیانه و پرداخت اصل مبلغ گواهی شراکت در انتهای دوره سرمایه‌گذاری توسط متقاضی
          خواهد بود.
          <br />
          تبصره: لازم به ذکر است مبلغ {formatNumber(investor_request?.amount_of_investment)} میلیون
          ریال، گواهی شراکت خریداری شده توسط متقاضی از مجموع گواهی‌های شراکت ابطال شده، و بنابراین
          هیچگونه سود و امتیازی به آن تعلق نمی‌گیرد.
        </p>
        <h2 className="text-[23px] font-bold mb-2">2. تعهد به استفاده از مبلغ تأمین مالی</h2>
        <p className="text-[23px]">
          متقاضی متعهد است مبلغ تأمین مالی را صرفاً در جهت اجرای طرح موضوع ماده 3 این قرارداد
          استفاده خواهد شد و غیر از آن. در صورت تخلف متقاضی از این مقرره، سود علی‌الحساب به تناسب
          دوره نگهداری، اصل مبلغ دریافتی و جریمه‌ای به میزان 5/2 درصد از مبلغ کل گواهی‌های شراکت، از
          متقاضی اخذ می‌گردد و عامل مخیر به فسخ قرارداد می‌باشد.
          <br />
          تبصره: در صورت عدم استرداد وجه از سوی متقاضی، عامل می‌تواند تضامین مندرج در ماده 6 این
          قرارداد را به نحو عرضی اجرا بگذارد.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">3. مسئولیت هزینه‌های غیرمترقبه</h2>
        <p className="text-[23px]">
          چنانچه در طول اجرای طرح هزینه‌ای خارج از موارد ذکر شده در موضوع قرارداد ایجاد گردد، اعم از
          اینکه قابل پیش‌بینی بوده و یا خیر، مسئولیت تأمین آن به عهده متقاضی می‌باشد و عامل در خصوص
          هزینه‌های فوق هیچ‌گونه مسئولیتی به عهده نخواهد داشت. متقاضی حق هرگونه اعتراض در این باره
          را از خود سلب و ساقط نموده است.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 5) تعهدات متقاضی</h2>

        <h3 className="text-[23px] font-bold mt-2 mb-2">1. تسلیم چک‌های پرداخت اقساط</h3>
        <p className="text-[23px]">
          متقاضی چک‌های پرداخت اقساط بابت اصل و متفرعات (سود علی الحساب) را مطابق جدول زیر به عامل
          تسلیم نموده است و مکلف است نسبت به پرداخت اقساط بابت اصل و متفرعات (سود علی الحساب) مطابق
          جدول زیر، در مواعد مقرر اقدام نماید.
        </p>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">ردیف</th>
              <th className="border border-gray-300 p-2 text-left">شناسه صیادی</th>
              <th className="border border-gray-300 p-2 text-left">تاریخ</th>
              <th className="border border-gray-300 p-2 text-left">مبلغ (ریال)</th>
              <th className="border border-gray-300 p-2 text-left">بانک</th>
              <th className="border border-gray-300 p-2 text-left">شعبه</th>
              <th className="border border-gray-300 p-2 text-left">نوع</th>
            </tr>
          </thead>
          <tbody>
            {checks?.map((check, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{check?.fishing_id || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{check?.date || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{formatRials(check?.amount)}</td>
                <td className="border border-gray-300 p-2">{check?.bank_name || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{check?.branch_name || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{check?.type || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="border border-gray-300 p-2 font-bold">
                مجموع مبلغ چک‌ها (ریال)
              </td>
              <td className="border border-gray-300 p-2 font-bold">{formatRials(totalAmount)}</td>
              <td colSpan="3" className="border border-gray-300 p-2" />
            </tr>
          </tfoot>
        </table>

        <p className="text-[23px]">
          تبصره 13: در صورت عدم ایفای تعهدات جدول فوق، متقاضی علاوه بر پرداخت سود علی‌الحساب، ملزم
          به پرداخت وجه التزامی مطابق دو هزارم مبلغ پرداخت نشده به ازای هر روز تأخیر به عامل خواهد
          بود. وجه التزام مبالغ پرداخت نشده از محل تضامین قابل برداشت است.
          <br />
          تبصره 14: متقاضی تأیید و اقرار نموده است، در صورت عدم ایفای تعهدات جدول فوق توسط متقاضی و
          رجوع عامل به بانک صادرکننده ضمانت‌نامه تعهد پرداخت و ارسال تقاضای کتبی به بانک، به ازای هر
          روز تأخیر در پرداخت مبلغ مطالبه شده توسط بانک، عامل وجه التزامی به میزان دو هزارم مبلغ
          پرداخت نشده به ازای هر روز تأخیر در پرداخت از متقاضی مطالبه می‌نماید که از محل چک‌های
          اقساط و سایر تضامین به صورت عرضی قابل برداشت است و متقاضی حق هرگونه اعتراض و ادعایی در این
          خصوص را از خود سلب و اسقاط نمودند.
          <br />
          تبصره 15: با توجه به خرید 10 درصد از گواهی‌های شراکت توسط متقاضی به مبلغ{' '}
          {formatNumber(investor_request?.amount_of_investment)} میلیون ریال، آن گواهی‌های شراکت
          ابطال و از مجموع کسر شده و پرداخت اقساط لازم‌الاداء به همان میزان تعدیل می‌شود. بنابراین
          مبنای پرداخت اقساط بر اساس میزان مشارکت دارندگان گواهی‌های شراکت به مبلغ{' '}
          {formatNumber(225000)} میلیون ریال محاسبه گردیده است.
        </p>

        <h3 className="text-[23px] font-bold mt-4 mb-2">2. افزایش نرخ سود</h3>
        <p className="text-[23px]">
          در صورت افزایش عمومی نرخ سود سپرده‌های متناظر بانکی و اوراق مشابه، عامل رأساً می‌تواند با
          اعلام کتبی به متقاضی درخواست افزایش نرخ سود گواهی‌های شراکت موضوع این قرارداد را بنماید.
          متقاضی متعهد می‌گردد ظرف 7 روز از تاریخ درخواست عامل حسب مورد نسبت به افزایش نرخ سود
          گواهی‌های شراکت به میزان افزایش عمومی نرخ سود سپرده‌های متناظر بانکی و اوراق مشابه اقدام
          نماید. در غیر این صورت متقاضی ملزم به پرداخت وجه التزامی معادل میزان افزایش نرخ سود
          سپرده‌های متناظر بانکی و اوراق مشابه به صورت ماهیانه می‌باشد.
        </p>

        <h3 className="text-[23px] font-bold mt-4 mb-2">3. محاسبه سود قطعی</h3>
        <p className="text-[23px]">
          متقاضی متعهد است حداکثر پس از دو هفته از پایان عمر گواهی‌های شراکت، نسبت به محاسبه سود
          قطعی گواهی‌های شراکت اقدام نماید. همچنین حسابرس حداکثر یک ماه پس از اعلام سود قطعی توسط
          متقاضی اظهار نظر خواهد نمود.
          <br />
          تبصره 16: عامل به عنوان ناظر قرارداد، پس از اظهار نظر حسابرس، در خصوص سود قطعی حاصل از
          گواهی‌های شراکت، حق دارد نسبت به تأیید یا تعیین حسابرس جدید (حسابرس رسمی) و حسابرسی مجدد
          سود قطعی گواهی‌های شراکت اظهار نظر خود را حداکثر طی دو هفته اعلام نماید.
        </p>

        <h3 className="text-[23px] font-bold mt-4 mb-2">4. عدم وجود دعاوی</h3>
        <p className="text-[23px]">
          متقاضی تأیید و تعهد می‌کند که دعاوی مؤثر با اهمیت حقوقی یا کیفری علیه شرکت/موسسه و اعضای
          هیئت مدیره یا مدیرعامل وی وجود ندارد. در صورت کشف هرگونه دعاوی مؤثر، عامل مخیر به فسخ
          قرارداد خواهد بود و متقاضی روال اتمام قرارداد را طی خواهد کرد.
        </p>

        <h3 className="text-[23px] font-bold mt-4 mb-2">5. پرداخت هزینه‌ها</h3>
        <p className="text-[23px]">
          متقاضی متعهد می‌گردد کلیه هزینه‌های لازم جهت انجام موضوع این قرارداد و اخذ مجوزهای لازم و
          سایر مقدمات لازم را به موجب این قرارداد بپردازد.
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
