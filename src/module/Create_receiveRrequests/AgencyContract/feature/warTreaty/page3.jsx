import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'jalali-moment';

const Page4 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] ">
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
          (سرمایه پذیر) هنوزم به مبلغ{' '}
          {(
            Number(
              agencyContract.investor_request.amount_of_investment *
                0.9 *
                (agencyContract.investor_request.interest_rate_plan / 100) +
                agencyContract.investor_request.amount_of_investment
            ) / 1000000
          ).toLocaleString()}{' '}
          میلیون ریال، اقدام می نماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          16) »حداقل مبلغ قابل پذیرش»: منظور، مبلغ{' '}
          <strong>
            {(
              (Number(agencyContract.investor_request.amount_of_investment) * 0.7) /
              1000000
            ).toLocaleString()}
          </strong>{' '}
          میلیون ریال است که در صورت جذب آن تا پایان دوره جمع آوری، کمپین موفق فرض می گردد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          17) موفقیت کمپین»: منظور، اعم از موفقیت کمپین در جذب سرمایه به میزان حداقل مبلغ قابل پذیرش
          و یا جمع آوری کامل وجوه مورد نیاز (به مبلغ{' '}
          <strong>
            {(agencyContract.investor_request.amount_of_investment / 1000000).toLocaleString()}
          </strong>{' '}
          میلیون ریال)، می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          18) »تاریخ موفقیت کمپین»: منظور، تاریخی است که در آن، طرح موفق به جذب سرمایه به میزان
          حداقل مبلغ قابل پذیرش یا جمع‌آوری کامل وجوه مورد نیاز، می شود.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          19) »آورده شخصی»: منظور، حداقل <strong>10 </strong>درصد سرمایه مورد نیاز (معادل مبلغ
          <strong>
            {(
              (agencyContract.investor_request.amount_of_investment * 0.1) /
              1000000
            ).toLocaleString()}
          </strong>{' '}
          میلیون ریال) است که متقاضی موظف است شخصاً نسبت به تأمین آن اقدام و ظرف مدت حداکثر 7 روز
          تقویمی از تاریخ درخواست مکتوب عامل، به شماره حساب عامل واریز نماید. انتشار فراخوان جمع
          آوری، منوط به واریز رقم مزبور توسط متقاضی می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          20) »بدهی»: عبارت از اصل مبلغ سرمایه، اقساط خرید دارایی و حسب مورد وجه التزام و خسارات
          تعلقگرفته به آن، میباشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          21) »قیمت خرید دارایی»: منظور، قیمتی است که متقاضی با پرداخت آن، دارایی های مورد نیاز را
          از فروشنده مجاز خریداری نموده و در وکالت خرید نیز منعکس میگردد. قیمت خرید دارایی در این
          قرارداد، معادل وجوه جمع آوری شده در تاریخ موفقیت کمپین است. )اعم از حداقل مبلغ قابل پذیرش
          و یا تمامی سرمایه مورد نیاز(
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          22) قیمت فروش دارایی: منظور، قیمتی است که متقاضی با پرداخت آن، دارایی های خریداری شده را
          به خود منتقل نموده و در وکالت فروش نیز منعکس میگردد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          23) »اقساط خرید دارایی»: منظور، مابه التفاوت قیمت خرید و فروش دارایی است (معادل مبلغ
          {(
            Number(
              agencyContract.investor_request.amount_of_investment *
                0.9 *
                (agencyContract.investor_request.interest_rate_plan / 100) +
                agencyContract.investor_request.amount_of_investment
            ) / 1000000
          ).toLocaleString()}
          میلیون ریال) که متقاضی موظف است در مواعد پرداخت و وفق مفاد این قرارداد، به شماره حساب عامل
          واریز نماید. بدیهی است در محاسبه این مبلغ، سود تعلق گرفته به آورده شخصی، مدنظر قرار
          نمیگیرد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          24) »عدم موفقیت کمپین»: منظور، وضعیتی است که با اتمام دوره جمع آوری و حسب مورد تمدید آن،
          طرح موفق به جذب سرمایه به میزان حداقل مبلغ قابل پذیرش و یا مجموع سرمایه مورد نیاز، نگردیده
          است.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          25) »شماره حساب سرمایه گذار»: منظور، شماره حساب اعالمی سرمایه گذار که متصل به سامانه سجام
          (سامانه جامع اطلاع مشتریان) است، می باشد. کلیه پرداخت های موضوع این قرارداد به شماره حساب
          مذکور صورت گرفته و این موضوع به تأیید سرمایه گذار رسیده است.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          26) »دارایی های مورد نیاز»: منظور، داراییهایی است که متقاضی برای خرید آن ها درخواست تأمین
          مالی نموده (به شرح مندرج در پیوست 1 گزارش ارزیابی) و وفق مفاد این قرارداد و وکالت خرید و
          فروش، نسبت به خرید آن ها از فروشنده مجاز و سپس انتقال آن ها به خود، اقدام مینماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          27) »مواعد پرداخت«: منظور، انقضای هر دوره سه ماهه از تاریخ موفقیت کمپین میباشد که متقاضی
          در آن تاریخها، ملزم به پرداخت اقساط خرید دارایی به شماره حساب عامل می باشد. بدین ترتیب، در
          فرضی که تاریخ موفقیت کمپین <strong>1403/01/01</strong> باشد، موعد پرداخت اولین قسط خرید
          دارایی، تاریخ
          <strong>1403/04/01</strong> میباشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          28) »شماره حساب عامل»: منظور، حساب به شماره <strong>3002115158845881</strong> با شماره
          شبای <strong>IR470570300211515884588001</strong> نزد بانک پاسارگاد به نام شرکت سبدگردان
          ایساتیس پویا کیش (سهامی خاص) میباشد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          29) »شماره حساب متقاضی»: منظور، حساب به شماره{' '}
          <strong>{agencyContract.investor_request.payment_account_number || 0}</strong> با شماره
          شبای <strong>{agencyContract.investor_request.sheba_number || 0}</strong> نزد{' '}
          {agencyContract.investor_request.payment_bank || 'بانک سامان'} به نام شرکت{' '}
          {agencyContract.investor_request.company.title} میباشد که صرفاً مربوط به انجام تراکنش های
          مالی مربوط به این قرارداد بوده و متقاضی تحت هیچ عنوان، حق استفاده از حساب مذکور را برای
          مقاصد دیگر نخواهد داشت. تحت هیچ عنوان، حق استفاده از حساب مذکور را برای مقاصد دیگر نخواهد
          داشت.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          30) »تاریخ واریز سرمایه»: منظور، تاریخی است که سرمایه توسط عامل و با رعایت شرایط مذکور در
          این قرارداد به حساب متقاضی واریز میگردد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          31) »اشخاص وابسته»: منظور، اعم از اشخاص حقیقی و حقوقی است که:
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          -به صورت مستقیم و یا غیرمستقیم، مالک هر میزان سهام از متقاضی باشند؛
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          -شرکتی که یک یا چند عضو از هیئت مدیره و یا مدیرعامل آن، در هیئت مدیره متقاضی نیز عضویت
          داشته باشند؛{' '}
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          -شرکتی که مدیرعامل و یا هر یک از اعضای هیئت مدیره متقاضی، مدیرعامل و یا عضو هیئت مدیره آن
          باشند.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          32) »فروشنده/ فروشندگان مجاز»: منظور، شخصی است (اعم از حقیقی و حقوقی) که از اشخاص وابسته
          به متقاضی نبوده و متقاضی، به استناد وکالت خرید، نسبت به خرید دارایی های مورد نیاز از ایشان
          اقدام می نماید. (به شرح مذکور در پیوست گزارش ارزیابی(
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          33) صورتحساب: منظور، صورتحساب رسمی، ممهور به مهر و دارای امضای فروشنده مجاز بوده که نشانگر
          خرید دارایی های مورد نیاز توسط متقاضی با استفاده از سرمایه، می باشد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          34) تاریخ اتمام طرح : منظور، یکسال شمسی پس از تاریخ موفقیت کمپین میباشد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          35) روز تقویمی/ روز عبارت از کلیه روزهای تقویم بدون هرگونه قید و شرط مطابق تقویم ایران می
          باشد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          36) روز کاری: عبارت است از کلیه روزهای هفته منوط بر آنکه در آن روز، بانکها در ایران باز
          باشند.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          37) ضامنین:
          {Array.isArray(agencyContract?.guarantor) &&
            agencyContract.guarantor
              .filter((g) => g.company_agent === null)
              .map((item, index) => (
                <p key={`physical-guarantor-${index}`}>
                  {index + 3}) سرکار آقای/خانم {item.members?.[0]?.guarantor_name} به کد ملی{' '}
                  {item.members?.[0]?.guarantor_national_id} و شماره تماس{' '}
                  {item.members?.[0]?.phone_number} متولد{' '}
                  {moment(item.members?.[0]?.birth_date).format('jYYYY/jMM/jDD')} به آدرس{' '}
                  {item.members?.[0]?.guarantor_address} واحد {item.members?.[0]?.unit} به کد پستی{' '}
                  {item.members?.[0]?.postal_code} که از این پس در این قرارداد به عنوان «ضامن حقیقی»
                  معرفی می‌گردد.
                </p>
              ))}
          {Array.isArray(agencyContract?.guarantor) &&
            agencyContract.guarantor
              .filter((g) => g.company_agent !== null)
              .map((item, index) => (
                <p key={`legal-guarantor-${index}`}>
                  {index +
                    3 +
                    agencyContract.guarantor.filter((g) => g.company_agent === null).length}
                  ) شرکت {item.company_agent} ({item.kind_of_company}) به شناسه ملی{' '}
                  {item.company_national_id}، به شماره ثبت {item.register_number_of_company} در{' '}
                  {item.general_directorate_of_company}،{item.registration_unit_of_company}، به
                  نشانی {item.address_of_company}، به کدپستی {item.postal_code_of_company}،
                  {item.members && item.members.length > 0 && (
                    <>
                      {' '}
                      با نمایندگی{' '}
                      {item.members.map((member, memberIndex) => (
                        <span key={member.id}>
                          {memberIndex > 0 && ' و '}
                          {member.guarantor_name} به شماره ملی {member.guarantor_national_id} به سمت{' '}
                          {member.position_title}
                        </span>
                      ))}
                    </>
                  )}{' '}
                  بر اساس روزنامه رسمى شماره {item.document_news_paper} که از این پس در این قرارداد
                  &quot;ضامن حقوقی&quot; نامیده می‌شود
                </p>
              ))}
          <br />
        </p>
        <br />

        <br />
      </div>
    </div>
  );
};

Page4.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page4;
