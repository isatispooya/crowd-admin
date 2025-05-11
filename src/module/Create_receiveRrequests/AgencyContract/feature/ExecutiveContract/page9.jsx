/* eslint-disable react/prop-types */

import { formatRials } from "../../utils/formatters_func";

const Page9 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] space-y-6">

        <p className="text-justify leading-relaxed text-[23px]">
          تبصره: عامل نماینده تامین کنندگان است. متقاضی و تامین کنندگان و نهاد مالی و ضامن ضمن عقد
          خارج لازم به صورت غیرقابل رجوع به عامل به عنوان نماینده اجازه و حق دادند که هرگونه مطالبات
          ناشی از این قرارداد اعم از اصل و سود محقق شده سرمایه گذاری، وصول خسارات و جریمه های
          احتمالی و هزینه های فسخ قرارداد را پس از سررسید یا انحلال این قرارداد یا تحقق شرایط مندرج
          در این قرارداد و فقط در صورت عدم پرداخت متقاضی و ضامن، از وثایق و تضامین متقاضی و ضامن نزد
          عامل و ضمانت نامه تعهد پرداخت متقاضی نزد عامل و یا از طریق اعطای وکالت یا کارگزار بدون هیچ
          قید و شرطی و بدون نیاز به حکم قضایی یا اجرایی برداشت نموده و به حساب بدهی متقاضی و ضامن
          منظور نماید. اقدام عامل دراین خصوص برای متقاضی و ضامن غیرقابلاعتراض و لازم الاجرا می باشد.
          همچنین تامین کنندگان ضمن عقد خارج لازم هرگونه اقدام درخصوص موارد موضوع این تبصره را از خود
          سلب و ساقط نمودند و کلیه اختیارات دراین خصوص را به عامل و کارگزار عامل واگذار کردند.
        </p>
        <p className="text-justify leading-relaxed text-[23px]">
          {data?.checks.map((check, index) => (
            <p key={index}>
              متقاضی در فرض عدم ارایه گزارش طبق قرارداد حاضر، ملزم به تادیه مبلغ وجه التزام به مبلغ
              {formatRials(check.amount)} ریال معادل یک میلیارد تومان است. بر این اساس، متقاضی باید
              مبلغ مزبور رابا ارایه نمودن یک فقره چک به مبلغ {formatRials(check.amount)} به شماره{' '}
              {check.fishing_id}
              به تاریخ {check?.date ? new Date(check.date).toLocaleDateString('fa-IR') : 'N/A'}{' '}
              تضمین کند. لذا در فرض عدم ایفای تعهد بیان شده، متقاضی به عامل وکالت و وکالت در توکیل
              داد تا نسبت به وصول چک مزبور اقدام کند که وصول چک، نافی حق فسخ نبوده و متقاضی نسبت به
              وصول چک مزبور از طرف عامل، هیچ گونه اعتراض یا ادعایی ندارد.
            </p>
          ))}
        </p>
        <p className="text-justify leading-relaxed text-[23px] font-bold">ماده 6) تضامین</p>
        <p className="text-justify leading-relaxed text-[23px]">
          ّ 1) متقاضی یک فقره ضمانت‌نامه تعهد پرداخت با قابلیت تمدید را مطابق جدول زیر ارائه نموده
          است.
        </p>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-black text-[20px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center">تعداد/نوع</th>
                <th className="border border-black p-2 text-center">موضوع</th>
                <th className="border border-black p-2 text-center">صادرکننده</th>
                <th className="border border-black p-2 text-center">شماره ضمانت نامه</th>

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
                    <td className="border border-black p-2 text-center">{item.number || '-'}</td>
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
                <th className="border border-black p-2 text-center">موضوع</th>
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
                    <td className="border border-black p-2 text-center">
                      {item.description || '-'}
                    </td>
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
       
      </div>
    </div>
  );
};

export default Page9;
