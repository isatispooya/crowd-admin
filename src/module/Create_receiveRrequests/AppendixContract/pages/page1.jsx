import moment from 'jalali-moment';
import { OnRun } from 'src/api/OnRun';
import crowdlogo from './crowdlogo.png';

const Page1 = ({ agencyContract }) => {
  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {'  '}1{agencyContract.investor_request?.contract_number || ''}
              <br />
              تاریخ: {'  '}
              {agencyContract.investor_request?.agency_agreement_date
                ? moment(agencyContract.investor_request.agency_agreement_date).format(
                    'jYYYY/jMM/jDD'
                  )
                : ''}
            </div>

            <img src={crowdlogo} alt="company Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">
                الحاقیه قرارداد عاملیت {agencyContract.company?.title} (
                {agencyContract.company?.registration_type_title || ''})
              </h3>
            </div>

            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-32 mt-4"
            />
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="contract-content">
      {renderHeaderContent()}

      <div className="contract-section">
        <h2 className="section-title">مقدمه</h2>
        <p className="section-text">
          استعانت از خداوند متعال، در تاریخ (((((فردای قرارداد عاملیت )))) الحاقیه قرارداد لازم حاضر
          وفق مواد 10 و 190 و 219 قانون مدنی به همراه دیگر اسناد و مدارک منضم به پیوست قرارداد
          عاملیت به شماره ********** می باشد در شهر یزد منعقد می‌گردد و طرفین اظهار و اعلام
          می‌نمایند که هیچ‌گونه محدودیت یا ممنوعیتی جهت امضای این قرارداد نداشته و دارای صلاحیت لازم
          و کمال صحت عقل و اراده شخصی جهت امضای قرارداد هستند و از تاریخ انعقاد، طرفین ملزم و متعهد
          به اجرای مفاد آن می‌باشند.
        </p>
      </div>

      <div className="contract-section">
        <h2 className="section-title">ماده 1) مشخصات طرفین قرارداد</h2>
        <h3 className="subsection-title">1-1. این قرارداد میان:</h3>

        <div className="party-details">
          <h4 className="party-title">1) طرف اول:</h4>
          <p className="party-text">
            شرکت *************** یزد (سهامی خاص) به شمارۀ شناسۀ ملی 14014205223، کد اقتصادی
            14014205223، و شماره ثبت 24904 نزد اداره ثبت شركت ها و موسسات غيرتجاري يزد، استان يزد،
            شهرستان يزد، بخش مركزي، شهر يزد، صفاييه، خيابان پژوهش، خيابان 10دانشگاه[بهار]، پلاك 0،
            ساختمان مجتمع مسكوني رزلند(ROSE LAND)، بلوك A، طبقه 4، واحد 403، کدپستی 8915834258،
            شماره تماس 38255950-035
          </p>
          <p className="party-text">
            به استناد آگهی روزنامه رسمی به شماره 23274 شهرستان مورخ 29/11/1403 نمایندگان مجاز و صاحب
            امضا طرف اول قرارداد در خصوص امضا و استکتاب اسناد تعهد آور طرف اول اشخاص ذیل می‌باشند:
          </p>
          <p className="party-text">
            الف) نمایندگان طرف نخست: صاحب امضای مجاز به سمت مدیر عامل و رئیس هیئت مدیره، آقای مجید
            حاجی زاده به شماره شناسنامه 4420356960 شماره ملی 4420356960 شماره تماس 09139689206 می
            باشد.
          </p>
        </div>

        <div className="party-details">
          <h4 className="party-title">2) طرف دوم:</h4>
          <p className="party-text">
            شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی
            411615733645، و شماره ثبت 13702، در اداره ثبت شرکت ها و موسسات تجاری استان هرمزگان، به
            نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4 واحد 44 شماره تلفن 076-44480555 و کدپستی
            7941757334
          </p>
          <p className="party-text">
            و با نمایندگی آقای سید علی محمد خبیری به شماره ملی 4431535474 به سمت عضو هیئت مدیره و
            آقای محسن زارعیان به شماره ملی 4431855416 به سمت مدیرعامل، صاحبان امضای مجاز بر اساس
            روزنامه رسمی شماره22670، مورخ 24/10/1401 که از این پس و در این قرارداد، «عامل» نامیده می
            شود.
          </p>
        </div>
      </div>

      <div className="contract-section">
        <h2 className="section-title">ماده 2) موضوع الحاقیه</h2>
        <p className="section-text">
          2-1 موضوع این‌ الحاقیه عبارت است‌ از: مازاد کارمزد ارائه خدمات تامین مالی موضوع ماده 4
          قرارداد عاملیت به شماره ************ مورخ ******
        </p>
      </div>

      <div className="contract-section">
        <h2 className="section-title">ماده 3) کارمزد موضوع قرارداد</h2>
        <p className="section-text">
          1-3. كارمزد ارائه خدمات بازاريابي، بازارسازی، ایجاد کمپین های تبلغیاتی جهت فروش اوراق شرکت
          به سرمایه گذاران و هزینه های کارشناسی و اموراجرایی تامین مالی به متقاضي، جمعا به مبلغ
          ****** ميليون ريال مي باشد كه پس از موفقيت در جمع آوری وجوه به حساب عامل به صورت نقدی یا
          مطابق تبصره 2 ماده 4 قرارداد عاملیت به شماره ********، پرداخت می نماید.
        </p>
      </div>

      <div className="contract-section">
        <h2 className="section-title">ماده 4) سایر شرایط</h2>
        <p className="section-text">
          متقاضی با امضای این الحاقیه ضمن اسقاط کافه خیارات و خیار غبن ولو افحش هر درجه بالا رود را
          از خود سلب وساقط نمود
        </p>
      </div>

      <div className="contract-section">
        <h2 className="section-title">ماده 5) اعتبار قرارداد</h2>
        <p className="section-text">
          این الحاقیه در 5 ماده، در دو نسخه واحد و بدون پیوست، تنظیم گردید که پس از امضاء کلیه نسخ
          آن در حكم واحد بوده و لاازم الاجرا می باشند.
        </p>
      </div>
    </div>
  );
};

export default Page1;
