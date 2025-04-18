import React from 'react';
import PropTypes from 'prop-types';

const Page4 = ({ data }) => {
  if (!data) return null;

  const renderContractClauses = () => (
    <div className="contract-clauses p-4 text-[23px] leading-relaxed">

<h3 className="text-[23px] font-bold mt-4 mb-2">5. پرداخت هزینه‌ها</h3>
        <p className="text-[23px]">
          متقاضی متعهد می‌گردد کلیه هزینه‌های لازم جهت انجام موضوع این قرارداد و اخذ مجوزهای لازم و
          سایر مقدمات لازم را به موجب این قرارداد بپردازد.
        </p>
      <h3 className="text-[23px] font-bold mt-4 mb-2">6. اطلاع‌رسانی به عامل</h3>
      <p className="text-[23px]">
        متقاضی متعهد می‌شود پیش از انجام هر نوع اقدام توافق نشده در خصوص موضوع قرارداد، عامل را
        کتباً یا از طریق نامه رسمی در جریان امور قرار دهد و نسبت به دریافت تأییدیه از عامل اقدام
        نماید. در صورت عدم موافقت عامل، متقاضی حق هیچگونه اقدامی در این راستا نخواهد داشت.
      </p>

      <h3 className="text-[23px] font-bold mt-4 mb-2">7. پرداخت مالیات</h3>

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
        جریمه‌ای معادل 5/2 درصد مبلغ کل قرارداد به عنوان وجه التزام به عامل پرداخت نماید و عامل مخیر
        به فسخ قرارداد می‌باشد.
      </p>
      <p className="text-justify leading-relaxed text-[23px]">
        11) در صورتی که در خصوص اجرای موضوع ماده 3 قرارداد هرگونه مشکلاتی به وجود آید که مانع اجرای
        موضوع ماده 3 گردد، و درصورتی که جز فورس‌ماژور نباشد، متقاضی موظف است تمامی خسارت‌های ناشی از
        عدم اجرای موضوع ماده 3، اعم از اصل به‌همراه متفرعات و وجه التزامی به میزان 5/2 درصد مبلغ کل
        گواهی‌های شراکت این قرارداد را به عامل بپردازد و عامل مخیر به فسخ قرارداد می‌باشد.
      </p>
      <p className="text-justify leading-relaxed text-[23px]">
        <span className="font-bold text-[23px]">تبصره 18:</span>
        در تمام این قرارداد، جبران خسارت اعم از عدم‌النفع و تفویت منفعت است.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        12) متقاضی متعهد می‌شود که موضوع ماده 3 این قرارداد را با در نظر گرفتن کامل مفاد این قرارداد
        و در تطابق با قوانین و سیاست‌های جمهوری اسلامی ایران اجرا کند. متقاضی در هیچ صورتی نمی‌تواند
        با عذر عدم اطلاع از قوانین و مقررات مربوط به طرح خود متعذر شود، وی متعهد است اقدامات لازم را
        جهت اجرای موضوع ماده 3 قرارداد به‌عمل آورد.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        13) در صورت قصور یا تقصیر متقاضی نسبت به هر یک تعهدات خود در هر یک از مفاد این قرارداد، یا
        عدم اجرای تعهدات به هر دلیلی به جز موارد مندرج در ماده 10 (حوادث ناگهانی و فورس‌ماژور)، تهیه
        کلیه لوازم و مقدمات حقوقی و کلیه هزینه‌های مربوط به وصول مطالبات، اجرای تضامین، اعم از
        هزینه‌ها و کارمزدهای دادرسی، اداری، بانکی و حق الوكاله، هزینه‌های نمایندگان قضایی، هزینه‌های
        اجرایی و ثبتی، واخواست، اخذ مجوزهای مربوطه و کارشناسی اموال و هرنوع هزینه دیگری در جهت وصول
        مطالبات به عهده متقاضی بوده و متقاضی ملزم به پرداخت آن می‌باشند. متقاضی ضمن عقد لازم حاضر به
        عامل وکالت و اختیار دادند تا عامل، کلیه هزینه‌های مربوطه را تحت هر عنوان که باشد حسب تشخیص
        خود از محل هرگونه وجوه و دارائی وحساب نامبردگان برداشت نماید.
      </p>
      <p className="text-justify leading-relaxed text-[23px]">
        14) متقاضی متعهـد ملتـزم گردیده وجـه التـزام تـأخیر تأدیـه و سایر خسـارات و جرایم را بدون
        هرگونه اعتراض و براساس محاسبات و تشخیص عامل پرداخت نماینـد و پرداخـت وجـه التـزام و خسـارات
        و جرایم مذکور در ایـن قرارداد از سـوی متقاضی، بـدل از هیچکـدام از تعهـدات آنهـا در قبـال
        عامل نمـی‌باشـد و متقاضی این قرارداد، به موجب این قرارداد و ضمن عقد صلح بلاعوض خارج لازم حـق
        هرگونـه ایـراد، اعتـراض و ادعـایی را در این زمینه از خود سلب و ساقط می‌نماید.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        15) تخلف تؤامان متقاضی، در پرداخت هر یک از اقساط بند 1 ماده 5 این قرارداد، موجب زوال مواعد
        اقساط و حال شدن دیون می‌شود و عامل الزامی در انتظار حلول مواعد مقرر در قراردادها جهت وصول
        حقوق و مطالبات خود نخواهد داشت.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        16) متقاضی مسئول جبران خسارت وارده به دارندگان گواهی‌های شراکت به واسطه قصور، یا تقصیر یا
        عدم رعایت قوانین و مقررات می‌باشد. در این صورت متقاضی متعهد است کلیه مبالغ پیش‌بینی شده در
        بند مربوط به روال اتمام قرارداد را اعم از اصل، متفرعات و جریمه را پرداخت نماید. در این صورت
        ادامه یا خاتمه قرارداد با تصمیم عامل انجام می‌پذیرد و برای متقاضی لازم الاجراست.
      </p>
      <p className="text-justify leading-relaxed text-[23px]">
        17) متقاضی موظف است کلیه تعهدات خود در رابطه با این قرارداد را با رعایت صرفه و صلاح عامل و
        دارندگان گواهی‌های شراکت به انجام برساند و با رعایت امانت نسبت به هزینه کرد وجوه جمع‌آوری
        شده اقدام نماید. در غیر این صورت، متقاضی مسئول کلیه خساراتی است که از این طریق به عامل و
        دارندگان گواهی‌های شراکت وارد می‌شود.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        18) متقاضی متعهد است در نگهداری اموال و دارایی‌های موضوع طرح به نحو متعارف بکوشد. در غیر این
        صورت، متقاضی، ضامن خسارات وارده می‌باشد.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        19) متقاضی متعهد است در چارچوب قوانین کشور نسبت به پرداخت کلیه هزینه‌های بیمه اعم از بیمه
        مربوط به دارایی‌های طرح و ....، مالیات، عوارض و... رأسا اقدام نماید و دریافت مفاصا حساب‌های
        مالیاتی، بیمه، عوارض و .. ناشی از انجام این قرارداد بر عهده متقاضی است.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        20) متقاضی متعهد است تا نسبت به تهیه و ارائه گزارش‌های دوره‌ای سه ماهه اجرای طرح از تاریخ
        موفقیت کمپین با مهلت ارائه گزارش حداکثر 10 روز پس از تاریخ‌های درخواستی عامل اقدام نماید.
      </p>

      <p className="text-justify leading-relaxed text-[23px]">
        21) متقاضی متعهد است نسبت به ارائه صورت‌های مالی حسابرسی شده/نشده شش ماهه طرح موضوع قرارداد
        از تاریخ موفقیت کمپین با مهلت ارائه صورت‌های مالی حداکثر 20 روز پس از تاریخ‌های اعلام شده
        توسط عامل اقدام نماید.
      </p>
      <p className="text-justify leading-relaxed text-[23px]">
        22) متقاضی متعهد است نسبت به ارائه صورت‌های مالی حسابرسی شده سالیانه طرح موضوع قرارداد و پس
        از پایان طرح، از تاریخ موفقیت کمپین با مهلت ارائه صورت‌های مالی حسابرسی شده حداکثر 30 روز پس
        از تاریخ‌های اعلام شده توسط عامل اقدام نماید.
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
