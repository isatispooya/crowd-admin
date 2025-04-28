import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PrintableContractLayout from 'src/layouts/dashboard/printableLayourtContract';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import useAgencyContract from '../hooks/useAgencyContract';
import { PAGES } from '../feature/ExecutiveContract';
import 'react-toastify/dist/ReactToastify.css';

const printStyles = `
  @media print {
    .page-break-before {
      page-break-before: always;
    }
    
    @page {
      size: A4;
      margin: 0.5cm;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

const ExecutiveContract = () => {
  const { uuid } = useParams();
  const [finalUuid, setFinalUuid] = useState('');
  const pageRefs = useRef([]);

  useEffect(() => {
    if (uuid && uuid !== 'undefined') {
      setFinalUuid(uuid);
    }
    pageRefs.current = Array(PAGES.length)
      .fill()
      .map(() => React.createRef());
  }, [uuid]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

  const renderFooterSignatures = () => {
    if (!agencyContract) return null;

    const signatoryMembers =
      agencyContract.company_members?.filter((member) => member.signature === true) || [];

    const staticUsers = [
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'مدیر عامل' },
      { person_title: 'محسن زارعیان', position_title: 'رئیس هیئت مدیره' },
    ];

    const guarantors = agencyContract.guarantor || [];

    return (
      <div className="absolute bottom-0 left-0 right-0 overflow-x-auto">
        <table className="w-full border-collapse text-[8px] sm:text-[10px]">
          <thead>
            <tr>
              <th className="border border-gray-300 p-0.5 text-center font-bold">عامل</th>
              <th className="border border-gray-300 p-0.5 text-center font-bold">متقاضی</th>
              <th className="border border-gray-300 p-0.5 text-center font-bold">ضامنین</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* عامل */}
              <td className="border border-gray-300 p-0.5 rounded-lg">
                <div className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
                  {staticUsers.map((user, index) => (
                    <div
                      key={`static-signatory-${index}`}
                      className="text-center min-w-[60px] sm:min-w-[80px] max-w-[150px] flex-1"
                    >
                      <p className="font-bold mb-0.5 text-[8px] sm:text-[10px] leading-tight">
                        {user.person_title}
                      </p>
                      <p className="text-[8px] sm:text-[10px] text-gray-600 mb-0.5 leading-tight">
                        {user.position_title}
                      </p>
                      <div className="border border-gray-300 rounded h-6 sm:h-8 w-full">
                        <p className="text-gray-400 text-[8px] sm:text-[10px] pt-1.5 sm:pt-2 border-dotted border-t border-gray-300 w-full leading-tight">
                          محل امضاء
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>

              {/* متقاضی */}
              <td className="border border-gray-300 p-0.5 rounded-lg">
                <div className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
                  {signatoryMembers.map((member, index) => (
                    <div
                      key={`dynamic-signatory-${index}`}
                      className="text-center min-w-[60px] sm:min-w-[80px] max-w-[150px] flex-1"
                    >
                      <p className="font-bold mb-0.5 text-[8px] sm:text-[10px] leading-tight">
                        {member.person_title}
                      </p>
                      <p className="text-[8px] sm:text-[10px] text-gray-600 mb-0.5 leading-tight">
                        {member.position_title}
                      </p>
                      <div className="border border-gray-300 rounded h-6 sm:h-8 w-full">
                        <p className="text-gray-400 text-[8px] sm:text-[10px] pt-1.5 sm:pt-2 border-dotted border-t border-gray-300 w-full leading-tight">
                          محل امضاء
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>

              {/* ضامنین */}
              <td className="border border-gray-300 p-0.5 rounded-lg">
                <div className="flex flex-row gap-0.5 sm:gap-1 justify-start overflow-x-auto">
                  {guarantors.map((guarantor, index) => (
                    <div
                      key={`guarantor-${index}`}
                      className="text-center min-w-[60px] sm:min-w-[80px] max-w-[150px] flex-shrink-0"
                    >
                      {guarantor.members?.map((member, memberIndex) => (
                        <div key={`guarantor-member-${memberIndex}`}>
                          <p className="font-bold mb-0.5 text-[8px] sm:text-[10px] leading-tight">
                            {member.guarantor_name}
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-gray-600 mb-0.5 leading-tight">
                            ضامن
                          </p>
                          <div className="border border-gray-300 rounded h-6 sm:h-8 w-full">
                            <p className="text-gray-400 text-[8px] sm:text-[10px] pt-1.5 sm:pt-2 border-dotted border-t border-gray-300 w-full leading-tight">
                              محل امضاء
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handleGeneratePDF = async () => {
    try {
      toast.info('شروع تولید PDF');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;

      const pages = await Promise.all(
        pageRefs.current.map(async (ref, i) => {
          const page = ref.current;
          if (!page) return null;

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: page.scrollWidth * 1.2,
            windowHeight: page.scrollHeight * 1.2,
          });

          return { canvas, index: i };
        })
      );

      pages.forEach((item) => {
        if (!item) return;
        const { canvas, index } = item;

        if (index > 0) {
          pdf.addPage('a4', 'portrait');
        }

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pageHeight = (canvas.height * pageWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        toast.info(`صفحه ${index + 1} اضافه شد`);
      });

      pdf.save('contract.pdf');
      toast.success('PDF با موفقیت تولید شد');
    } catch (error) {
      toast.error(`خطا در تولید PDF: ${error.message}`);
    }
  };

  return (
    <div>
      <style>{printStyles}</style>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto flex justify-center items-center w-80 mb-8"
        type="button"
        onClick={handleGeneratePDF}
      >
        دانلود قرارداد کامل
      </button>

      <div>
        {PAGES.map((PageComponent, index) => (
          <div
            key={`page-${index}`}
            ref={pageRefs.current[index]}
            className="mb-8 bg-white"
            style={{ breakInside: 'avoid', pageBreakAfter: 'always' }}
          >
            <PrintableContractLayout footerChildren={renderFooterSignatures()}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-sm text-sm border border-gray-100"
              >
                <PageComponent data={agencyContract} />
              </motion.div>
            </PrintableContractLayout>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveContract;
