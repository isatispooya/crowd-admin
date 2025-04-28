import React from 'react';
import PropTypes from 'prop-types';
import moment from 'jalali-moment';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const Page1 = ({ data }) => {
  if (!data) return null;

  const renderHeaderContent = () => {
    if (!data) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {data.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {`2${data.investor_request?.contract_number || ''}`}
              <br />
              تاریخ: {moment(data.investor_request?.agency_agreement_date).format('jYYYY/jMM/jDD')}
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
    const { company, investor_request, company_cost, guarantor, company_members } = data;

    return (
      <div className="contract-clauses p-4 text-sm leading-relaxed">
        {renderHeaderContent()}
        <h2 className="text-[23px] font-bold mb-2">ماده 1) طرفین قرارداد</h2>
        <p className="text-[23px]  mt-4 mb-2">
          1-1. این قرارداد میان:
          <br />
          1) شرکت {company?.title} (سهامی خاص) به شناسه ملی {company?.national_id} کد اقتصادی{' '}
          {company?.economic_code} و شماره ثبت {company?.registration_number} در اداره ثبت شرکت‌ها و
          موسسات غیر تجاری {company?.general_directorate} به نشانی {company?.address}، پلاک 0، 7، به
          کد پستی {company?.postal_code}، با نمایندگی
          {company_members &&
            company_members.length > 0 &&
            company_members
              .filter((member) => member.signature)
              .map((member, index) => (
                <span key={member.id || index}>
                  {index > 0 && ' و '} آقای {member.person_title} به شماره ملی{' '}
                  {member.uniqueIdentifier} به سمت {member.position_title}{' '}
                  {member.signature &&
                    ` که از این پس در این قرارداد بر اساس ${member.signature_document}`}
                </span>
              ))}
          بر اساس {company_members?.signture_document}، «متقاضی» نامیده می‌شود،
          <br />
          2) شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
          411615733645، و شماره ثبت 13702، در اداره ثبت شرکت‌ها و موسسات تجاری استان هرمزگان، به
          نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4، واحد 44، شماره تلفن 076-44480555 و کد
          پستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو
          هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز
          بر اساس روزنامه رسمی شماره 22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل»
          نامیده می‌شود. به وکالت از طرف دارندگان گواهی‌های شراکت جهت تأمین منابع مالی مورد نیاز
          متقاضی، بر اساس مجوز صادره توسط شرکت فرابورس به نامه شماره 0042/ف/1403 مورخ 1403/05/15 از
          طرف دیگر، به شرح مواد زیر منعقد گردید.
          <br />
          {guarantor
            .filter((g) => g.guarantor_national_id === 'physical')
            .map((item, index) => (
              <p key={`physical-guarantor-${index}`}>
                {index + 3}) سرکار آقای/خانم {item?.members?.guarantor_name} به کد ملی{' '}
                {item?.members?.guarantor_national_id} و شماره تماس {item?.members?.phone_number}{' '}
                متولد {moment(item?.members?.birth_date).format('jYYYY/jMM/jDD')} به آدرس{' '}
                {item?.members?.guarantor_address} واحد {item?.members?.unit} به کد پستی{' '}
                {item?.members?.postal_code} که از این پس در این قرارداد به عنوان «ضامن حقیقی» معرفی
                می‌گردد.
              </p>
            ))}
          {guarantor
            .filter((g) => g.guarantor_national_id !== 'physical')
            .map((item, index) => (
              <p key={`legal-guarantor-${index}`}>
                {index + 3 + guarantor.filter((g) => g.guarantor_national_id === 'physical').length}
                ) شرکت {item.company_agent} ({item.kind_of_company}) به شناسه ملی{' '}
                {item.company_national_id}، به شماره ثبت {item.register_number_of_company} در{' '}
                {item.general_directorate_of_company}،{item.registration_unit_of_company}، به نشانی{' '}
                {item.address_of_company}، به کدپستی {item.postal_code_of_company}،
                {item.members &&
                  item.members.length > 0 &&
                  item.members.map(
                    (member) =>
                      `با نمایندگی ${member.guarantor_name} به شماره ملی ${member.guarantor_national_id}`
                  )}
                بر اساس روزنامه رسمى شماره {item.document_news_paper} که از این پس در این قرارداد
                &quot;ضامن حقوقی&quot; نامیده می‌شود
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
          <br />
          2-6. حداقل منابع مالی جمع آوری شده: مقدار وجوه نقدی است که درصورت جمع آوری و پرداخت آن
          توسط تامین کنندگان، فرض میشود طرح در جذب سرمایه مورد نیاز متقاضی موفق بوده است. در قرارداد
          حاضر حداقل منابع مالی جمع آوری شده 175،000 میلیون ریال معادل هفده میلیارد و پانصد میلیون
          تومان است.
          <br />
          2-7. دستورالعمل: منظور دستورالعمل تأمین مالی جمعی مصوب 25/02/1395 شورای عالی بورس و اوراق
          بهادار به انضمام کلیه مصوبات، بخشنامه ها، ابلاغیه ها، اطلاعیه ها، ضوابط و دستورالعمل‌های
          اجرایی که متعاقب آن توسط نهادهای ذیربط مصوب شده است، می باشد.
          <br />
          2-8. کارگروه ارزیابی: کارگروهی که مطابق ماده 14 دستورالعمل تامین مالی جمعی تشکیل می گردد.
          <br />
          2-9. گواهی شراکت: ورقه بهاداری است که در تامین مالی جمعی بصورت الکترونیکی به درخواست عامل
          و توسط شرکت فرابورس ایران منتشر می شود.
          <br />
          1 شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
          411615733645، و شماره ثبت 13702، در اداره ثبت شرکت‌ها و موسسات تجاری استان هرمزگان، به
          نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4، واحد 44، شماره تلفن 076-44480555 و کد
          پستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو
          هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز
          بر اساس روزنامه رسمی شماره 22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل»
          <br />
          10-2. واحد سرمایه گذاری: هر واحد سرمایه گذاری برابر با مبلغ 1،000 ریال معادل صد تومان است.
          حداقل تعداد واحد سرمایه گذاری برای مشارکتِ تامین کننده در این قرارداد هزار واحد است.
          <br />
          11-2. موفقیت طرح در جذب سرمایه: به وضعیتی اطلاق می شود که کلیه منابع مالی مورد نیاز متقاضی
          یا حداقل منابع مالی جمع آوری شده طبق این قرارداد در بازه زمانی نمایش، توسط یک یا چند تامین
          کننده تعهد و به حساب مشخص شده بابت آن نزد عامل پرداخت شده باشد.
          <br />
          12-2. دوره اجرای طرح: منظور مدت زمانی است که متقاضی نسبت به اجرای کسب وکار طرح اقدام می
          نماید. این مدت از اولین روز کاری پس از تحویل اولین قسط از وجوه به متقاضی شروع می شود و در
          هر حال بیشتر از 14 ماه پس از آن مقطع نخواهد بود. در پایان دوره اجرای طرح، پس از وصول و بر
          اساس گزارش تسویه طرح نسبت به تسویه حساب ذینفعان آن اقدام می شود.
          <br />
          13-2. متقاضی: شخص حقیقی است که به منظور تامین منابع مالی، طبق الزامات دستورالعمل تامین
          مالی جمعی و مقررات سکوی شرکت ایساتیس به عامل مراجعه می کند.
          <br />
          14-2. تامین کننده (تامین کنندگان):شخص حقیقی یا حقوقی است که منابع مالی مورد نیاز متقاضی را
          تامین می کند. عامل و نهاد مالی درصورتی که سرمایه گذاری کنند به عنوان تامین کننده خواهند
          بود و از تمامی حقوق آنها برخوردار می گردند.
          <br />
          15-2. ضامن: شخص حقیقی یا حقوقی است که ایفای تعهدات متقاضی در این قرارداد را تضمین نموده
          است.
          <br />
          16-2. ضمانت نامه تعهد پرداخت: ضمانت نامه بانکی صادره از بانکهای جمهوری اسلامی ایران است که
          مستقل از قرارداد حاضر (قرارداد پایه) قابلیت مطالبه دارد.
          <br />
          17-2. فراخوان تامین: اعلام درخواست متقاضی، در سکو برای معرفی به تامین کنندگان است.
        </p>
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
      general_directorate: PropTypes.string,
    }),
    investor_request: PropTypes.shape({
      logo: PropTypes.string,
      contract_number: PropTypes.string,
      subject_activity_document: PropTypes.string,
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
    company_members: PropTypes.arrayOf(
      PropTypes.shape({
        person_title: PropTypes.string,
        uniqueIdentifier: PropTypes.string,
        position_title: PropTypes.string,
        signature: PropTypes.string,
        signature_document: PropTypes.string,
      })
    ),
    company_cost: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        amount_of_3_months: PropTypes.number,
        amount_of_year: PropTypes.number,
      })
    ),
    performance_forecast: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, value: PropTypes.string })
    ),
    profit_and_loss_forecast: PropTypes.shape({
      description: PropTypes.string,
      amount_of_months: PropTypes.number,
      amount_of_3_months: PropTypes.number,
      amount_of_year: PropTypes.number,
    }),
  }).isRequired,
};

export default Page1;
