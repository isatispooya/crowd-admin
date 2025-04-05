import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const Page1 = ({ data }) => {
  if (!data) return null;

  const renderHeaderContent = () => {
    const { investor_request, company } = data;
    const logoSrc = investor_request?.logo ? `${OnRun}${investor_request.logo}` : '';
    const contractNumber = investor_request?.contract_number || 'N/A';
    const agreementDate =
      investor_request?.agency_agreement_date?.split('T')[0].replace(/-/g, '/') || 'N/A';

    return (
      <div className="flex flex-col gap-4 text-left p-4">
        <div className="flex items-center justify-between relative">
          <img
            src={crowdlogo}
            alt="Company Logo"
            className="h-32 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="font-bold text-[23px] mb-2">بسمه تعالی</h3>
            <h3 className="text-[23px]">قرارداد عاملیت {company?.title || ''} (سهامی خاص)</h3>
          </div>

          {logoSrc && (
            <img
              src={logoSrc}
              alt="Investor Logo"
              className="h-32 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="text-[23px] font-bold text-left mt-4">
            شماره قرارداد: {contractNumber}
            <br />
            تاریخ: {agreementDate}
          </div>
        </div>
      </div>
    );
  };

  const renderContractClauses = () => {
    const { company, investor_request, guarantor, company_members } = data;

    return (
      <div className="contract-clauses p-4 text-sm leading-relaxed">
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
          2) سرکار آقای/خانم {guarantor?.guarantor_name} به کد ملی {guarantor?.national_id} و شماره
          تماس 09132425229 متولد 10/03/1332 به آدرس تهران، تهرانپارس، فلکه چهارم، شهرک پارس، بلوک 15
          واحد 5 به کد پستی 8915693719 که از این پس در این قرارداد به عنوان «ضامن» معرفی می‌گردد.
          <br />
          3) شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
          411615733645، و شماره ثبت 13702، در اداره ثبت شرکت‌ها و موسسات تجاری استان هرمزگان، به
          نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4، واحد 44، شماره تلفن 076-44480555 و کد
          پستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو
          هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز
          بر اساس روزنامه رسمی شماره 22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل»
          نامیده می‌شود. به وکالت از طرف دارندگان گواهی‌های شراکت جهت تأمین منابع مالی مورد نیاز
          متقاضی، بر اساس مجوز صادره توسط شرکت فرابورس به نامه شماره 1008438/5/03 مورخ 15/05/1403 از
          طرف دیگر، به شرح مواد زیر منعقد گردید.
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

        <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 3) موضوع فعالیت</h2>
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
            تبصره 2: به استناد صورت مالی منتهی به 29/12/1402، در صورت وجود هرگونه مشکل در اجرای طرح
            و یا خرید مواد اولیه، متقاضی متعهد است از طریق سایر دارایی‌ها و دستگاه‌های تحت تملک خود
            نسبت به اجرای طرح اقدام نماید.
          </span>
          <br />
          2. با توجه به نسبت هزینه‌های عملیاتی به بهای تمام‌شدۀ خدمات که بر اساس میانگین ترکیب بهای
          تمام شده خدمات منتهی به 29/12/1402 اظهار شده توسط متقاضی محاسبه شده است، مبلغ کل مواد
          اولیه مورد نیاز و همچنین هزینۀ کل دستمزد و سایر موارد ملزوم جهت در هر چرخۀ عملیاتی در این
          طرح، به‌شرح جدول زیر برآورد می‌گردد. از {investor_request?.amount_of_investment} میلیون
          ریال بهای تمام شده فروش محصولات در هر چرخۀ عملیاتی{' '}
          {(investor_request?.amount_of_investment ?? 0) * 0.9} میلیون ریال آن از محل وجوه جمع‌آوری
          شده از طریق دارندگان گواهی شراکت برای خرید کل مواد اولیه مورد نیاز و بخشی از دستمزد و سایر
          هزینه‌ها و {(investor_request?.amount_of_investment ?? 0) * 0.1} میلیون ریال آن توسط
          متقاضی برای هزینه دستمزد و سایر هزینه‌های فروش محصولات و خدمات تأمین می‌گردد.
        </p>
      </div>
    );
  };

  return (
    <div className="contract-page page-1">
      {renderHeaderContent()}
      {renderContractClauses()}
    </div>
  );
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
    guarantor: PropTypes.shape({
      guarantor_name: PropTypes.string,
      national_id: PropTypes.string,
    }),
    company_members: PropTypes.shape({
      person_title: PropTypes.string,
      uniqueIdentifier: PropTypes.string,
      signture_document: PropTypes.string,
    }),
  }).isRequired,
};

export default Page1;
