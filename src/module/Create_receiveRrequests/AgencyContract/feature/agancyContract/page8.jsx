import React from 'react';
import { PropTypes } from 'prop-types';

const Page7 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
      <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">41)</span>
          در صورتی که عامل خواهان تمدید مدت ضمانت نامه باشد بایستی درخواست خود را قبل از سررسید به
          متقاضی ارائه نماید. در صورت گذشت مدت ۲ روز کاری از تاریخ درخواست عامل و عدم اقدام متقاضی
          در خصوص تمدید و یا عدم تمدید ضمانت نامه به هر دلیل از جمله عدم همکاری بانک صادر کننده
          ضمانت نامه، عامل مستحق و وکیل در ضبط و وصول تمامی مبلغ ضمانت نامه به نفع خود خواهد بود.
          متقاضی با امضای ذیل قرارداد اجرایی، حق هرگونه اعتراض و ادعا و دعوی حقوقی و کیفری اعم از
          خیانت در امانت، مطالبه خسارت و غیره در این خصوص را از خود سلب و ساقط نمود. بند الف: سررسید
          ضمانت‌نامه تعهد پرداخت صادر شده بابت ضمانت اصل مبلغ تأمین مالی، باید حداقل سه روز کاری پس
          از موعد پرداخت اصل مبلغ تأمین مالیِ مندرج در جدول بند 1 مادۀ 5 قرارداد اقدامات اجرایی و
          ماده 11 قرارداد تامین مالی جمعی (مشارکت) باشد، در صورتیکه موعد سررسید ضمانت‌نامه صادر شده
          پیش از موعد مقرر در جدول بند 1 مادۀ 5 قرارداد اقدامات اجرایی و ماده 11 قرارداد تامین مالی
          جمعی (مشارکت) باشد، عامل رأسا به وکالت یا با اعلام و تقاضا به متقاضی نسبت به تمدید
          ضمانت‌نامه اقدام می‌نماید و در صورتیکه شرایط تمدید توسط متقاضی فراهم نشود یا بانک نتواند
          ضمانت‌نامه را تمدید کند یا به هر دلیل دیگری ضمانت نامه تمدید نگردد، عامل در همان تاریخ
          مندرج در ضمانت نامه، کل وجه را از بانک مطالبه نموده و دریافت می‌نماید و متقاضی حق هرگونه
          ادعا یا اعتراض و دعوای حقوقی و کیفری اعم از خیانت در امانت، مطالبه خسارت و غیره را از خود
          سلب و ساقط نمود.
        </p>

        <h3 className="font-bold mb-2 text-[23px] text-right">ماده 8) تعهدات و تأییدات عامل</h3>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">1)</span>
          عامل متعهد است گواهي هاي شراكت موضوع اين قرارداد را بر اساس شرايط تعيين شده توسط فرابورس
          همچنین منطبق با مفاد قرارداد، براي فروش به عموم به عموم عرضه نمايد.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 1:</span>
          فروش گواهي هاي شراكت منوط به تأييد طرح توسط شركت فرابورس ايران است. در صورت عدم تأييد طرح،
          عامل تعهدي نسبت به فروش گواهي هاي شراكت نخواهد داشت و كارمزد بند 4-3 مادة ٤ اين قرارداد به
          متقاضي عودت داده مي شود و قرارداد خاتمه مي يابد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">2)</span>
          تعهد عامل در خصوص این قرارداد، به نحو تعهد به وسیله است و هيچگونه مسئوليت و تعهدي در خصوص
          موفقيت كمپين ندارد.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 2:</span>
          در صورت عدم موفقيت كمپين، مبلغ آورده متقاضي كه نزد عامل مي باشد (موضوع سطر ٢ جدول ماده ٥)
          به همراه كارمزد بند 4-3 ماده ٤ اين قرارداد، عودت داده مي شود و قرارداد خاتمه مي يابد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">3)</span>
          عامل پس از موفقيت كمپين، كليه وجوه حاصل از فروش گواهي هاي شراكت را به حسابي كه متقاضي طي
          نامه اي به عامل اعلام مي دارد، واريز مي نمايد و واريز وجه از سوي عامل، به منزله رسيد
          واريزي به حساب متقاضي مي باشد و متقاضی هیچ گونه ادعایی نسبت به عدم تادیه ندارد.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 3:</span>
          پرداخت وجوه جمع آوري شده حاصل از موفقيت كمپين به متقاضـي، ناظر به اجراي همه تعهدات مندرج
          در مفاد اين قرارداد توسط متقاضي مي باشد.
        </p>

        <h3 className="font-bold mb-2 text-[23px] text-right">ماده 9) فسخ و انحلال</h3>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">الف)</span>
          در صورت عدم ايفاي تعهدات توسط متقاضي در مواعد مقرر شده در هر يك از بازه هاي زماني زير،
          عامل مخير به فسخ قرارداد مي باشد و متقاضي متعهد به:
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          ١-١- از تاريخ شروع قرارداد تا 10 روز كاري پس از تاريخ قرارداد: پرداخت كارمزدي نمي باشد.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          ٢-١- از زمان اقدام عامل براي تهيه گزارش تا پيش از جمع آوري وجوه: پرداخت كارمزد بند 4-١
          مادة ٤ اين قرارداد مي باشد.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          ٣-١- از زمان شروع جمع آوري وجوه تا پس از موفقيت كمپين و جمع آوري وجوه: پرداخت كارمزد مادة
          ٤ اين قرارداد و وجه التزامي به ميزان 2/5 درصد از مبلغ كل گواهي هاي شراكت مي باشد. لذا
          باقيماندة آوردة متقاضي پس از كسر كارمزد و وجهت التزام مشخص شده در اين بند، عودت داده مي
          شود.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 1:</span>
          در صورت فسخ قرارداد بر اساس بند ١-١ و ٢-١ اين ماده، عامل هيچگونه تعهدي نسبت به جمع آوري
          وجوه نخواهد داشت و صرفاً باقي ماندة آوردة متقاضي پس از كسر كارمزد مشخص شده در اين بندها،
          عودت داده مي شود.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 2:</span>
          در مواردي كه در مفاد اين قرارداد براي فسخ آن، ضمانت اجراي مشخصي در نظر گرفته شده است،
          متقاضي ملزم به اجراي آن خواهد بود.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">ب)</span>
          در صورت تحقق فورس ماژور به شرح مادة ١٠ اين قرارداد، عامل، حق فسخ قرارداد را خواهد داشت.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 3:</span>
          در صورت فسخ قرارداد بر اثر تحقق فورس ماژور، بنا به نظر عامل و متناسب با پيشرفت انجام خدمات
          توسط عامل، كارمزد انجام خدمات تعيين و از متقاضي دريافت مي گردد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">ج)</span>
          متقاضي تا دو روز كاري پيش از اخذ مجوز از شركت فرابورس ايران جهت فروش گواهي هاي شراكت، به
          شرط پرداخت بند 4-١ ماده 4 اين قرارداد با ارسال درخواست كتبي، مجاز به فسخ قرارداد خواهد
          بود.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 4:</span>
          متقاضي از زمان اخذ مجوز انتشار و فروش گواهي شراكت از شركت فرابورس ايران توسط عامل تا يك
          روز كاري پيش از شروع فراخوان جمع آوري وجوه، به شرط پرداخت كارمزد ماده 4 اين قرارداد حق فسخ
          قرارداد را خواهد داشت.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره 5:</span>
          متقاضي از يك روز كاري پيش از شروع فراخوان جمع آوري وجوه تا پايان دوره فراخوان حق انصراف را
          از خود سلب نموده است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">د) خاتمه:</span>
          اين قرارداد در شرايط زير خاتمه يافته تلقي ميشود:
        </p>
        <p className="mb-3 pr-8 text-[23px]">١-٤- عدم پذيرش طرح از سوي شركت فرابورس ايران؛</p>
        <p className="mb-3 pr-8 text-[23px]">
          ٢-٤- عدم موفقيت كمپين و عدم موافقت متقاضي، عامل يا فرابورس براي تمديد دوره كمپين؛
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          ٣-٤- تصميم عامل مبني بر تعليق كمپين به نحوي كه به تشخيص عامل در زمان جمع آوري وجوه امكان
          رفع آن فراهم نباشد؛
        </p>

     
      </div>
    </div>
  );
};

Page7.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page7;
