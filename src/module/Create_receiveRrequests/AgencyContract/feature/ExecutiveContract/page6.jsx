import React from 'react';
import { PropTypes } from 'prop-types';

const Page13 = ({ data }) => {
  if (!data) return null;
  const formatNumber = (num) => {
    if (!num) return '0';
    return (num / 1000000).toLocaleString('en-US');
  };

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] space-y-6">
        <p className="text-justify leading-relaxed text-[23px]">
          22) متقاضی متعهد است نسبت به ارائه صورت‌های مالی حسابرسی شده سالیانه طرح موضوع قرارداد و
          پس از پایان طرح، از تاریخ موفقیت کمپین با مهلت ارائه صورت‌های مالی حسابرسی شده حداکثر 60
          روز پس از تاریخ‌های اعلام شده توسط عامل اقدام نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 18:</span>
          مواعد ارائه گزارش‌های دوره‌ای و صورت‌های مالی طرح موضوع قرارداد، پس از موفقیت کمپین توسط
          عامل طی نامه کتبی به متقاضی اعلام می‌گردد و متقاضی متعهد به ارائه آنها است. در صورت عدم
          ارائه موارد مطروحه در بندهای 20، 21 و22 این ماده در مواعد مقرر، متقاضی ملزم به پرداخت وجه
          التزام روزانه به مبلغ {formatNumber(20000000)} (بیست میلیون ریال) به ازای هر روز تأخیر خواهد بود.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          <span className="font-bold text-[23px]">تبصره 19:</span>
          در صورت ارائه گزارش‌ها و صورت‌های مالی صوری و خلاف واقع توسط متقاضی، متقاضی ملزم به پرداخت
          وجه التزام به مبلغ {formatNumber(500000000)} ریال معادل (پانصد میلیون ریال) خواهد بود و متعهد است سریعاً
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
          25) متقاضی که اقدام به امضای این قرارداد نموده‌است، متضامناً مسئول پرداخت کلیه مبالغ بند 1
          موضوع ماده 5 این قرارداد به عامل می باشد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          26) متقاضی تعهد می‌نماید حسابرسی سود قطعی گواهی‌های شراکت توسط حسابرس متقاضی انجام پذیرد.
          عامل به عنوان ناظر قرارداد، در صورت وجود هرگونه اختلاف در خصوص گزارش ارائه شده، مخیر است
          نسبت به تعیین حسابرس جدید از لیست حسابرسان معتمد سازمان بورس و اوراق بهادار اقدام نماید و
          متقاضی متعهد است تمامی همکاری‌های لازم را با حسابرس جدید جهت محاسبۀ سود قطعی گواهی‌های
          شراکت و حسابرسی ویژه به‌عمل آورد.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          27) متقاضی حق هرگونه نقل و انتقال نسبت به تأمین مالی انجام شده را به هر شکل (اعم از اعطای
          وکالت و یا غیر آن) به غیر را جزئاً و کلاً از خود سلب و اسقاط نمود، در غیر اینصورت عامل
          می‌تواند تأمین مالی انجام شده را تبدیل به دین حال نموده و بدون اخطار قبلی اقدام به وصول
          کلیه مطالبات خود از متقاضی متفق یا منفرد اعم از اصل و سود و وجوه التزام و خسارات متعلقه و
          سایر هزینه‌های مربوطه بنماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          28) متقاضی متعهد است برگزاری هرگونه مجمع را به اطلاع عامل رسانده و یک نسخه از صورتجلسه را
          برای عامل ارسال نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          29) متقاضی متعهد است برگزاری هرگونه مجمع را به اطلاع عامل رسانده و یک نسخه از صورتجلسه را
          برای عامل ارسال نماید.
        </p>

        <p className="text-justify leading-relaxed text-[23px]">
          30) کافه خیارات ولو خیار غبن هر چند فاحش یا افحش از متقاضی سلب و اسقاط شد.
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
                <th className="border border-black p-2 text-center">نوع ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">مبلغ ضمانت‌نامه (ریال)</th>
                <th className="border border-black p-2 text-center">تاریخ اعتبار ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">صادرکننده ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">شماره سپام</th>
                <th className="border border-black p-2 text-center">شماره ضمانت‌نامه</th>
                <th className="border border-black p-2 text-center">موضوع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 text-center">
                  {data?.investor_request?.type}
                </td>
                <td className="border border-black p-2 text-center">
                  {formatNumber(data?.investor_request?.amount_of_investment)}
                </td>
                <td className="border border-black p-2 text-center">
                  {data?.investor_request?.date}
                </td>
                <td className="border border-black p-2 text-center">بانک سپه</td>
                <td className="border border-black p-2 text-center">
                  {data?.investor_request?.sepam_id}
                </td>
                <td className="border border-black p-2 text-center">
                  {data?.investor_request?.number}
                </td>
                <td className="border border-black p-2 text-center">
                  {data?.investor_request?.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-full overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-black text-[20px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center">تعداد/نوع</th>
                <th className="border border-black p-2 text-center">شرح</th>
                <th className="border border-black p-2 text-center">موضوع</th>
                <th className="border border-black p-2 text-center">شناسه صیادی</th>
                <th className="border border-black p-2 text-center">ارزش (میلیون ریال)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 text-center">1 فقره چک</td>
                <td className="border border-black p-2 text-center">جهت تضمین اصل</td>
                <td className="border border-black p-2 text-center">تضمین اصل مبلغ تامین مالی</td>
                <td className="border border-black p-2 text-center">7181970240935493</td>
                <td className="border border-black p-2 text-center">{formatNumber(250000000000)}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-center">1 فقره چک</td>
                <td className="border border-black p-2 text-center">جهت تضمین فرع</td>
                <td className="border border-black p-2 text-center">تضمین یک فرع از فرعیات</td>
                <td className="border border-black p-2 text-center">8207970240935494</td>
                <td className="border border-black p-2 text-center">{formatNumber(25727000000)}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-center">1 فقره چک</td>
                <td className="border border-black p-2 text-center">جهت تضمین اصل</td>
                <td className="border border-black p-2 text-center">تضمین اصل مبلغ تامین مالی</td>
                <td className="border border-black p-2 text-center">3253000111022294</td>
                <td className="border border-black p-2 text-center">{formatNumber(250000000000)}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-center">1 فقره چک</td>
                <td className="border border-black p-2 text-center">جهت تضمین فرع</td>
                <td className="border border-black p-2 text-center">تضمین یک فرع از فرعیات</td>
                <td className="border border-black p-2 text-center">4514000111022293</td>
                <td className="border border-black p-2 text-center">{formatNumber(25727000000)}</td>
              </tr>
              <tr className="font-bold">
                <td className="border border-black p-2 text-center">جمع</td>
                <td className="border border-black p-2 text-center" colSpan="3">
                  555
                </td>
                <td className="border border-black p-2 text-center">{formatNumber(551454000000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Page13.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Page13;
