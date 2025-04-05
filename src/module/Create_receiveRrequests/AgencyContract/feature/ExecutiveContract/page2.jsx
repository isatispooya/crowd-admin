import React from 'react';
import PropTypes from 'prop-types';

const Page2 = ({ data, qrValue }) => {
  if (!data) return null;

  const renderContractClauses = () => {
    const { company, investor_request, company_cost, profit_and_loss_forecast } = data;

    const formatMillionRials = (value) =>
      value ? `${value.toLocaleString('fa')} میلیون ریال` : '0 میلیون ریال';

    return (
      <div className="contract-clauses p-4 text-[23px] leading-relaxed">
        <h2 className="text-[23px] font-bold mb-2">شرح (مبالغ به میلیون ریال)</h2>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">شرح</th>
              <th className="border border-gray-300 p-2 text-left">مبلغ (دوره سه ماهه)</th>
              <th className="border border-gray-300 p-2 text-left">مبلغ (سالیانه)</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>

        <p>
          تبصره 1: متقاضی تأیید و اقرار می‌نماید در صورت افزایش بهای تمام‌شدۀ خرید مواد اولیه و سایر
          موارد موجود در این قرارداد، مابه‌التفاوت بهای تمام‌شدۀ انجام طرح مذکور «
          {investor_request?.suggestion_plan_name}» را از دارایی‌های خود مجاناً و بلاعوض تأمین
          نماید. متقاضی بر اساس این تبصره حق هرگونه اعتراضی را از خود سلب و اسقاط نمود.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">4- تعهد متقاضی به ایجاد درآمد عملیاتی</h2>
        <p>
          متقاضی متعهد است از اجرای طرح فوق درآمد عملیاتی به شرح جدول زیر، حداقل به 246,400 (61,600)
          میلیون ریال سالیانه (دوره 3 ماهه) ایجاد نماید. ارقام به میلیون ریال می‌باشد.
        </p>

        <h3 className="text-[23px] font-bold mt-2 mb-2">
          پیش‌بینی سود و زیان (ارقام به میلیون ریال)
        </h3>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">شرح</th>
              <th className="border border-gray-300 p-2 text-left">سالیانه</th>
              <th className="border border-gray-300 p-2 text-left">دوره سه ماهه</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                {profit_and_loss_forecast?.description || 'توضیحات'}
              </td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(profit_and_loss_forecast?.amount_of_year)}
              </td>
              <td className="border border-gray-300 p-2">
                {formatMillionRials(profit_and_loss_forecast?.amount_of_months)}
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          تبصره 1: ترکیب فروش محصول شماره یک با تأیید عامل، به صلاحدید متقاضی خواهد بود، اما جمع
          درآمد حاصل از فروش مندرج در جدول فوق به مبلغ حداقل 246,400 (61,600) میلیون ریال سالیانه
          (دوره سه ماهه) توسط متقاضی تضمین شده است.
          <br />
          تبصره 2: متقاضی متعهد است از محل فروش محصولات مندرج در جدول فوق، درآمدی جمعاً به مبلغ
          حداقل 246,400 (61,600) میلیون ریال سالیانه (دوره سه ماهه) محقق نماید و در صورت عدم تحقق
          درآمد مذکور به هر علت و جهتی، متقاضی درآمد برآورد شده را از محل سایر دارایی‌های خود در
          شرکت تضمین می‌نماید.
          <br />
          تبصره 3: با توجه به اینکه مبلغ بهای تمام شده فروش محصولات و مبلغ مندرج در جدول فوق بر اساس
          اطلاعات صورت‌های مالی منتهی به 29 اسفند 1402 و اطلاعات اظهار شده توسط متقاضی محاسبه گردیده
          است، متقاضی تأیید و اقرار می‌نماید هرگونه انحرافی در خصوص کاهش مبلغ فروش و افزایش مبلغ
          بهای تمام شده به هر علت و جهتی، تماماً متوجه متقاضی خواهد بود و متقاضی متعهد به تأمین
          مابه‌التفاوت آن از سایر دارایی‌های خود می‌باشد و به واسطۀ این تبصره حق هرگونه اعتراضی را
          از خود سلب و اسقاط نمود.
          <br />
          تبصره 4: متقاضی تأیید و اقرار می‌نماید در صورت افزایش دورۀ وصول مطالبات، تمامی مطالبات
          وصول نشده، حال شده فرض خواهد شد.
          <br />
          تبصره 5: متقاضی با تأیید عامل مخیر است در صورت محیا نشدن فروش محصول شماره یک، آن را به
          صورت سایر انواع محصولات و خدمات مندرج در صورت‌های مالی تولید ارائه نماید و به فروش رساند و
          حداقل مبلغ سود ناخالص برآورد شده در قرارداد حاضر را ایجاد کند.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">1. سود ناخالص</h2>
        <p>
          سود ناخالص سالیانه (دوره سه ماهه) حاصل از اجرای موضوع قرارداد 181,588 (45,397) میلیون ریال
          برآورد گردیده است.
          <br />
          تبصره: سایر هزینه‌های متعلقه به موضوع قرارداد به جز بهای تمام شده درآمدهای عملیاتی، بر
          عهده متقاضی خواهد بود. بنابراین برآورد سود ناخالص حاصل، با احتساب بهای تمام شده درآمدهای
          عملیاتی بوده است.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">2. تقسیم سود ناخالص</h2>
        <p>
          تقسیم سود ناخالص دوره 3 ماهه حاصل از اجرای طرح میان متقاضی و عامل (به وکالت از دارندگان
          گواهی شراکت)، در صورت تحقق سود ناخالص برآورد شده دوره 3 ماهه به میزان 181,588 میلیون ریال،
          به نسبت 53.28 درصد سهم عامل و 46.72 درصد سهم متقاضی خواهد بود.
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">
          مفروضات محاسبات درآمدهای عملیاتی حاصل از دو دستگاه تراک ده چرخ
        </h2>
        <p>
          ظرفیت هر دستگاه: 25 تن تعداد جابجایی در هر روز: 4 بار تعداد روزهای کاری: 220 روز درآمد
          حاصل از حمل هر تن بار: 2,000,000 ریال
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">پیش‌بینی عملکرد طرح</h2>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">شرح</th>
              <th className="border border-gray-300 p-2 text-left">سال 1404</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">درآمد کل (میلیون ریال)</td>
              <td className="border border-gray-300 p-2">246,400</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">بهای تمام شده کل (میلیون ریال)</td>
              <td className="border border-gray-300 p-2">(64,812)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">سود ناخالص طرح</td>
              <td className="border border-gray-300 p-2">181,588</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">حاشیه سود</td>
              <td className="border border-gray-300 p-2">73.69%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">نسبت سود سهامداران</td>
              <td className="border border-gray-300 p-2">53.28%</td>
            </tr>
          </tbody>
        </table>
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
      contract_number: PropTypes.string,
      agency_agreement_date: PropTypes.string,
      suggestion_plan_name: PropTypes.string,
      amount_of_investment: PropTypes.number,
    }),
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
  qrValue: PropTypes.string,
};

export default Page2;
