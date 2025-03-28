import React from 'react';
import { PropTypes } from 'prop-types';

const Page7 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
        <h3 className="text-[23px] font-bold">
          {' '}
          ج) چک های پرداخت اقساط خرید دارایی و بازپرداخت سرمایه
        </h3>
        <p>
          متقاضی متعهد گردید بابت پرداخت اقساط خرید دارایی و نیز بازپرداخت سرمایه، جمعاً نسبت به
          صدور و تسلیم 5 فقره چک به شرح جدول ذیل اقدام و منضم به رسید ثبت در سامانه صیاد، به عامل
          تحویل نماید:
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-center">ردیف</th>
                <th className="border border-gray-400 p-2 text-center">تاریخ چک</th>
                <th className="border border-gray-400 p-2 text-center">شماره چک</th>
                <th className="border border-gray-400 p-2 text-center">نام بانک</th>
                <th className="border border-gray-400 p-2 text-center">کد شعبه</th>
                <th className="border border-gray-400 p-2 text-center">مبلغ (ریال)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 text-center">1</td>
                <td className="border border-gray-400 p-2 text-center">متعاقباً اعلام میگردد</td>
                <td className="border border-gray-400 p-2 text-center">688803022199823</td>
                <td className="border border-gray-400 p-2 text-center">ملی ایران</td>
                <td className="border border-gray-400 p-2 text-center">3501</td>
                <td className="border border-gray-400 p-2 text-center">20,360,655,738</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-center">2</td>
                <td className="border border-gray-400 p-2 text-center">متعاقباً اعلام میگردد</td>
                <td className="border border-gray-400 p-2 text-center">8911030221991822</td>
                <td className="border border-gray-400 p-2 text-center">ملی ایران</td>
                <td className="border border-gray-400 p-2 text-center">3501</td>
                <td className="border border-gray-400 p-2 text-center">20,581,967,213</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-center">3</td>
                <td className="border border-gray-400 p-2 text-center">متعاقباً اعلام میگردد</td>
                <td className="border border-gray-400 p-2 text-center">688803022199823</td>
                <td className="border border-gray-400 p-2 text-center">ملی ایران</td>
                <td className="border border-gray-400 p-2 text-center">3501</td>
                <td className="border border-gray-400 p-2 text-center">20,139,344,262</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-center">4</td>
                <td className="border border-gray-400 p-2 text-center">متعاقباً اعلام میگردد</td>
                <td className="border border-gray-400 p-2 text-center">7081030221991820</td>
                <td className="border border-gray-400 p-2 text-center">ملی ایران</td>
                <td className="border border-gray-400 p-2 text-center">3501</td>
                <td className="border border-gray-400 p-2 text-center">19,918,032,787</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 text-center">5</td>
                <td className="border border-gray-400 p-2 text-center">متعاقباً اعلام میگردد</td>
                <td className="border border-gray-400 p-2 text-center">8288030221991819</td>
                <td className="border border-gray-400 p-2 text-center">ملی ایران</td>
                <td className="border border-gray-400 p-2 text-center">3501</td>
                <td className="border border-gray-400 p-2 text-center">200,000,000,000</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4">
            تبصره: چک های موضوع این بند، صرفاً وسیله پرداخت بوده و به منزله تبدیل تعهد تلقی نمیگردد.
          </p>
          <h3 className="text-[23px] font-bold">
            {' '}
            8) چک های پرداخت اقساط خرید دارایی و بازپرداخت سرمایه
          </h3>{' '}
          <p className="text-[23px]">
            1) شرکت به عنوان ارائه دهنده خدمات تأمین مالی جمعی و مدیر پلتفرم، متعهد به نظارت بر حسن
            اجرای قرارداد و رعایت شرایط و ضوابط مصرف سرمایه توسط متقاضی میباشد.
          </p>
          <p className="text-[23px]">
            2) متقاضی متعهد است حسب مورد نسبت به واریز اقساط خرید دارایی در مواعد پرداخت و نیز اصل
            سرمایه در تاریخ اتمام طرح به شماره حساب عامل، اقدام نماید.
          </p>
          <p className="text-[23px]">
            3) شرکت متعهد است به وکالت از سرمایه‌گذار و در مواعد مقرر وفق مفاد این قرارداد، نسبت به
            اخذ اصل سرمایه و اقساط خرید دارایی از متقاضی اقدام و وجوه یادشده را به تناسب رقم مندرج
            در گواهی سرمایه گذاری هر تأمین کننده، به شماره حساب وی واریز نماید.
          </p>
          <p className="text-[23px]">
            4) متقاضی متعهد به مصرف سرمایه صرفاً جهت خرید داراییهای مورد نیاز از فروشنده مجاز، می
            باشد.
          </p>
          <p className="text-[23px]">
            5) متقاضی متعهد است وفق شرایط و ضوابط مصرف سرمایه، نسبت به خرید دارایی های مورد نیاز و
            ارائه صورتحساب به شرکت، اقدام نماید
          </p>
          <p className="text-[23px]">
            6) متقاضی ضمن عقد خارج لازم که به واسطه اقرار شفاهی طرفین منعقد شده است، حق فسخ خود را
            سلب و ساقط نموده و تحت هیچ عنوان، جز در موارد پیش بینیشده در این قرارداد، حق فسخ قرارداد
            حاضر را نخواهدداشت.
          </p>
          <p className="text-[23px]">
            7) متقاضی متعهد است در راستای رعایت مقررات مبارزه با پولشویی، مذکور در قانون مبارزه با
            پولشویی (مصوب 1386/11/02 همراه با آخرین اصالحات 15/10/1397 ) و هم چنین آییننامه اجرایی
            آن مصوب ،21/07/1398 تمامی اطالعات مورد نیاز را در اختیار عامل قرار داده و نمی تواند به
            عذری از قبیل محرمانه بودن اطالعات درخواستی، از ارائه اطالعات مورد نیاز خودداری نماید.
            بدیهی است اطالعات مذکور محصور نبوده و در هر زمان و با توجه به درخواست نهادهای نظارتی،
            تعهد متقاضی نسبت به ارائه اطالعات متفاوت میباشد. الزم به ذکر است مسئولیت هرگونه اخلال در
            انجام موضوع قرارداد که ناشی از استنکاف متقاضی از تعهد مذکور در این بند باشد، تماماً بر
            عهده متقاضی بوده و عامل در این خصوص هیچگونه مسئولیتی بر عهده نخواهد داشت
          </p>
          <p className="text-[23px]">
            8) متقاضی تا تاریخ اتمام طرح و انجام تسویه حساب های مربوط به این قرارداد، حق فروش و
            انتقال گواهی سرمایهگذاری که در ازای آورده شخصی به نام وی صادر شده است را تحت هر عنوان از
            قبیل فروش و یا صلح، نخواهدداشت.
          </p>
          <p className="text-[23px]">
            9) متقاضی متعهد است ظرف مدت حداکثر 5 روز از تاریخ امضای قرارداد، نسبت به معرفی نماینده
            یا نمایندگانی به عامل جهت انجام امور مربوط به قرارداد، اقدام نماید.
          </p>
          <p className="text-[23px]">
            10) متقاضی متعهد است در صورت لزوم و به تشخیص شرکت، اقدامات الزم را جهت بازدید کارشناس یا
            کارشناسان معرفی شده توسط عامل از محل فعالیت خود به عمل آورد.
          </p>
          <h3 className="text-[23px] font-bold"> 9) گزارش پیشرفت طرح</h3>
          <p className="text-[23px]">
            1) متقاضی موظف است گزارش دوره ای طرح خود را در بازههای زمانی ذکر شده در این ماده و گزارش
            پایانی طرح را نیز در تاریخ اتمام طرح و در قالب مورد تأیید عامل، تهیه و از طریق پلتفرم به
            اطلاع سرمایه گذاران برساند. حداقل مفاد لازم جهت ارائه در گزارش های دوره ای و پایانی در
            پیوست های قرارداد، آیین نامه های مصوب عامل و آیین نامههای مصوب شرکت فرابورس ایران مشخص
            شده است
          </p>
          <p className="text-[23px]">
            2) متقاضی موظف است در بخش کیفی هر گزارش، عامل و سرمایه گذاران را از اقدامات انجام شده و
            پیشرفت و تأ خیرات احتمالی طرح و برنامه های آتی آگاه کرده و در صورت وجود تأخیر، آنها را
            از راهکارها ی ارائه شده به جهت مقابله با آن تأخیر مطلع کند.
          </p>
          <p className="text-[23px]">
            3) گزارش دهی یک طرح در هیچ شرایطی به نسبت میزان وجوه تأمینشده نمیتواند از حداقل های زیر
            کمتر باشد: -گزارش دوره ای هر سه ماه یکبار، گزارش سالیانه یا پایانی حسابرسی شده
          </p>
          <p className="text-[23px]">
            4) تأخیر در ارائه گزارشات موضوع بندهای پیشین، در شرایط زیر مشمول خسارات تعیینشده در این
            قرارداد می باشد:
          </p>
          <p className="text-[23px]">
            1- گزارش دوره ای و پایانی در قالب مصوب عامل حداکثر مهلت ۱۰ روز
          </p>
          <p className="text-[23px]">2-گزارش حسابرسی شده حداکثر مهلت ۳۰ روز.</p>
          <p className="text-[23px]">
            5) با ارائه هر گزارش دوره ای صورت مالی با پایانی این گزارش علی ۳ روز کاری به تایید عامل
            رسیده یا حسب مورد ایرادات گزارش به متقاضی اعلام می گردد.
          </p>
          <p className="text-[23px]">
            در صورت اعلام عامل یا ناظر فنی مالی بر عدم پذیرش گزارش متقاضی گزارش اصلاح شده را ظرف مدت
            ۲ روز به عامل ارائه نموده و این روند تا زمان اخذ تأیید عامل و حسب مورد ناظر فنی امالی
            ادامه خواهد یافت.
          </p>
          <p className="text-[23px]">
            کلیه بررسی ها و اصلاحات لازم برای گزارشات میبایست در مهلت مقرر در بند پیشین به انجام
            برسد.
          </p>
          <p className="text-[23px]">
            معیار زمان تحویل گزارش روز ارائه گزارش تایید شده بوده و تاخیر بیش از میزان تعیین شده در
            بند فوق مشمول خسارات مشخص شده خواهد بود.
          </p>
          <p className="text-[23px]">
            <span className="font-bold">تبصره ۱:</span> تأخیر عامل در بررسی و اعلام نظر بیش از زمان
            مشخص شده در این بند به مهلت ارائه گزارش اضافه می شود.
          </p>
          <p className="text-[23px]">
            <span className="font-bold">تبصره ۲:</span> در مورد گزارشات نیازمند حسابرسی رسمی متقاضی
            موظف است همزمان با ارائه گزارش جهت حسابرسی یک نسخه از صورتهای مالی و مستندات ارائه شده
            به حسابرس را به عامل ارائه نماید. همچنین تأیید این گزارشات منوط به ارائه گزارش حسابرسی
            رسمی خواهد بود.
          </p>
         
        </div>
      </div>
    </div>
  );
};

Page7.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page7;
