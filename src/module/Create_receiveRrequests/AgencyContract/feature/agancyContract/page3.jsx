import React from 'react';
import { PropTypes } from 'prop-types';

const Page4 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
      <p className="mb-3 pr-4 text-right">
          <span className="font-bold">3)</span> كارمزد انتشار و فروش گواهي شراكت، جمعاً{' '}
          {Number(
            agencyContract.investor_request.company_certificate_wage / 1000000 || 0
          ).toLocaleString()}{' '}
          میلیون ريال ميباشد. متقاضي متعهد است در صورت موفقيت كمپين، حداكثر يك روز كاري پيش از واريز
          وجوه جمع آوري شده به حساب وي، كارمزد جمع آوري شده به حساب وي، كارمزد اين بند را به صورت
          نقدي/ چك به حساب معرفي شده در بند 4-١- اين ماده واريز نمايد
        </p>
 
        <p className="mb-3 pr-4 text-right">
          <span className="font-bold">4)</span>
          كارمزد شركت فرابورس ايران،{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          ميباشد كه متقاضي متعهد است در صورت تائید فرابورس با طرح، همزمان با واریز 10 درصد
          تعهدی(ردیف 2 جدول ماده 5)، كارمزد اين بند را به حساب شمارة 98785727010103 و شمارة شبا
          IR480150000000310107275878 به نام شركت فرابورس ايران نزد بانك سپه واريز نمايد و اصل فيش
          واريزي را به عامل تحويل نمايد.{' '}
        </p>

        <p className="mb-3 pr-4 text-right">
          <span className="font-bold">5)</span>کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی
          و برنامه‌ریزی کمین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی(
          {Number(
            agencyContract.investor_request.marketing_wage / 1000000 || 0
          ).toLocaleString()}{' '}
          میلیون ریال) که متقاضی پس از موفقیت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می
          نماید.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">تبصره 2: </span>
          عامل حق دارد پس از تکمیل فرایند تأمین مالی جمعی و موفقیت پروژه، مبلغ قرارداد را رأسا از
          مجموع مبالغ جمع آوری شده کسر نماید و باقیمانده را در اختیار متقاضی قرار دهد. متقاضی، تأمین
          کنندگان و نهاد مالی به صورت غیرقابل برگشت، حق برداشت از این مبلغ و تسویه مبلغ قرارداد توسط
          عامل را به عامل اعطا کرده و حق هرگونه ادعایی را در این خصوص از خود سلب و ساقط نموده اند.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">تبصره 3: </span>
          پرداخت عامل از منابع مالی جمع آوری شده به متقاضی و هرگونه هزینه کرد، از این محل ، منوط و
          مشروط به تأییدیه عامل و احراز صحت عملکرد متقاضی در ارائه گزارش ها، دستیابی به اهداف، شاخص
          های عملکرد کلیدی و برنامه ی کسب وکار مصوب به وسیله عامل است؛ در غیر این صورت موضوع جهت
          تعیین تکلیف به کارگروه ارزیابی ارجاع خواهد شد. عامل و متقاضی حق استفاده از منابع مالی را
          از تاریخ ارجاع تا تعیین تکلیف کارگروه ارزیابی را ندارند. تصمیم کارگروه ارزیابی برای
          متقاضی، لازم الاتباع است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">تبصره 4: </span>
          در صورت موافقت عامل با پرداخت مبلغ طرح، در یک مرحله، این امر تأثیری در تعهد متقاضی در خصوص
          ارائه ی گزارش ها و دستیابی به اهداف مقرر در قرارداد حاضر و الزامات قانونی و مقرره ای ندارد
          و در صورت احراز و اعلام نقض این امر برای عامل ، متقاضی متعهد است تا زمان تعیین تکلیف از
          جانب کارگروه ارزیابی ، هیچ گونه دخل و تصرفی در مبلغی باقی مانده در حساب خود نداشته باشد.
          هرگونه تصرف در مبلغ طرح، نزد متقاضی ، پس از اعلام عامل به موجب این بند یا تبصره، عامل می
          تواند اسناد تضمین نزد خود را حال نماید و متقاضی حق طرح هرگونه ادعا و اعتراض در این خصوص را
          از خود سلب و ساقط نموده است.
        </p>

        <h3 className="font-bold mb-2 text-[23px] text-right">ماده5 ) شرایط انتشار گواهی شراکت</h3>
        <p className="mb-2 text-right">
          متقاضي تمامي شرايط انتشار گواهي شراكت موضوع قرارداد را به شرح جدول اين ماده تأييد مي نمايد
          و متعهد به ايفاي تمامي تعهدات مندرج در جدول ذیل ميباشد:{' '}
        </p>

        <table className="table-auto w-full border-collapse border border-gray-300 text-[22px]">
          <thead>
            <tr>
              <th className="border border-gray-300 text-[22px] text-right pr-2">ردیف</th>
              <th className="border border-gray-300 text-[22px] text-right pr-2">شرایط</th>
              <th className="border border-gray-300 text-[22px] text-right pr-2">توضیحات</th>
            </tr>
          </thead>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">1</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                مبلغ کل تامین مالی
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000 || 0
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">2</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">آورده متقاضی</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های شراکت از شرکت
                فرابورس ایران،{' '}
                <strong>
                  {(
                    (Number(agencyContract.investor_request.amount_of_investment || 0) / 1000000) *
                    0.1
                  ).toLocaleString()}{' '}
                  میلیون ریال{' '}
                </strong>
                معادل 10 درصد مبلغ کل تامین مالی (ردیف 1) را به شماره حساب 3002115158845881 و شماره
                شبا 4705703002115158845881 IR نزد بانک پاسارگاد شعبه جمهوری یزد به نام شرکت سبدگردان
                ایساتیس پویا کیش واریز نماید.
                <br /> تبصره2: در صورت عدم واریز آورده متقاضی حداکثر طی 5 روز کاری از زمان درخواست
                عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این
                قرارداد 2-1 ماده 9 این قرارداد می باشد.
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">3</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                خالص مبلغ تامین مالی{' '}
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                <strong>
                  {(
                    (Number(agencyContract.investor_request.amount_of_investment || 0) / 1000000) *
                    0.9
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
                ، معادل 90 درصد مبلغ کل تامین مالی
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">4</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                {' '}
                دوره بازپرداخت اقساط
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                {Number(agencyContract.investor_request.duration_of_plan || 0).toLocaleString()}
                ماه
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">5</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                شیوه بازپرداخت اصل و متفرعات مبلغ تامین مالی
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                متفرعات (سود) به صورت{' '}
                {(() => {
                  switch (agencyContract.investor_request.refund_of_plan) {
                    case '0':
                      return 'یکجا در پایان طرح';
                    case '1':
                      return 'هر یکماه';
                    case '3':
                      return 'هر سه ماه';
                    default:
                      return agencyContract.investor_request.refund_of_plan;
                  }
                })()}{' '}
                و با ارائه چك صيادي طرح جديد در مواعد مقرر توسط متقاضي (٤ فقره چك صيادي) حداكثر يك
                روز كاري پس از موفقيت كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي
                طرح كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح جديد توسط متقاضي
                (١ فقره چك صيادي) حداكثر يك روز كاري پس از موفقيت كمپين و جمع آوري وجوه. تبصره 3: در
                صورت عدم تحويل چك هاي پرداخت اقساط (بابت اصل و متفرعات) در مواعد مقرر شده يا در صورت
                عدم ثبت چك هاي پرداخت اقساط (بابت اصل و سود) در سامانه چك صيادي، عامل مخير به فسخ
                قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد. تبصره 4:
                متقاضي متعهد است شرح چك هاي پرداخت اقساط بابت اصل و سود در سامانة چك صيادي را با درج
                عبارت «تأديه ديون» ثبت و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ
                قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Page4.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page4;
