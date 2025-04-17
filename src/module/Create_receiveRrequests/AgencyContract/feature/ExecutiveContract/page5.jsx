import React from 'react';
import { PropTypes } from 'prop-types';

const Page13 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] space-y-6">
        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 18:</span>
          مواعد ارائه گزارش‌های دوره‌ای و صورت‌های مالی طرح موضوع قرارداد، پس از موفقیت کمپین توسط
          عامل طی نامه کتبی به متقاضی اعلام می‌گردد و متقاضی متعهد به ارائه آنها است. در صورت عدم
          ارائه موارد مطروحه در بندهای 20، 21 و22 این ماده در مواعد مقرر، متقاضی ملزم به پرداخت وجه
          التزام روزانه به مبلغ 20,000,000 (بیست میلیون ریال) به ازای هر روز تأخیر خواهد بود.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 19:</span>
          در صورت ارائه گزارش‌ها و صورت‌های مالی صوری و خلاف واقع توسط متقاضی، متقاضی ملزم به پرداخت
          وجه التزام به مبلغ 500,000,000 ریال معادل (پانصد میلیون ریال) خواهد بود و متعهد است سریعاً
          ظرف مدت حداکثر 5 روز کاری نسبت به اصلاح گزارش/صورت مالی اقدام نماید. در صورت عدم ارائه
          گزارش/صورت مالی اصلاح شده در موعد مقرر که به تأیید عامل نیز رسیده باشد، عامل می‌تواند
          رأساً نسبت به فسخ قرارداد اقدام نماید و حق شکایت کیفری و حقوقی در خصوص ارائه گزارش و صورت
          مالی صوری و خلاف واقع برای عامل محفوظ است.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          23) متقاضی متعهد است بصورت سه ماه یک بار همزمان با مواعد پرداخت اقساط مندرج در بند 1 این
          ماده، نسبت به ارائه حساب معین چهار ستونی شرکت اصلی اقدام نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 20:</span>
          در صورت عدم ارائه حساب معین چهار ستونی شرکت اصلی در مواعد مقرر توسط متقاضی، عامل مخیر به
          فسخ قرارداد است و در صورت فسخ، متقاضی متعهد است روال اتمام قرارداد را طی نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 21:</span>
          عملکرد متقاضی توسط عامل بصورت مستمر بر اساس حساب معین چهار ستونی شرکت اصلی، پایش و نظارت
          می‌گردد، در صورت مشاهده هرگونه انحراف از سودآوری پیش‌بینی شده و شناسایی زیان، عامل مخیر به
          فسخ قرارداد است و در صورت فسخ، اصل مبلغ قرارداد و متفرعات به میزان دوره نگهداری از متقاضی
          اخذ می‌گردد و متقاضی متعهد است روال اتمام قرارداد را طی کند.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 22:</span>
          عامل هیچگونه تعهدی نسبت به زیان شناسایی نشده در حساب معین چهار ستونی و اظهار آن در
          گزارش‌های دوره‌ای آتی متقاضی ندارد و متقاضی حق هرگونه ادعایی را در این خصوص از خود سلب و
          اسقاط نموده است.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          24) متقاضی که اقدام به امضای این قرارداد نموده‌است، متضامناً مسئول پرداخت کلیه مبالغ بند 1
          موضوع ماده 5 این قرارداد به عامل می باشد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          25) متقاضی تعهد می‌نماید حسابرسی سود قطعی گواهی‌های شراکت توسط حسابرس متقاضی انجام پذیرد.
          عامل به عنوان ناظر قرارداد، در صورت وجود هرگونه اختلاف در خصوص گزارش ارائه شده، مخیر است
          نسبت به تعیین حسابرس جدید از لیست حسابرسان معتمد سازمان بورس و اوراق بهادار اقدام نماید و
          متقاضی متعهد است تمامی همکاری‌های لازم را با حسابرس جدید جهت محاسبۀ سود قطعی گواهی‌های
          شراکت و حسابرسی ویژه به‌عمل آورد.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          26) متقاضی حق هرگونه نقل و انتقال نسبت به تأمین مالی انجام شده را به هر شکل (اعم از اعطای
          وکالت و یا غیر آن) به غیر را جزئاً و کلاً از خود سلب و اسقاط نمود، در غیر اینصورت عامل
          می‌تواند تأمین مالی انجام شده را تبدیل به دین حال نموده و بدون اخطار قبلی اقدام به وصول
          کلیه مطالبات خود از متقاضی متفق یا منفرد اعم از اصل و سود و وجوه التزام و خسارات متعلقه و
          سایر هزینه‌های مربوطه بنماید.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          27) متقاضی متعهد است برگزاری هرگونه مجمع را به اطلاع عامل رسانده و یک نسخه از صورتجلسه را
          برای عامل ارسال نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          28) کافه خیارات ولو خیار غبن هر چند فاحش یا افحش از متقاضی سلب و اسقاط شد.
        </p>
        <p className="text-justify leading-relaxed text-[23px] font-bold">ماده 6) تضامین</p>
        <p className="text-justify leading-relaxed text-[23px]">
          1) متقاضی یک فقره ضمانت‌نامه تعهد پرداخت با قابلیت تمدید را مطابق جدول زیر ارائه نموده
          است.
        </p>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-black text-[20px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center">تعداد/نوع</th>
                <th className="border border-black p-2 text-center">شرح</th>
                <th className="border border-black p-2 text-center">صادرکننده</th>
                <th className="border border-black p-2 text-center">نوع ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">تاریخ اعتبار ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">شماره سپام</th>
                <th className="border border-black p-2 text-center">مبلغ ضمانت‌نامه (ریال)</th>
              </tr>
            </thead>
            <tbody>
              {data?.warranty
                ?.filter((item) => item.type === 'warranty')
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">1 فقره ضمانت‌نامه</td>
                    <td className="border border-black p-2 text-center">
                      {item.description || '-'}
                    </td>
                    <td className="border border-black p-2 text-center">{item.exporter || '-'}</td>
                    <td className="border border-black p-2 text-center">ضمانت‌نامه تعهد پرداخت</td>
                    <td className="border border-black p-2 text-center">
                      {new Date(item.date).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="border border-black p-2 text-center">{item.sepam_id || '-'}</td>
                    <td className="border border-black p-2 text-center">
                      {item.value?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <p className="text-justify leading-relaxed text-[23px]">2) چک های ضامنین</p>
        <div className="w-full overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-black text-[20px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center">تعداد/نوع</th>
                <th className="border border-black p-2 text-center">شرح</th>
                <th className="border border-black p-2 text-center">صادرکننده</th>
                <th className="border border-black p-2 text-center">شناسه صیادی</th>
                <th className="border border-black p-2 text-center">ارزش ( ریال)</th>
              </tr>
            </thead>
            <tbody>
              {data?.warranty
                ?.filter((item) => item.type === 'check')
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">1 فقره چک</td>
                    <td className="border border-black p-2 text-center">جهت تضمین اصل</td>
                    <td className="border border-black p-2 text-center">{item.exporter || '-'}</td>
                    <td className="border border-black p-2 text-center">
                      {item.fishing_id || '-'}
                    </td>
                    <td className="border border-black p-2 text-center">
                      {item.value?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))}
              <tr className="font-bold">
                <td className="border border-black p-2 text-center">جمع</td>
                <td className="border border-black p-2 text-center" colSpan="3" />
                <td className="border border-black p-2 text-center">
                  {data?.warranty
                    ?.filter((item) => item.type === 'check')
                    .reduce((sum, item) => sum + (item.value || 0), 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-justify leading-relaxed text-[23px]">
          تبصره 23: متقاضی تأیید و اقرار می‌نماید، با درخواست کتبی عامل، همکاری لازم را با بانک
          صادرکننده ضمانت‌نامه جهت تمدید ضمانت‌نامه تعهد پرداخت صادر شده به‌عمل آورد، در غیر اینصورت
          عامل مخیر به فسخ قرارداد می‌باشد و متقاضی موظف است روال اتمام قرارداد را طی کند.
        </p>
      </div>
    </div>
  );
};

Page13.propTypes = { data: PropTypes.object.isRequired };

export default Page13;
