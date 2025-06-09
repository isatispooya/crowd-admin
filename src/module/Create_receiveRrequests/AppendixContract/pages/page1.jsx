import React from 'react';
import moment from 'jalali-moment';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const getGenderTitle = (gender) => {
  if (gender === 'True') return 'آقای';
  if (gender === 'False') return 'خانم';
  return 'آقای/خانم';
};

const Page1 = ({ agencyContract }) => {
  const company_certificate_wage = agencyContract?.investor_request?.company_certificate_wage ?? 0;
  const design_wage = agencyContract?.investor_request?.design_wage ?? 0;
  const execution_wage = agencyContract?.investor_request?.execution_wage ?? 0;
  const marketing_wage = agencyContract?.investor_request?.marketing_wage ?? 0;
  const software_fee =
    agencyContract?.investor_request?.method_payment_fee_software === '2'
      ? agencyContract?.investor_request?.method_payment_fee_software_fee
      : 0;

  const total_fee =
    company_certificate_wage + design_wage + execution_wage + marketing_wage + software_fee;

  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract?.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {'  '}1{agencyContract.investor_request?.contract_number || ''}
              <br />
              تاریخ: {'  '}
              {agencyContract?.investor_request?.agency_agreement_date
                ? moment(agencyContract?.investor_request?.agency_agreement_date).format(
                    'jYYYY/jMM/jDD'
                  )
                : ''}
            </div>

            <img src={crowdlogo} alt="company Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">
                الحاقیه قرارداد عاملیت {agencyContract?.company?.title} (
                {agencyContract?.company?.registration_type_title || ''})
              </h3>
            </div>

            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-32 mt-4"
            />
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="contract-page page-1">
      {renderHeaderContent()}

      <div className="text-justify leading-relaxed text-[23px]">
        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">مقدمه</h3>
          <p className="mb-3 pr-4 text-[23px]">
            استعانت از خداوند متعال، در تاریخ{' '}
            {agencyContract?.investor_request?.agency_agreement_date
              ? moment(agencyContract?.investor_request?.agency_agreement_date)
                  .add(1, 'days')
                  .format('jYYYY/jMM/jDD')
              : ''}{' '}
            الحاقیه قرارداد لازم حاضر وفق مواد 10 و 190 و 219 قانون مدنی به همراه دیگر اسناد و مدارک
            منضم به پیوست قرارداد عاملیت به شماره{' '}
            {`1${agencyContract?.investor_request?.contract_number || '**********'}`} می باشد در شهر
            یزد منعقد می‌گردد و طرفین اظهار و اعلام می‌نمایند که هیچ‌گونه محدودیت یا ممنوعیتی جهت
            امضای این قرارداد نداشته و دارای صلاحیت لازم و کمال صحت عقل و اراده شخصی جهت امضای
            قرارداد هستند در شهر یزد و از تاریخ انعقاد، طرفین ملزم و متعهد به اجرای مفاد آن
            می‌باشند.
          </p>
        </div>

        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">ماده 1) مشخصات طرفین قرارداد</h3>
          <h4 className="font-bold mb-2 text-[23px]">1-1. این قرارداد میان:</h4>

          <div className="party-details mb-3 pr-4">
            <h5 className="font-bold mb-2 text-[23px]">1) طرف اول:</h5>
            <p className="mb-3 text-[23px]">
              شرکت {agencyContract?.company?.title || ''} (
              {agencyContract?.company?.registration_type_title || ''}) به شمارۀ شناسۀ ملی{' '}
              <strong>{agencyContract?.company?.national_id || ''}</strong>، کد اقتصادی{' '}
              <strong>{agencyContract?.company?.economic_code || ''}</strong>، و شماره ثبت{' '}
              <strong>{agencyContract?.company?.registration_number || ''}</strong> نزد{' '}
              {agencyContract?.company?.registration_unit || ''}، به نشانی{' '}
              {agencyContract?.company?.address || ''}
              {agencyContract?.company?.postal_code
                ? `، کدپستی ${agencyContract?.company?.postal_code}`
                : ''}{' '}
              {agencyContract?.company?.tel ? `، شماره تماس ${agencyContract?.company?.tel}` : ''}
            </p>
            <p className="mb-3 text-[23px]">
              به استناد آگهی روزنامه رسمی به شماره{' '}
              {agencyContract?.company_members?.filter(
                (member) => member.signature_document !== null
              )[0]?.signature_document || ''}{' '}
              نمایندگان مجاز و صاحب امضا طرف اول قرارداد در خصوص امضا و استکتاب اسناد تعهد آور طرف
              اول اشخاص ذیل می‌باشند:
            </p>
            <p className="mb-3 text-[23px]">
              الف) نمایندگان طرف نخست:{' '}
              {agencyContract?.company_members
                ?.filter((member) => member.signature === true)
                .map((member, index, filteredArray) => (
                  <React.Fragment key={member.id}>
                    {getGenderTitle(member.gender)} {member.person_title}
                    {' سمت '}
                    {member.position_title} به شماره ملی {member.uniqueIdentifier} شماره تماس{' '}
                    {member.phone_number} {index < filteredArray.length - 1 ? ' و ' : ''}
                  </React.Fragment>
                ))}{' '}
              می باشد.
            </p>
          </div>

          <div className="party-details mb-3 pr-4">
            <h5 className="font-bold mb-2 text-[23px]">2) طرف دوم:</h5>
            <p className="mb-3 text-[23px]">
              شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
              411615733645، و شماره ثبت 13702، در اداره ثبت شرکت ها و موسسات تجاری استان هرمزگان، به
              نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4 واحد 44 شماره تلفن 076-44480555 و
              کدپستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت
              عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان
              امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ 1401/10/24 که از این پس و در این
              قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان گواهي هاي شراكت جهت تأمين
              منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت فرابورس به نامه شـمارة
              1403/ف/0042 مورخ 1403/05/15 از طرف ديگر،
            </p>
            <p className="mb-3 text-[23px]">به شرح مواد زير منعقد گرديد</p>
          </div>
        </div>

        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">ماده 2) موضوع الحاقیه</h3>
          <p className="mb-3 pr-4 text-[23px]">
            1-2. موضوع این‌ الحاقیه عبارت است‌ از: تغییر کارمزد ارائه خدمات تامین مالی موضوع ماده 4
            قرارداد عاملیت به شماره{' '}
            {`1${agencyContract?.investor_request?.contract_number || '**********'}`} مورخ{' '}
            {agencyContract?.investor_request?.agency_agreement_date
              ? moment(agencyContract?.investor_request?.agency_agreement_date).format(
                  'jYYYY/jMM/jDD'
                )
              : ''}
            از مبلغ{' '}
            {(() => {
              const wage = agencyContract?.investor_request?.company_certificate_wage;
              return Number(wage ?? 0) / 1000000;
            })().toLocaleString()}{' '}
            میلیون ریال به {(total_fee / 1000000).toLocaleString()}
            میلیون ریال که مورد تراضی طرفین واقع گردید.
          </p>
        </div>

        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">ماده 3) کارمزد موضوع قرارداد</h3>
          <p className="mb-3 pr-4 text-[23px]">
            1-3. كارمزد ارائه خدمات بازاريابي، بازارسازی، ایجاد کمپین های تبلغیاتی جهت فروش اوراق
            شرکت به سرمایه گذاران و هزینه های کارشناسی و اموراجرایی تامین مالی به متقاضي، جمعا به
            مبلغ{' '}
            <strong>
              {(() => {
                const faraboursWage = agencyContract?.investor_request?.farabours_wage;
                const certificateWage = agencyContract?.investor_request?.company_certificate_wage;
                const marketingWage = agencyContract?.investor_request?.marketing_wage;
                const amountOfPayment = agencyContract?.investor_request?.amount_of_payment;

                const total =
                  (Number(faraboursWage ?? 0) +
                    Number(certificateWage ?? 0) +
                    Number(marketingWage ?? 0) +
                    Number(amountOfPayment ?? 0)) /
                  1000000;

                return total.toLocaleString();
              })()}{' '}
              میلیون ریال
            </strong>{' '}
            مي باشد كه پس از موفقيت در جمع آوری وجوه به حساب عامل به صورت نقدی یا مطابق تبصره 2 ماده
            4 قرارداد عاملیت به شماره{' '}
            {`1${agencyContract?.investor_request?.contract_number || '**********'}`}، پرداخت می
            نماید.
          </p>
        </div>

        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">ماده 4) سایر شرایط</h3>
          <p className="mb-3 pr-4 text-[23px]">
            متقاضی با امضای این الحاقیه ضمن اسقاط کافه خیارات و خیار غبن ولو افحش هر درجه بالا رود
            را از خود سلب وساقط نمود و هرگونه مغایرت قرارداد عاملیت صدر الذکر با الحاقیه حاضر ملغی
            شده و سایر مفاد قرارداد عاملیت کماکان به قوت و اعتبار خود باقیست.
          </p>
        </div>

        <div className="contract-section">
          <h3 className="font-bold mb-2 text-[23px]">ماده 5) اعتبار قرارداد</h3>
          <p className="mb-3 pr-4 text-[23px]">
            این الحاقیه در 5 ماده، در دو نسخه واحد و بدون پیوست، تنظیم گردید که پس از امضاء کلیه نسخ
            آن در حكم واحد بوده و لاازم الاجرا می باشند .
          </p>
        </div>
      </div>
    </div>
  );
};

Page1.propTypes = {
  agencyContract: PropTypes.shape({
    investor_request: PropTypes.shape({
      logo: PropTypes.string,
      contract_number: PropTypes.string,
      agency_agreement_date: PropTypes.string,
      company_certificate_wage: PropTypes.number,
      farabours_wage: PropTypes.number,
      marketing_wage: PropTypes.number,
      amount_of_payment: PropTypes.number,
      design_wage: PropTypes.number,
      execution_wage: PropTypes.number,
      method_payment_fee_software: PropTypes.string,
      method_payment_fee_software_fee: PropTypes.number,
    }),
    company: PropTypes.shape({
      title: PropTypes.string,
      registration_type_title: PropTypes.string,
      national_id: PropTypes.string,
      economic_code: PropTypes.string,
      registration_number: PropTypes.string,
      registration_unit: PropTypes.string,
      address: PropTypes.string,
      postal_code: PropTypes.string,
      tel: PropTypes.string,
    }),
    company_members: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        signature: PropTypes.bool,
        gender: PropTypes.string,
        person_title: PropTypes.string,
        uniqueIdentifier: PropTypes.string,
        position_title: PropTypes.string,
        signature_document: PropTypes.string,
      })
    ),
  }),
};

export default Page1;
