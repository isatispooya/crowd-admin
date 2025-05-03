/* eslint-disable react/prop-types */

const Page9 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px] space-y-6">
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
        <p className="text-justify leading-relaxed text-[23px]">
          تبصره 23: متقاضی تأیید و اقرار می‌نماید، با درخواست کتبی عامل، همکاری لازم را با بانک
          صادرکننده ضمانت‌نامه جهت تمدید ضمانت‌نامه تعهد پرداخت صادر شده به‌عمل آورد، در غیر اینصورت
          عامل مخیر به فسخ قرارداد می‌باشد و متقاضی موظف است روال اتمام قرارداد را طی کند.
        </p>
        <p>
          تبصره 24: متقاضی تأیید و اقرار می‌نماید، به موجب این ضمانت‌نامه، عامل مخیر است به هر عنوان
          و هر جهتی که عامل تشخیص دهد و مطالبه نماید، به محض ارسال تقاضای کتبی، بدون نیاز به صدور
          اظهارنامه یا اقدامی از مجاری قانونی، قضایی و یا مقام دیگری، و یا بدون نیاز به اثبات سقم،
          قصور یا تقصیر، بانک صادرکننده ضمانت‌نامه مکلف است مبلغ مطالبه شده را در وجه عامل حداکثر طی
          یک روز کاری بپردازد. در صورت عدم پرداخت مبلغ مطالبه شده طی یک روز کاری توسط بانک صادرکننده
          ضمانت‌نامه، وجه التزامی به میزان دو دهم مبلغ پرداخت نشده به ازای هر روز دیرکرد تا زمان
          پرداخت مبلغ مطالبه شده، از متقاضی مطالبه می‌شود و متقاضی و حق هرگونه اعتراضی را از خود سلب
          و اسقاط نموده است.
        </p>
        <p>
          تبصره 25: کلیه هزینه‌های ضمانت نامه تعهد پرداخت بر عهده متقاضی است و همچنین کلیه روند
          توثیق سهام و نیز هزینه های مرتبط با آن بر عهده متقاضی می باشد.
        </p>

        <p>
          تبصره 26: متقاضی مکلف است نسبت به توثیق اوراق بهادار پذیرفته شده در بازار بورس و فرابورس
          ایران، نسبت به توثیق آن در کارگزاری خود و ارائه مستندات مربوطه، این اوراق را تا پایان
          تعهدات ناشی از این قرارداد نزد عامل بلوکه نماید و تا پایان این تعهدات متقاضی هیچ حق دخل
          وتصرفی در معامله این اوراق نداشته و در صورت عدن ایفای تعهدات عامل می تواند به صورت عرضی
          این اوراق را در وجه تعهدات این قراداد وصول نماید.
        </p>

        <p>
          تبصره 27:به منظور تضمین بازپرداخت اصل مبالغ پرداختی و نیز مابه التفاوت حاصله ناشی از خرید
          تضمینی کالاها و محصولات موضوع طرح این قرارداد به تامین کنندگان، متقاضی متعهد است چک های
          صیادی تضمینی به تاریخ ابتدای دوره اجرای طرح به مبلغ 150درصد مجموع منابع مالی مورد درخواست
          را به عامل بسپارد تا در صورت نقض هرکدام از تعهدات مندرج در این قرارداد، عامل از طریق تضمین
          موضوع این بند، نسبت به مطالبه خسارات وارده اقدام کند. متقاضی به صورت غیرقابل برگشت، کلیه
          حقوق و اختیارات لازم جهت اجرای مفاد این بند را بدون نیاز به مراجعه به مراجع قضایی یا داوری
          به عامل صلح نموده است و حق هرگونه ادعایی دراین خصوص اعم از دعاوی خیانت درامانت یا استرداد
          وجه را علیه عامل از خود سلب و ساقط کرده است. درخصوص این تضامین، عامل از این حق برخوردار
          است که علاوه بر موارد مصرح در قرارداد که وصول تضامین به عنوان ضمانت اجرای تعهد خاصی بیان
          شده، به طورکلی در سایر مواردی نیز که به موجب رأی مراجع قضایی و داوری یا شبه قضایی و اداری،
          متقاضی متعهد به جبران خسارت است، به عنوان وصول تمام یا بخشی از خسارات مورد حکم، از چک های
          موصوف نیز استفاده نماید.
        </p>

        <p>
          تبصره 28: سررسید ضمانت‌نامه تعهد پرداخت صادر شده بابت ضمانت اصل مبلغ تأمین مالی، باید
          حداقل سه روز کاری پس از موعد پرداخت اصل مبلغ تأمین مالیِ مندرج در جدول بند 1 مادۀ 5 این
          قرارداد باشد، در صورتیکه موعد سررسید ضمانت‌نامه صادر شده پیش از موعد مقرر در جدول بند 1
          مادۀ 5 این قرارداد باشد، عامل رأسا نسبت به تمدید ضمانت‌نامه اقدام می‌نماید و در صورتیکه
          شرایط تمدید توسط متقاضی فراهم نشود یا بانک نتواند ضمانت‌نامه را تمدید کند، عامل در همان
          تاریخ کل وجه را از بانک مطالبه نموده و دریافت می‌نماید. متقاضی حق هرگونه اعتراضی را از خود
          سلب و اسقاط نمود.
        </p>

        <p>
          تبصره 29: ضمانت‌نامه تعهد پرداخت صادر شده توسط بانک بابت ضمانت اصل، باید قابلیت دریافت وجه
          ضمانت‌نامه به محض تقاضا را توسط عامل (ذینفع) داشته باشد و به‌صورت عندالمطالبه باشد.
        </p>

        <p>
          تبصره 30: متقاضی و ضامن تأیید و اقرار می‌نماید، در صورت عدم واریز وجه ضمانت‌نامه مطالبه
          شده در حواله‌کرد عامل توسط بانک صادرکننده ضمانت‌نامه تعهد پرداخت، سایر ضمانت های وی
          متضامناً به صورت عرضی و منفرداً در برابر عامل مسئول بوده و عامل می‌تواند عندالاقتضاء به
          تشخیص خود از متقاضی جهت وصول کلیه مطالبات خود و خسارات وارده مراجعه نماید.
        </p>

        <p>
          تبصره 31: در این قرارداد عامل به وکالت از دارندگان گواهی‌های شراکت می‌باشد. متقاضی،¬ تأیید
          و اقرار می‌نماید که در صورت هرگونه تخلف در اجرای طرح و تأخیر در پرداخت اقساط بند 1 ماده 5
          و عدم پایبندی به مفاد این قرارداد، به منزله عدم ایفای تعهدات توسط متقاضی است، و عامل به
          وکالت از دارندگان گواهی‌های شراکت رأسا می‌تواند نسبت به وصول مطالبات به هرمبلغی و با
          هرعنوان و جهتی که تشخیص دهد از محل ضمانت‌نامه تعهد پرداخت و یا سایر تضامین اقدام نماید.
          اقدام عامل در این خصوص برای متقاضی غیرقابل اعتراض و لازم الاجرا می‌باشد.
        </p>


      </div>
    </div>
  );
};

export default Page9;
