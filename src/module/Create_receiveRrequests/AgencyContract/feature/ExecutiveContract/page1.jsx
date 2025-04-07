import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const formatAmount = (amount) => {
  if (!amount) return '0';
  const millionAmount = amount / 1000000;
  return millionAmount.toLocaleString('en-US');
};

const Page1 = ({ data }) => {
  if (!data) return null;

  const formatMillionRials = (value) =>
    value ? `${value.toLocaleString('en-US')} میلیون ریال` : '0 میلیون ریال';

  const renderHeaderContent = () => {
    if (!data) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {data.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {`2${data.investor_request?.contract_number || ''}`}
              <br />
              تاریخ: {data.investor_request?.agency_agreement_date.split('T')[0].replace(/-/g, '/')}
            </div>

            <img src={crowdlogo} alt="company Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">قرارداد اجرایی {data.company?.title} (سهامی خاص)</h3>
            </div>

            <img
              src={OnRun + data.investor_request.logo}
              alt="Investor Logo"
              className="h-32 mt-4"
            />
          </div>
        )}
      </div>
    );
  };

  const renderContractClauses = () => {
    const {
      company,
      investor_request,
      company_cost,
      guarantor,
      company_members,
      profit_and_loss_forecast,
    } = data;

    return (
      <div className="contract-clauses p-4 text-sm leading-relaxed">
        {renderHeaderContent()}
        <h2 className="text-[23px] font-bold mb-2">ماده 1) طرفین قرارداد</h2>
        <p className="text-[23px]  mt-4 mb-2">
          1-1. این قرارداد میان:
          <br />
          1) {company?.title} (سهامی خاص) به شناسه ملی {company?.national_id} کد اقتصادی{' '}
          {company?.economic_code} و شماره ثبت {company?.registration_number} در اداره ثبت شرکت‌ها و
          موسسات غیر تجاری شورای عالی مناطق آزاد به نشانی {company?.address}، پلاک 0، 7، به کد پستی{' '}
          {company?.postal_code}، با نمایندگی آقای {company_members?.person_title} به شماره ملی{' '}
          {company_members?.uniqueIdentifier} به سمت رئیس هیئت مدیره و مدیر عامل صاحبان امضای مجاز
          بر اساس {company_members?.signture_document}، «متقاضی» نامیده می‌شود، از یک طرف،
          <br />
          2) شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
          411615733645، و شماره ثبت 13702، در اداره ثبت شرکت‌ها و موسسات تجاری استان هرمزگان، به
          نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4، واحد 44، شماره تلفن 076-44480555 و کد
          پستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو
          هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز
          بر اساس روزنامه رسمی شماره 22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل»
          نامیده می‌شود. به وکالت از طرف دارندگان گواهی‌های شراکت جهت تأمین منابع مالی مورد نیاز
          متقاضی، بر اساس مجوز صادره توسط شرکت فرابورس به نامه شماره 1008438/5/03 مورخ 15/05/1403 از
          طرف دیگر، به شرح مواد زیر منعقد گردید.
          <br />
          {guarantor.map((item, index) => (
            <p>
              {index + 3}) سرکار آقای/خانم {item?.guarantor_name} به کد ملی {item?.national_id} و
              شماره تماس {item?.phone_number} متولد{' '}
              {item?.birth_date
                ? new Date(item?.birth_date).toLocaleDateString('fa-IR')
                : 'تاریخ نامعتبر'}{' '}
              به آدرس
              {item?.address} واحد {item?.unit} به کد پستی {item?.postal_code} که از این پس در این
              قرارداد به عنوان «ضامن» معرفی می‌گردد.
            </p>
          ))}
        </p>

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 2) تعاریف</h2>
        <p className="text-[23px]  mt-4 mb-2">
          1-2. طرح: فعالیتی که متقاضی برای انجام آن در خواست تأمین مالی نموده است. مشخصات طرح در
          موضوع قرارداد ارائه گردیده است.
          <br />
          2-2. گزارش: منظور گزارش عملکرد از وضعیت پیشرفت فیزیکی، هزینه‌ای و زمانی مطابق با برنامه
          زمانی ارائه شده در طرح است.
          <br />
          3-2. گواهی شراکت: ورقه بهادار الکترونیکی است که از ثبت نزد سازمان بورس معاف است.
          <br />
          4-2. دارندگان گواهی‌های شراکت: شخص حقیقی یا حقوقی تأمین‌کننده منابع مالی متقاضی برای اجرای
          طرح است، که نسبت به خرید گواهی‌های شراکت اقدام نموده است.
          <br />
          5-2. روز کاری: تمام روزهای هفته به غیر از پنج‌شنبه، جمعه، تعطیلات رسمی و روزهایی که به هر
          دلیلی بانک‌ها تعطیل می‌باشند، روز کاری محسوب می‌گردد.
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
          <span className="ml-4">
            تبصره 1: متقاضی متعهد است مواد اولیه خریداری شده را طی نامه کتبی و با پیوست مستندات خرید
            به استحضار عامل برساند.
          </span>
          <br />
          <span className="ml-4">
            تبصره 2: به استناد صورت مالی منتهی به 1402/12/29 ، در صورت وجود هرگونه مشکل در اجرای طرح
            و یا خرید مواد اولیه، متقاضی متعهد است از طریق سایر دارایی‌ها و دستگاه‌های تحت تملک خود
            نسبت به اجرای طرح اقدام نماید.
          </span>
          <br />
          2. با توجه به نسبت هزینه‌های عملیاتی به بهای تمام‌شدۀ خدمات که بر اساس میانگین ترکیب بهای
          تمام شده خدمات منتهی به 1402/12/29 اظهار شده توسط متقاضی محاسبه شده است، مبلغ کل مواد
          اولیه مورد نیاز و همچنین هزینۀ کل دستمزد و سایر موارد ملزوم جهت در هر چرخۀ عملیاتی در این
          طرح، به‌شرح جدول زیر برآورد می‌گردد. از{' '}
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
              <th className="border border-gray-300 p-2 text-right">سالیانه</th>
              <th className="border border-gray-300 p-2 text-right">دوره سه ماهه</th>
              <th className="border border-gray-300 p-2 text-right">شرح</th>
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
      </div>
    );
  };

  return <div className="contract-page page-1">{renderContractClauses()}</div>;
};

Page1.propTypes = {
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
    guarantor: PropTypes.arrayOf(
      PropTypes.shape({
        guarantor_name: PropTypes.string,
        national_id: PropTypes.string,
        phone_number: PropTypes.string,
        birth_date: PropTypes.string,
        address: PropTypes.string,
        unit: PropTypes.string,
        postal_code: PropTypes.string,
      })
    ),
    company_members: PropTypes.shape({
      person_title: PropTypes.string,
      uniqueIdentifier: PropTypes.string,
      signture_document: PropTypes.string,
    }),
    company_cost: PropTypes.shape({
      description: PropTypes.string,
      amount_of_months: PropTypes.number,
      amount_of_year: PropTypes.number,
    }),
    profit_and_loss_forecast: PropTypes.shape({
      description: PropTypes.string,
      amount_of_months: PropTypes.number,
      amount_of_year: PropTypes.number,
    }),
  }).isRequired,
};

export default Page1;
