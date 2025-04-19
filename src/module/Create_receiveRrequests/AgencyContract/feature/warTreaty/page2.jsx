import React from 'react';
import { PropTypes } from 'prop-types';

const Page2 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <p className="text-justify leading-relaxed text-[23px]">
        نامیده می‌شود. به وکالت از طرف دارندگان گواهی‌های شراکت جهت تأمین منابع مالی مورد نیاز
        متقاضی، بر اساس مجوز صادره توسط شرکت فرابورس به نامه شماره 0042/ف/1403 مورخ 1403/05/15 از
        طرف دیگر، به شرح مواد زیر منعقد گردید.
      </p>
      <div className="text-justify leading-relaxed text-[23px] ">
        {agencyContract.guarantor.map((item, index) => (
          <p>
            {index + 2}) سرکار آقای/خانم {item?.guarantor_name} به کد ملی {item?.national_id} و
            شماره تماس {item?.phone_number} متولد{' '}
            {item?.birth_date
              ? new Date(item?.birth_date).toLocaleDateString('fa-IR')
              : 'تاریخ نامعتبر'}{' '}
            به آدرس
            {item?.address} واحد {item?.unit} به کد پستی {item?.postal_code} که از این پس در این
            قرارداد به عنوان «ضامن» معرفی می‌گردد.
          </p>
        ))}
        <br />
        3) شرکت {agencyContract.investor_request.company.title} (سهامی خاص) به شناسه ملی{' '}
        {agencyContract.investor_request.company.national_id} کد اقتصادی{' '}
        {agencyContract.investor_request.company.economic_code} و شماره ثبت{' '}
        {agencyContract.investor_request.company.registration_number} در اداره ثبت شرکت‌ها و موسسات
        غیر تجاری {agencyContract.investor_request.company.general_directorate} به نشانی{' '}
        {agencyContract.investor_request.company.address}، پلاک 0، 7، به کد پستی{' '}
        {agencyContract.investor_request.company.postal_code}، با نمایندگی
        {agencyContract.company_members &&
          agencyContract.company_members.length > 0 &&
          agencyContract.company_members
            .filter((member) => member.signature)
            .map((member, index) => (
              <span key={member.id || index}>
                {index > 0 && ' و '} آقای {member.person_title} به شماره ملی{' '}
                {member.uniqueIdentifier} به سمت {member.position_title}{' '}
                {member.signature &&
                  ` که از این پس در این قرارداد بر اساس ${member.signature_document}`}
              </span>
            ))}
        بر اساس {agencyContract.investor_request.company_members?.signture_document}، «متقاضی»
        نامیده می‌شود،
        <br />
        <p className="text-justify leading-relaxed text-[23px]">
          ِ 3) شخص حقیقی/حقوقی با مشخصات و اطلاعات سجامی مندرج در سکوی تأمین مالی جمعی عامل به نشانی
          <strong>Isatiscrowd.ir</strong> که در این قرارداد به اختصار &quot;تأمین کننده/سرمایه
          گذار&quot; نامیده می شود.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold">تبصره:</span> واریز وجه توسط سرمایه‌گذار از طریق سکوی تأمین
          مالی جمعی عامل و نیز تأیید متن بیانیه ریسک و قوانین و مقررات مندرج در سکوی عامل به نشانی
          <strong>isatiscrowd.ir</strong>، به منزله امضای این قرارداد توسط سرمایه گذار تلقی میگردد.
        </p>
        <br />
        <h3 className="text-justify leading-relaxed text-[23px] font-bold"> 2) تعاریف</h3>
        <p className="text-justify leading-relaxed text-[23px]">
          اصطلاحات و واژگان مذکور در این قرارداد، در معنای عرفی و مرسوم خود به کار برده شده اند.
          سایر واژگان، دارای معانی ذیل هستند:
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          1) کارگروه ارزیابی منظور، کارگروهی است که در محل شرکت فرابورس ایران تشکیل میشود و دارای
          پنج عضو و یک دبیر به شرح ذیل میباشد:
          <br /> یک نفر به نمایندگی از رئیس سازمان بورس و اوراق بهادار ، دو نفر به نمایندگی از شرکت
          فرابورس ایران، دو کارشناس در حوزه فعالیت تأمین مالی جمعی با پیشنهاد شرکت فرابورس ایران و
          تأیید رئیس سازمان بورس و اوراق بهادار و یکی از مدیران شرکت فرابورس ایران به عنوان دبیر
          کارگروه بدون حق رأی. جلسات کارگروه ارزیابی با حضور تمامی اعضا تشکیل شده و تصمیمات آن با
          رأی موافق حداقل سه عضو که الزاماً یکی از آنها نماینده سازمان است، معتبر است.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          2) دستورالعمل: منظور، دستورالعمل تأمین مالی جمعی مصوب 1397/02/25 شورای عالی بورس و اوراق
          بهادار و تمامی اصالحیه ها و ابلاغیه های کارگروه ارزیابی در آن خصوص، می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          3) پلتفرم/سکو: منظور، نرم افزار و وبسایت تحت مدیریت عامل به نشانی Isatiscrowd.ir است که
          تحت نظارت شرکت فرابورس ایران، زمینه مشارکت عمومی در تأمین مالی جمعی کسب و کارها را فراهم
          می‌آورد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          4) ناظر فنی/مالی: شخص حقیقی یا حقوقی مورد تأیید فرابورس ایران است که حسب درخواست عامل یا
          کارگروه ارزیابی نسبت به ارزیابی اولیه یا نظارت بر حسن اجرای طرح تعریف شده توسط متقاضی،
          اقدام می کند.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          5)   منظور، موضوع کسب و کار و فعالیت متقاضی است که عبارت {agencyContract.investor_request.suggestion_plan_name} 
          بوده و متقاضی، قصد تأمین منابع مالی مورد نیاز آن را وفق مفاد این قرارداد و از طریق مشارکت
          با سرمایه گذاران، دارد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          6) مبلغ سرمایه گذاری: منظور، مبلغی است که تأمین کننده در طرح سرمایه گذاری کرده و در ازای
          آن گواهی سرمایه گذاری به نام وی صادر شده است. تأمین کننده تا تاریخ اتمام طرح، حق مطالبه
          مبلغ سرمایه گذاری را تحت هر عنوان نداشته و طی این مدت، تنها مستحق دریافت اقساط خرید دارایی
          به تناسب مبلغ سرمایه گذاری خود خواهد بود.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          7) گواهی سرمایه گذاری/گواهی شراکت»: منظور، گواهی ای است که متعاقب سرمایه گذاری، به میزان
          مبلغ سرمایه گذاری و به نام تأمین کننده، صادر و نشانگر حقوق و تکالیف تأمین کننده وفق مفاد
          این قرارداد می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          8) طرح توجیهی»: منظور، گزارشی است که جهت تشریح و توجیه پذیری تأمین مالی طرح متقاضی و با
          توجه به مدارک و مستندات ارسالی متقاضی، توسط عامل تهیه می شود.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          9) سرمایه: منظور، مجموع مبالغ سرمایه گذاری واریزشده از جانب تأمین کنندگان در تاریخ موفقیت
          کمپین می باشد که با رعایت شرایط مذکور در ای ن قرارداد و پس از کسر هزینه های قانونی (کارمزد
          عامل و شرکت فرابورس ایران)، توسط عامل به صورت یکجا، ظرف مدت 2 روز کاری جهت خرید دارایی های
          مورد نیاز به حساب متقاضی واریز میگردد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          10) فراخوان جمع آوری»: منظور، اعلان عمومی طرح در پلتفرم به منظور جذب سرمایه لازم برای
          تأمین منابع مالی مورد نیاز متقاضی، می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          11) نماد طرح »: منظور، نمادی است که توسط شرکت فرابورس ایران و پس از ارسال مدارک و مستندات
          مربوطه، به طرح تخصیص داده میشود.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          12) دوره جمع آوری»: منظور، یک دوره 21 روزه می باشد که با صلاح دید عامل و برای مدت حداکثر 2
          ماه قابل تمدید می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          13) وکالت خرید»: منظور، وکالتی است که تأمین کننده، همزمان با واریز مبلغ سرمایه گذاری، جهت
          خرید داراییهای مورد نیاز به مبلغ{' '}
          <strong>
            {(agencyContract.investor_request.amount_of_investment / 1000000).toLocaleString()}
          </strong>{' '}
          میلیون ریال از فروشنده مجاز، به متقاضی اعطا می نماید. نماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          14) دارایی های خریداری شده: منظور، دارایی‌هایی است که متقاضی با استفاده از مبلغ سرمایه
          گذاری تأمین کننده و به استناد وکالت خرید، از فروشنده مجاز خریداری می نماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          15) وکالت فروش: منظور، وکالتی است که سرمایه‌گذار ، همزمان با واریز مبلغ سرمایه گذاری، به
          متقاضی اعطا نموده و متقاضی به استناد آن، نسبت به انتقال دارایی های خریداری شده به خود
          (سرمایه پذیر) هنوزم به مبلغ {((Number(agencyContract.investor_request.amount_of_investment) * 0.9) * (Number(agencyContract.investor_request.profit_percentage || 0) / 100)) / 1000000} میلیون ریال، اقدام می نماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          16) »حداقل مبلغ قابل پذیرش»: منظور، مبلغ{' '}
          <strong>
            {((Number(agencyContract.investor_request.amount_of_investment) * 0.7)/1000000).toLocaleString()}
          </strong>{' '}
          میلیون ریال است که در صورت جذب آن تا پایان دوره جمع آوری، کمپین موفق فرض می گردد.
        </p>
       
        
      </div>
    </div>
  );
};

Page2.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page2;
