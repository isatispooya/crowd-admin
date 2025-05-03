import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PrintableContractLayout from 'src/layouts/dashboard/printableLayourtContract';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import useAgencyContract from '../hooks/useAgencyContract';
import { PAGES } from '../feature/warTreaty';
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

const WarTreaty = () => {
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
    if (!agencyContract || !agencyContract.company_members) return null;

    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    const staticUsers = [
      { person_title: 'محسن زارعیان', position_title: 'مدیر عامل' },
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'رئیس هیئت مدیره' },
    ];

    const guarantors = agencyContract.guarantor || [];

    return (
      <div className="absolute bottom-0 left-0 right-0 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tr>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>عامل</div>
            </td>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>متقاضی</div>
            </td>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>ضامن حقیقی</div>
            </td>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>ضامن حقوقی</div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {staticUsers.map((user, index) => (
                  <div
                    key={`static-signatory-${index}`}
                    className="text-center flex-1 min-w-[200px]"
                  >
                    <p className="font-bold mb-1 text-sm md:text-base">{user.person_title}</p>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">{user.position_title}</p>
                    <div className="border border-gray-300 rounded h-16 w-full mb-1">
                      <p className="text-gray-400 text-xs md:text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                        محل امضاء
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {signatoryMembers.map((member, index) => (
                  <div
                    key={`dynamic-signatory-${index}`}
                    className="text-center flex-1 min-w-[200px]"
                  >
                    <p className="font-bold mb-1 text-sm md:text-base">{member.person_title}</p>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">{member.position_title}</p>
                    <div className="border border-gray-300 rounded h-16 w-full mb-1">
                      <p className="text-gray-400 text-xs md:text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                        محل امضاء
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {guarantors
                  .filter((g) => g.company_agent === null)
                  .flatMap((guarantor, guarantorIndex) =>
                    guarantor.members.map((member, index) => (
                      <div
                        key={`physical-guarantor-${guarantorIndex}-${index}`}
                        className="text-center flex-1 min-w-[200px]"
                      >
                        <p className="font-bold mb-1 text-sm md:text-base">
                          {member.guarantor_name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mb-2">حقیقی</p>
                        <div className="border border-gray-300 rounded h-16 w-full mb-1">
                          <p className="text-gray-400 text-xs md:text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                            محل امضاء
                          </p>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </td>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {guarantors
                  .filter((g) => g.company_agent !== null)
                  .flatMap((guarantor, guarantorIndex) =>
                    guarantor.members.map((member, index) => (
                      <div
                        key={`legal-guarantor-${guarantorIndex}-${index}`}
                        className="text-center flex-1 min-w-[200px]"
                      >
                        <p className="font-bold mb-1 text-sm md:text-base">
                          {member.guarantor_name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mb-2">
                          {member.position_title} (حقوقی)
                        </p>
                        <div className="border border-gray-300 rounded h-16 w-full mb-1">
                          <p className="text-gray-400 text-xs md:text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                            محل امضاء
                          </p>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </td>
          </tr>
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
                <PageComponent agencyContract={agencyContract} />
              </motion.div>
            </PrintableContractLayout>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarTreaty;
