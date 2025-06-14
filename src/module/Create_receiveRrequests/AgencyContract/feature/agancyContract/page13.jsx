import React from 'react';
import { PropTypes } from 'prop-types';

const Page13 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
        <p className="mb-3 pr-8 text-[23px]">
          5) متقاضی تا تاریخ اتمام طرح و انجام تسویه حساب های مربوط به این قرارداد، حق فروش و انتقال
          گواهی سرمایه گذاری که در ازای آورده شخصی به نام وی صادر شده است را تحت هر عنوان از قبیل
          فروش یا صلح و امثالهم را نخواهدداشت.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          6) متقاضی متعهد است ظرف مدت حداکثر 5 روز از تاریخ امضای قرارداد، نسبت به معرفی نماینده یا
          نمایندگانی به عامل جهت انجام امور مربوط به قرارداد، اقدام نماید.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          7) متقاضی متعهد است در صورت لزوم و به تشخیص شرکت، اقدامات لازم را جهت بازدید کارشناس یا
          کارشناسان معرفی شده توسط عامل از محل فعالیت خود به عمل آورد.
        </p>

        <h3 className="font-bold mb-2 text-[23px] text-right">
          ماده 24) راه ارتباطی طرفین قرارداد
        </h3>
        <p className="mb-3 pr-8 text-[23px]">
          تمامی مواردی که بعد از عقد قرارداد نیاز مند پیگیری و تعامل و ارتباط فی مابین طرفین قرارداد
          می باشد .اعم از معرفی ناظر ،ارسال مدارک ،وامثالهم از طریق راه های ارتباطی زیر می باشد.
        </p>
        <p className="mb-3 pr-8 text-[23px]">1) شماره تلفن ثابت 03591090088</p>
        <p className="mb-3 pr-8 text-[23px]">2) ایمیل به نشانی info@isatiscrowd.ir</p>
        <p className="mb-3 pr-8 text-[23px]">3) اظهارنامه رسمی</p>

        <h3 className="font-bold mb-2 text-[23px] text-right">ماده 25) اعتبار قرارداد</h3>
        <p className="mb-3 pr-8 text-[23px]">
          این قرارداد در 25 ماده و 39 تبصره، در دو نسخه واحد و بدون پیوست، تنظیم گردید که پس از
          امضاء کلیه نسخ آن در حکم واحد بوده و لازم الاجرا می باشند.
        </p>
      </div>
    </div>
  );
};

Page13.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page13;
