import React from 'react';
import { PropTypes } from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import moment from 'jalali-moment';
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
              شماره قرارداد:{' '}
              {`3${agencyContract.investor_request?.contract_number || '370245611/12/03'}`}
              <br />
              تاریخ: {moment(agencyContract.investor_request?.contract_date).format('jYYYY/jMM/jDD')}
            </div>

            <img src={crowdlogo} alt="Investor Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">
                قرارداد مشارکت {agencyContract.company?.title} (سهامی خاص)
              </h3>
            </div>

            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-32 object-contain mt-4"
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
        <h3 className="font-bold mb-2 text-[23px]">مقدمه</h3>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1)</span>
          تأمین مالی جمعی (Crowd funding) در معنای فراهم نمودن منابع مالی مورد نیاز شرکت‌ها از طریق
          جمع‌آوری سرمایه‌های خرد، یکی از ابزارهای نوین تأمین مالی در چارچوب بازار سرمایه به شمار
          می‌رود؛{' '}
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2)</span>
          شرکت {agencyContract.company?.title}، فعال در حوزه
          {agencyContract.investor_request?.activity_field}، در راستای بهبود عملکرد و توسعه کسب و
          کار خود، نیازمند جذب سرمایه به میزان{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.amount_of_investment) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال می‌باشد؛
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">3)</span>
          شرکت سبدگردان ایساتیس پویا کیش به عنوان یکی از عاملین مجاز تأمین مالی جمعی، دارای مجوز
          تأمین مالی جمعی از شرکت فرابورس ایران به شماره <br />
          <strong>0042/ف/1403</strong> ، مورخ
          <strong>1403/05/15</strong>
          میباشد؛
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">4)</span>
          وفق توافقات طرفین، مقرر گردید شرکت سبدگردان ایساتیس پویا کیش، در چارچوب مفاد قرارداد حاضر
          و با رعایت مقررات مربوطه، ضمن قبولی سمت به عنوان عامل تأمین مالی جمعی، شرکت{' '}
          <strong>{agencyContract.company?.title}</strong> را در مسیر تأمین مالی و جذب سرمایه مورد
          نیاز، همراهی نماید؛
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">5)</span>
          سرمایه‌گذار با ثبت‌نام در سکوی تأمین مالی جمعی و واریز مبلغ سرمایه‌گذاری، ضمن امضاء و
          تأیید مفاد قرارداد حاضر، از طریق مشارکت در تأمین سرمایه در گردش متقاضی، نسبت به تأمین
          سرمایه مورد نیاز وی اقدام می‌نماید؛
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          قرارداد <strong> تأمین مالی جمعی (Crowdfunding) </strong> حاضر (که از این پس به عنوان
          قرارداد مورد ارجاع قرار خواهد گرفت)، به استناد قوانین و مقررات مربوطه اعم از بند ب ماده{' '}
          <strong>7</strong>و ماده <strong>21</strong> دستورالعمل تأمین مالی جمعی (مصوب 25/02/1397)
          و نیز مواد <strong>10</strong> و <strong>219</strong> قانون مدنی، میان اطراف زیر با آگاهی
          ایشان نسبت به شرایط و مقررات حاکم بر موضوع قرارداد، منعقد گردید. این قرارداد به همراه
          ضمائم آن که عضو لاینفک قرارداد می‌باشد، برای اطراف آن و نیز وراث و قائم‌مقام قانونی آنان
          الزام‌آور بوده و موجد حقوق و تعهدات مربوطه ایشان می‌باشد. هدف از نگارش این بند، بیان
          ساختار کلی قرارداد که نشانگر مبانی توافقات، انگیزه و قصد طرفین در اجرای این قرارداد است،
          می‌باشد. بدین ترتیب، اجرای قرارداد بر اساس حقوق و تعهدات مندرج در مواد آتی صورت پذیرفته و
          بند حاضر، صرفاً مبنای تفسیر و تبیین رویه اجرایی قرارداد می‌باشد.
        </p>
        <br />
        <h3 className="font-bold mb-2 text-[23px]">ساختار کلی قرارداد :</h3>

        <p>
          شرکت <strong>{agencyContract.company?.title}</strong> به منظور رشد، توسعه و تحقق
          برنامه‌های تجاری خود، نیازمند اجرای طرحی مشتمل بر خرید لیستی از دارایی‌ها (به شرح مذکور در
          پیوست 1) مجموعاً به مبلغ
          <strong>
            {(
              Number(agencyContract.investor_request.amount_of_investment) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال، معادل{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.amount_of_investment) /
              1000000 /
              10
            ).toLocaleString()}
          </strong>
          میلیون تومان میباشد که وفق قوانین و مقررات مربوطه، شرکت شخصاً، موظف به تأمین{' '}
          <strong>10 </strong>درصد از مبلغ مزبور به میزان{' '}
          <strong>
            {(
              (Number(agencyContract.investor_request.amount_of_investment) / 1000000) *
              0.1
            ).toLocaleString()}
          </strong>
          میلیون ریال می‌باشد. بدین ترتیب، از مجموع سرمایه مورد نیاز، حداکثر <strong>90 </strong>
          درصد از عموم اشخاص حقیقی و حقوقی قابل‌تأمین است. لذا شرکت قصد دارد سرمایه مورد نیاز را از
          مجرای بازار سرمایه و در چارچوب مقررات مربوط به تأمین مالی جمعی، فراهم آورد. بنابر توافق
          اطراف قرارداد، نحوه تأمین مالی وفق مفاد این قرارداد بر پایه مشارکت سرمایه‌گذاران در تأمین
          مالی شرکت از طریق خرید دارایی‌های مورد نیاز توسط متقاضی به وکالت از سرمایه‌گذار به مبلغ{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.amount_of_investment) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال و فروش دارایی‌های خریداری‌ شده به خود به وکالت از سرمایه‌گذار به مبلغ{' '}
          <strong>
            {(
              Number(
                agencyContract.investor_request.amount_of_investment *
                  0.9 *
                  agencyContract.investor_request.interest_rate_plan +
                  agencyContract.investor_request.amount_of_investment
              ) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال و بدین شکل خواهد بود که سرمایه‌گذار، وفق ضوابط و مقررات استفاده از خدمات سکوی
          تأمین مالی جمعی عامل، اقدام به سرمایه‌گذاری در طرح متقاضی به میزان مدنظر خود مینماید.
          متعاقب سرمایه گذاری و واریز وجه توسط تأمین‌کننده، گواهی سرمایه گذاری به میزان رقم
          سرمایه‌گذاری شده برای تأمین‌کننده صادر و ایشان به تناسب رقم مندرج در گواهی مذکور، وفق مفاد
          این قرارداد طرف حق و تکلیف واقع می‌گردد. سرمایه‌گذار تا تاریخ اتمام طرح،حق مطالبه مبلغ
          سرمایه گذاری را نداشته و طی این مدت، تنها مستحق دریافت اقساط خرید دارایی به تناسب مبلغ
          یادشده، خواهدبود. تأمین کننده همزمان با سرمایه گذاری و صدورگواهی سرمایه گذاری به نام خود ،
          به سرمایه پذیر وکالت همزمان در خرید دارایی های مورد نیاز به مبلغ{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.amount_of_investment) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال و فروش دارایی های خریداری شده به خود (سرمایه پذیر)به مبلغ{' '}
          <strong>
            {(
              Number(
                agencyContract.investor_request.amount_of_investment *
                  0.9 *
                  (agencyContract.investor_request.interest_rate_plan / 100) +
                  agencyContract.investor_request.amount_of_investment
              ) / 1000000
            ).toLocaleString()}
          </strong>
          میلیون ریال اعطا می نماید. بدین ترتیب، به مجرد سرمایه گذاری تأمین کننده در طرح کسب و کار
          متقاضی، رابطه وکیل و موکل میان سرمایه گذار و سرمایه پذیر برقرار شده و سرمایه‌پذیر، وکیلِ
          سرمایه گذار در خرید دارایی های مورد نیاز با استفاده از مبلغ سرمایه گذاری تأمین کننده و نیز
          فروش دارایی های خریداری شده به خود (سرمایه پذیر) می باشد.
        </p>
        <br />
        <p>
          استفاده از مبلغ سرمایه گذاری تأمین کننده و نیز فروش دارایی های خریداری شده به خود (سرمایه
          پذیر) می باشد. پس از سرمایه گذاری و اعطای وکالت مزبور، سرمایه پذیر، اقساط دارایی های
          خریداری شده را وفق مفاد این قرارداد و در مواعد مقرر، به تناسب مشارکت هر سرمایه گذار در
          تأمین مالی و رقم سرمایه گذاری، به وی پرداخت خواهد نمود. شرکت سبدگردان ایساتیس پویا ، به
          عنوان عامل تأمین مالی جمعی، حافظ منافع سرمایه گذار در این مسیر بوده و تأمین کننده با
          سرمایه گذاری و امضای ذیل این قرارداد، به عامل وکالت در اخذ اقساط دوره ای از سرمایه پذیر و
          واریز به حساب خود (سرمایه گذار) و نیز وکالت در پیگیری حقوق خود در برابرسرمایه پذیر را اعطا
          می نماید. بنابراین، سرمایه گذار، به مجرد سرمایه گذاری و امضای این قرارداد، تحت هیچ عنوان،
          شخصاً حق پیگیری امور مربوط به این قرارداد از قبیل طرح دعوا نسبت به پرداخت اقساط دوره ای و
          بازپرداخت مبلغ سرمایه گذاری را نداشته و با سرمایه گذاری و اعطای وکالت با حق توکیل به غیر و
          انتخاب وکیل دادگستری به عامل، حق انجام موضوع وکالت را تا پایان مدت طرح متقاضی از خود سلب و
          ساقط می نماید.
        </p>
        <br />
        <h3 className="font-bold mb-2 text-[23px]">اطراف قرارداد :</h3>

        <p className="text-justify leading-relaxed text-[23px]">
          <br />
          1) شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
          411615733645، و شماره ثبت 13702، در اداره ثبت شرکت‌ها و موسسات تجاری استان هرمزگان، به
          نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4، واحد 44، شماره تلفن 076-44480555 و کد
          پستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو
          هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز
          بر اساس روزنامه رسمی شماره 22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل»
          <br />
        </p>
      </div>
    </div>
  );
};

Page1.propTypes = {
  agencyContract: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

export default Page1;
