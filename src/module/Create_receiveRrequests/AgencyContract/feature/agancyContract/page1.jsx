import React from 'react';
import { PropTypes } from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import moment from 'moment-jalaali';
import crowdlogo from './crowdlogo.png';

const Page1 = ({ agencyContract }) => {
  if (!agencyContract) return null;
  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {'  '}1{agencyContract.investor_request?.contract_number || ''}
              <br />
              تاریخ: {'  '}
              {agencyContract.investor_request?.agency_agreement_date
                ? moment(agencyContract.investor_request.agency_agreement_date).format(
                    'jYYYY/jMM/jDD'
                  )
                : ''}
            </div>

            <img src={crowdlogo} alt="company Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">
                قرارداد عاملیت {agencyContract.company?.title} (سهامی خاص)
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
        <h3 className="font-bold mb-2 text-[23px]">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2 text-[23px]">1-1. این قرارداد میان:</p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1) طرف اول:</span> شرکت{' '}
          {agencyContract.company?.title || ''} (
          {agencyContract.company?.registration_type_title || ''}) به شمارۀ شناسۀ ملی{' '}
          <strong>{agencyContract.company?.national_id || ''}</strong>، کد اقتصادی{' '}
          <strong>{agencyContract.company?.economic_code || ''}</strong>، و شماره ثبت{' '}
          <strong>{agencyContract.company?.registration_number || ''}</strong> نزد{' '}
          {agencyContract.company?.registration_unit || ''}، به نشانی{' '}
          {agencyContract.company?.address || ''}
          {agencyContract.company?.postal_code
            ? `، کدپستی ${agencyContract.company.postal_code}`
            : ''}{' '}
          {agencyContract.company?.tel ? `، شماره تماس ${agencyContract.company.tel}` : ''}، و با
          نمایندگی{' '}
          {agencyContract.company_members
            ?.filter((member) => member.signature === true)
            .map((member, index, filteredArray) => (
              <React.Fragment key={member.id}>
                {member.gender === 'True' ? 'آقای' : 'خانم'} {member.person_title} به شماره ملی{' '}
                {member.uniqueIdentifier}
                سمت {member.first_role}
                {member.second_role && ` و ${member.second_role}`}
                {index < filteredArray.length - 1 ? ' و ' : ''}
              </React.Fragment>
            ))}{' '}
          براساس{' '}
          {
            agencyContract.company_members.filter((member) => member.signature_document !== null)[0]
              ?.signature_document
          }{' '}
          که در این قرارداد، «متقاضی» نامیده می شود، از یک طرف،
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) طرف دوم:</span> شرکت سبدگردان ایساتیس پویا کیش
          (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی 411615733645، و شماره ثبت 13702، در اداره
          ثبت شرکت ها و موسسات تجاری استان هرمزگان، به نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه
          4 واحد 44 شماره تلفن 076-44480555 و کدپستی 7941757334 و با نمایندگی آقای سید علی محمد
          خبیری به شماره ملی 4431535474 به سمت عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی
          4431855416 به سمت مدیرعامل، صاحبان امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ
          1401/10/24 که از این پس و در این قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان
          گواهي هاي شراكت جهت تأمين منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت
          فرابورس به نامه شـمارة 03/5/1008438 مورخ 1403/05/15 از طرف ديگر،
        </p>
        <p className="mb-5 text-satrt font-semibold text-[23px]">به شرح مواد زير منعقد گرديد</p>
        <h3 className="font-bold mb-2 text-[23px]">ماده 2) تعاریف</h3>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1) طرح:</span>
          فعالیتی‌ است‌ که‌ متقاضی‌ براي انجام آن در خواست‌ تأمین‌ مالی‌ نموده است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) گواهی شراکت:</span>
          ورقه‌ بهادار الکترونیکی‌ است‌ که‌ از ثبت‌ نزد سازمان بورس معاف است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">3)فراخوان جمع آوری وجوه:</span>
          منظور فرایندي است‌ که‌ &apos;عامل&apos; نسبت‌ به‌ تأمین‌ مالی‌ طرح در یک‌ بازه زمانی‌
          مشخص‌ اقدام می‌نماید. مدت زمان مذکور با صلاحدید عامل‌ می‌تواند تمدید گردد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">4) موفقیت کمپین:</span>
          منظور تأمین‌ مالی‌ طرح به‌ میزان حداقل‌ مبلغ‌ تأمین‌ مالی‌ قابل‌ پذیرش که‌ در فراخوان
          جمع‌آوري وجوه اعلام شده است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">5) دارندگان گواهی‌هاي شراکت‌:</span>
          شخص‌ حقیقی‌ یا حقوقی‌ تأمین‌کننده منابع‌ مالی‌ متقاضی‌ براي اجراي طرح است‌، که‌ نسبت‌ به‌
          خرید گواهی‌هاي شراکت‌ اقدام نموده است.{' '}
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">6) روز کاري: </span>
          تمام روزهاي هفته‌ به‌ غیر از پنج‌شنبه‌، جمعه‌، تعطیلات رسمی‌ و روزهایی‌ که‌ به‌ هر دلیلی‌
          بانک‌ها تعطیل‌ می‌باشند، روز کاري محسوب می‌گردد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">7) قرارداد اقدامات اجرایی‌: </span>
          قراردادي که‌ در صورت موفقیت‌ کمپین‌، به‌ طرح موضوع قرارداد، مواعد و مبالغ‌ چک‌هاي اقساط و
          چک‌هاي تضمین‌ و ... می‌پردازد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">8) تأمین‌ مالی‌ شناور: </span>
          در مدل تأمین‌ مالی‌ شناور، در صورت جمع‌آوري وجوه به‌ میزان درصد مشخصی‌ از مبلغ‌ کل‌ تأمین‌
          مالی‌، کمپین‌ موفق‌ خواهد شد.{' '}
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">9) تأمین مالی جمعی: </span>
          تأمین مالی جمعی، طریقه‌ی تأمین منابع مالی موردنیاز راه‌اندازی یا توسعه یک کسب‌وکار است و
          تأمین‌کننده‌ی منابع، نقش مشارکت‌کننده در طرح را داشته و در سود و زیان، با شرایط مشخص شده
          در طرح شریک است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">10) دستورالعمل: </span>
          منظور دستورالعمل تأمین مالی جمعی مصوب 25/02/1397 شورای عالی بورس و اوراق بهادار به انضمام
          کلیه مصوبات، بخشنامه‌ها، ابلاغیه‌ها، اطّلاعیه‌ها، ضوابط و دستورالعمل‌های اجرایی که متعاقب
          آن توسط نهادهای ذیربط مصوب شده است، می‌باشد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">11) کارگروه ارزیابی: </span>
          کارگروهی که مطابق ماده ۱۴ دستورالعمل تأمین مالی جمعی تشکیل می‌گردد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">12) متقاضی: </span>
          شخص حقوقی است که به منظور تأمین منابع مالی، طبق الزامات دستورالعمل تأمین مالی جمعی و
          مقررات سکوی شرکت ایساتیس پویا به عامل مراجعه می‌کند.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">13) تأمین کننده (تأمین کنندگان): </span>
          شخص حقیقی یا حقوقی است که منابع مالی مورد نیاز متقاضی را تأمین می‌کند. عامل و نهاد مالی
          درصورتی که سرمایه‌گذاری کنند به عنوان تأمین کننده خواهند بود و از تمامی حقوق آنها برخوردار
          خواهند بود.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">14) حداقل منابع مالی جمع‌آوری شده: </span>
          مقدار وجوه نقدی است که در صورت جمع‌آوری و پرداخت آن توسط تأمین‌کنندگان، فرض می‌شود طرح در
          جذب سرمایه مورد نیاز متقاضی موفق بوده است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">15) سکو: </span>
          پلتفرمی است که برای تأمین مالی جمعی توسط عامل ایجاد شده است و اطلاعات لازم طبق مفاد
          دستورالعمل در آن منتشر می‌شود.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">16) فراخوان تأمین: </span>
          اعلام درخواست متقاضی، در سکو برای معرفی به تأمین‌کنندگان است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">17) گواهی شراکت: </span>
          ورقه‌ی بهاداری است که در فرایند تأمین مالی جمعی به شکل الکترونیکی به تقاضای عامل و توسط
          شرکت فرابورس ایران منتشر می‌شود.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">18) واحد سرمایه‌گذاری: </span>
          هر واحد سرمایه‌گذاری برابر با مبلغ 1،000 ریال است. حداقل تعداد واحد سرمایه‌گذاری برای
          مشارکت تأمین‌کننده در این قرارداد، هزار واحد است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">19) موفقیت طرح در جذب سرمایه: </span>
          به وضعیتی اطلاق می‌شود که کلیه منابع مالی مورد نیاز متقاضی یا حداقل منابع مالی جمع‌آوری
          شده طبق این قرارداد در بازه‌ی زمانی نمایش، توسط یک یا چند تأمین‌کننده تعهد و به حساب مشخص
          شده بابت آن، نزد عامل، پرداخت شده باشد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">20) تاریخ موفقیت طرح در جذب سرمایه: </span>
          تاریخی است که در آن، کل یا حداقل منابع مالی مورد نیاز متقاضی طبق این قرارداد، توسط
          تأمین‌کنندگان پرداخت شده باشد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">21) دوره اجرای طرح: </span>
          منظور مدت زمانی است که متقاضی نسبت به اجرای کسب‌وکار طرح اقدام می‌نماید. این مدت از اولین
          روز کاری پس از تاریخ موفقیت طرح در جذب سرمایه شروع می‌شود و درهرحال بیش‌تر از «18 ماه» پس
          از آن مقطع نخواهد بود. در پایان دوره اجرای طرح، پس از وصول و بر اساس گزارش تسویه طرح نسبت
          به تسویه حساب ذینفعان آن اقدام می‌شود.
        </p>
      </div>
    </div>
  );
};

Page1.propTypes = {
  agencyContract: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  registration_type_title: PropTypes.string.isRequired,
  national_id: PropTypes.string.isRequired,
  economic_code: PropTypes.string.isRequired,
  registration_number: PropTypes.string.isRequired,
  registration_unit: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Page1;
