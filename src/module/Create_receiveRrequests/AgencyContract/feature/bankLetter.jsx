import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import PrintableLayout from 'src/layouts/dashboard/printableLayout';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import useBankLetter from '../hooks/useBankLetter';
import Sign from '../../../../../public/img/signContract.png';

const BankLetter = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    if (urlUuid && urlUuid !== 'undefined') {
      setFinalUuid(urlUuid);
    }
  }, [urlUuid]);

  const {
    data: bankLetter,
    isLoading,
    refetch,
  } = useBankLetter(finalUuid !== 'undefined' ? finalUuid : null);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined' && bankLetter) {
      setQrValue('https://app.isatiscrowd.ir/bankLetter');
    }
  }, [finalUuid, bankLetter]);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  const agencyAgreementDate = bankLetter?.agency_agreement_date
    ? ` ${moment(bankLetter.agency_agreement_date).format('YYYY/MM/DD')} `
    : ' ';

  if (isLoading) {
    return <CircularProgress />;
  }

  const headerInfo = [
    {
      label: 'تاریخ',
      value: agencyAgreementDate,
    },
    { label: 'شماره', value: bankLetter?.bank_letter_number },
    { label: 'پیوست', value: 'ندارد' },
  ];

  const title = `ریاست محترم ${bankLetter?.bank}  شعبه ${bankLetter?.bank_branch} (کد شعبه ${bankLetter?.bank_branch_code})`;
  const subtitle = `موضوع: اخذ مجوز صدور ضمانت نامه تعهد پرداخت برای شرکت ${bankLetter?.company_name}`;

  const qrCodeComponent = (
    <motion.div
      whileHover={{ rotate: 5, scale: 1.05 }}
      className="w-32 h-32 border border-gray-300 flex justify-center items-center rounded-lg bg-white shadow-sm p-2"
    >
      <div className="text-center">
        <div className="mx-auto bg-white rounded-md flex items-center justify-center">
          <QRCode value={qrValue} size={90} level="H" fgColor="#4B0082" bgColor="#FFFFFF" />
        </div>
      </div>
    </motion.div>
  );

  const footerText = (
    <>
      <p>
        {bankLetter?.footer_text ||
          'این نامه بدون مهر برجسته بانک و امضای مسئولین ذیربط فاقد اعتبار می‌باشد.'}
      </p>
      <p className="mt-1">
        {bankLetter?.verification_text || 'برای تایید اصالت این نامه، QR کد را اسکن نمایید.'}
      </p>
      {finalUuid && <p className="mt-1 text-xs text-gray-400">شناسه یکتا: {finalUuid}</p>}
    </>
  );

  return (
    <PrintableLayout
      title={title}
      subtitle={subtitle}
      headerInfo={headerInfo}
      printButtonText="دانلود و پرینت نامه بانکی"
      footerText={footerText}
      signatureImage={bankLetter?.signature_image || Sign}
      qrCodeComponent={qrCodeComponent}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm border border-gray-100"
      >
        <p className="text-gray-800 leading-relaxed text-right text-justify" dir="rtl">
          با سلام و مراتب احترام، به استحضار میرساند با توجه به درخواست شرکت{' '}
          {bankLetter?.company_name}({bankLetter?.registration_type_title}) به شناسه ملی{' '}
          {bankLetter?.company_national_id} مبنی بر تأمین مالی آن شرکت محترم به مبلغ{' '}
          {formatNumber((bankLetter?.amount_of_investment ?? 0) / 1000000)} میلیون ریال از طریق
          انتشار و فروش گواهی های شراکت تأمین مالی جمعی، مطابق قرارداد عاملیت به شماره 1
          {bankLetter?.contract_number} مورخ {agencyAgreementDate} و قرارداد اجرایی به شماره 2
          {bankLetter?.contract_number} آن شرکت متعهد به ارائه یک فقره ضمانتنامه تعهد پرداخت بانکی
          برابر اصل مبلغ تامین مالی به مبلغ{' '}
          {formatNumber((bankLetter?.amount_of_investment ?? 0) / 1000000)}
          میلیون ریال با اعتبار 12 ماهه و با قابلیت تمدید به درخواست ذینفع و با قابلیت دریافت مبلغ
          ضمانت نامه به صورت عندالمطالبه (به محض تقاضای ذینفع) و به دفعات میباشد. موضوع ضمانت صورت
          عندالمطالبه (به محض تقاضای ذینفع) و به دفعات میباشد. موضوع ضمانت نامه بابت تضمین پرداخت
          دیونی که ضمانت خواه به موجب قرارداد مذکور بر عهده می گیرد، می باشد، لذا خواهشمند است مراتب
          مورد بررسی قرار گرفته و جهت صدور ضمانت نامه تعهد پرداخت به ذینفعی شرکت سبدگردان ایساتیس
          پویا کیش به شماره ثبت 13702 شناسه ملی 14007805556 و کد اقتصادی 411615733645 و به نشانی یزد
          - بلوار جمهوری اسلامی، کوچه شرق، ساختمان بورس، نیم طبقه و کد پستی 8917957914 اقدام
          فرمایید.( شماره شبای متعلق به شرکتسبد گردان ایساتیس پویا کیش نزد بانک پاسارگاد شعبه بلوار
          جمهوری یزد IR470570300211515884588001)
        </p>
      </motion.div>
    </PrintableLayout>
  );
};

export default BankLetter;
