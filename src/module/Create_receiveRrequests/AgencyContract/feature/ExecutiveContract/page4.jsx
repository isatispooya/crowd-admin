/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber, formatPercentage, formatRials } from '../../utils/formatters_func';

const Page4 = ({ data }) => {
  if (!data) return null;

  const { investor_request, checks, one_year_return_on_investment } = data;

  const totalAmount = checks?.reduce((sum, check) => sum + (check?.amount || 0), 0) || 0;

  const renderContractClauses = () => (
    <div className="contract-clauses p-4 text-[23px] leading-relaxed">
      <h2 className="text-[23px] font-bold mt-4 mb-2">ماده 5) تعهدات متقاضی</h2>

      <p className="text-[23px]">
        5-1. تسلیم چک‌های پرداخت اقساط: متقاضی چک‌های پرداخت اقساط بابت اصل و متفرعات (سود علی
        الحساب) را مطابق جدول زیر به عامل تسلیم نموده است و مکلف است نسبت به پرداخت اقساط بابت اصل و
        متفرعات (سود علی الحساب) مطابق جدول زیر، در مواعد مقرر اقدام نماید.
      </p>

      <table className="w-full border-collapse border border-gray-300 mb-4 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2  text-center">ردیف</th>
            <th className="border border-gray-300 p-2  text-center">شناسه صیادی</th>
            <th className="border border-gray-300 p-2  text-center">تاریخ</th>
            <th className="border border-gray-300 p-2  text-center">مبلغ (ریال)</th>
            <th className="border border-gray-300 p-2  text-center">بانک</th>
            <th className="border border-gray-300 p-2  text-center">شعبه</th>
            <th className="border border-gray-300 p-2  text-center">نوع</th>
          </tr>
        </thead>
        <tbody>
          {checks?.map((check, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{check?.fishing_id || 'N/A'}</td>
              <td className="border border-gray-300 p-2">
                {check?.date ? new Date(check.date).toLocaleDateString('fa-IR') : 'N/A'}
              </td>
              <td className="border border-gray-300 p-2">{formatRials(check?.amount)}</td>
              <td className="border border-gray-300 p-2">{check?.bank_name || '_'}</td>
              <td className="border border-gray-300 p-2">{check?.branch_name || '_'}</td>
              <td className="border border-gray-300 p-2">{check?.type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="border border-gray-300 p-2 font-bold">
              مجموع مبلغ چک‌ها (ریال)
            </td>
            <td colSpan="4" className="border border-gray-300 p-2 font-bold">
              {formatRials(totalAmount)}
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="text-[23px]">
        تبصره 6: در صورت عدم ایفای تعهدات جدول فوق، متقاضی علاوه بر پرداخت سود علی‌الحساب، ملزم به
        پرداخت وجه التزامی مطابق دو دهم مبلغ پرداخت نشده به ازای هر روز تأخیر به عامل خواهد بود. وجه
        التزام مبالغ پرداخت نشده از محل تضامین قابل برداشت است.
        <br />
        تبصره 7: متقاضی تأیید و اقرار نموده است، در صورت عدم ایفای تعهدات جدول فوق توسط متقاضی و
        رجوع عامل به بانک صادرکننده ضمانت‌نامه تعهد پرداخت و به ازای هر روز تأخیر در پرداخت مبلغ
        مطالبه شده توسط بانک، عامل وجه التزامی به میزان دو دهم مبلغ پرداخت نشده به ازای هر روز تأخیر
        در پرداخت از متقاضی مطالبه می‌نماید که از محل چک‌های اقساط و سایر تضامین به صورت عرضی قابل
        برداشت است و متقاضی حق هرگونه اعتراض و ادعایی در این خصوص را از خود سلب و اسقاط نمودند.
        <br />
        تبصره 8: با توجه به خرید 10 درصد از گواهی‌های شراکت توسط متقاضی به مبلغ{' '}
        {formatNumber((investor_request?.amount_of_investment || 0) * 0.1)} میلیون ریال، آن
        گواهی‌های شراکت ابطال و از مجموع کسر شده و پرداخت اقساط لازم‌الاداء به همان میزان تعدیل
        می‌شود. بنابراین مبنای پرداخت اقساط بر اساس میزان مشارکت دارندگان گواهی‌های شراکت به مبلغ{' '}
        {formatNumber((investor_request?.amount_of_investment || 0) * 0.9)} میلیون ریال محاسبه
        گردیده است.
      </p>

      <p className="text-[23px]">
        5-2. در صورت افزایش عمومی نرخ سود سپرده‌های متناظر بانکی و اوراق مشابه، عامل رأساً می‌تواند
        با اعلام کتبی به متقاضی درخواست افزایش نرخ سود گواهی‌های شراکت موضوع این قرارداد را بنماید.
        متقاضی متعهد می‌گردد ظرف 7 روز از تاریخ درخواست عامل حسب مورد نسبت به افزایش نرخ سود
        گواهی‌های شراکت به میزان افزایش عمومی نرخ سود سپرده‌های متناظر بانکی و اوراق مشابه اقدام
        نماید. در غیر این صورت متقاضی ملزم به پرداخت وجه التزامی معادل میزان افزایش نرخ سود
        سپرده‌های متناظر بانکی و اوراق مشابه به صورت دوره های پرداخت3 ماهه می‌باشد.
      </p>
      <p className="text-[23px]">
        5-3.متقاضی متعهد است حداکثر پس از دو هفته از پایان عمر گواهی‌های شراکت، نسبت به محاسبه سود
        قطعی گواهی‌های شراکت اقدام نماید. همچنین حسابرس حداکثر یک ماه پس از اعلام سود قطعی توسط
        متقاضی اظهار نظر خواهد نمود.
        <br />
        تبصره 19: عامل به عنوان ناظر قرارداد، پس از اظهار نظر حسابرس، در خصوص سود قطعی حاصل از
        گواهی‌های شراکت، حق دارد نسبت به تأیید یا تعیین حسابرس جدید (حسابرس رسمی) و حسابرسی مجدد سود
        قطعی گواهی‌های شراکت اظهار نظر خود را حداکثر طی دو هفته اعلام نماید.
      </p>

      <p className="text-[23px]">
        5-4.متقاضی تأیید و تعهد می‌کند که دعاوی مؤثر با اهمیت حقوقی یا کیفری علیه شرکت/موسسه و اعضای
        هیئت مدیره یا مدیرعامل وی وجود ندارد. در صورت کشف هرگونه دعاوی مؤثر، عامل مخیر به فسخ
        قرارداد خواهد بود و متقاضی روال اتمام قرارداد را طی خواهد کرد.
      </p>

      <p className="text-[23px]">
        5-5.متقاضی متعهد می‌گردد کلیۀ هزینه‌های لازم جهت انجام موضوع این قرارداد و اخذ مجوزهای لازم
        و سایر مقدمات لازم را به موجب این قرارداد بپردازد.
      </p>

      <p className="text-[23px]">
        5-6. متقاضی متعهد می‌شود پیش از انجام هر نوع اقدام توافق نشده در خصوص موضوع قرارداد، عامل را
        کتباً یا از طریق نامه رسمی در جریان امور قرار دهد و نسبت به دریافت تأییدیه از عامل اقدام
        نماید. در صورت عدم موافقت عامل، متقاضی حق هیچگونه اقدامی در این راستا نخواهد داشت.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        7) متقاضی متعهد می‌گردد در چارچوب قوانین مالیاتی کشور، در صورت لزوم نسبت به پرداخت هرنوع
        مالیات موضوع ماده 3 قرارداد رأساً اقدام نماید.
      </p>

      <p className="text-justify leading-relaxed text-[23px] mt-8">
        8) متقاضی تعهد می‌نماید بدون کسب مجوز کتبی از عامل، کل یا بخشی از موضوع یا تعهدات این
        قرارداد را به شخص یا اشخاص حقیقی یا حقوقی دیگر منتقل یا واگذار نکند در غیر اینصورت عامل مخیر
        به فسخ قرارداد خواهد بود.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        9) چنانچه مشخص شود طرح محدودیت یا منع قانونی، قراردادی یا قضایی برای اجرا دارد، قرارداد خود
        به خود منفسخ می‌شود و متقاضی مکلف است سود علی‌الحساب به میزان دوره نگهداری بعلاوه اصل مبلغ
        قرارداد را به طور کامل به عامل بازگرداند. در صورت عدم عودت، متقاضی ملزم به پرداخت روزانه وجه
        التزامی معادل دو هزارم مبلغ پرداخت نشده به عامل تا زمان ایفای تعهدات خود، خواهد بود.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        10) متقاضی متعهد می‌گردد تمام مسئولیت‌های مرتبط با موضوع قرارداد را تا سررسید گواهی‌های
        شراکت بر عهده گیرد.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        <span className="font-bold text-[23px]">تبصره 17:</span>
        به غیر از موارد پیش‌بینی شده در این قرارداد، چنانچه متقاضی در اثنای مدت این قرارداد به تشخیص
        عامل، از مفاد این قرارداد تخلف نماید، از تاریخ تخلف و به محض اعلام عامل می‌بایست سود
        علی‌الحساب را به ازای دوره زمانی نگهداری مبلغ قرارداد به‌علاوه اصل مبلغ تأمین مالی و
        جریمه‌ای معادل 150 درصد مبلغ کل قرارداد به عنوان وجه التزام به عامل پرداخت نماید و عامل مخیر
        به فسخ قرارداد می‌باشد.
      </p>

    </div>
  );

  return <div className="contract-page page-4">{renderContractClauses()}</div>;
};

Page4.propTypes = {
  data: PropTypes.shape({
    investor_request: PropTypes.shape({
      amount_of_investment: PropTypes.number,
    }),
    checks: PropTypes.arrayOf(
      PropTypes.shape({
        fishing_id: PropTypes.string,
        date: PropTypes.string,
        amount: PropTypes.number,
        bank_name: PropTypes.string,
        branch_name: PropTypes.string,
        type: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Page4;
