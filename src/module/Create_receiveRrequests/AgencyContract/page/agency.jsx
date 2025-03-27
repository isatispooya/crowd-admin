import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PrintableContractLayout from 'src/layouts/dashboard/printableLayourtContract';
import generatePDF from 'react-to-pdf';

import useAgencyContract from '../hooks/useAgencyContract';
import { PAGES } from '../feature/agancyContract';


const Agency = () => {
  const { uuid } = useParams();
  const [finalUuid, setFinalUuid] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [printMode] = useState(false);
  const targetRef = useRef();

  useEffect(() => {
    if (uuid && uuid !== 'undefined') {
      setFinalUuid(uuid);
    }
  }, [uuid]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

  const renderFooterSignatures = () => {
    if (!agencyContract || !agencyContract.company_members) return null;

    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    const staticUsers = [
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'مدیر عامل' },
      { person_title: 'محسن زارعیان', position_title: 'رئیس هیئت مدیره' },
    ];

    const allSignatories = [...staticUsers];

    if (signatoryMembers.length > 0) {
      signatoryMembers.forEach((member) => {
        const isDuplicate = staticUsers.some((user) => user.person_title === member.person_title);

        if (!isDuplicate) {
          allSignatories.push({
            person_title: member.person_title,
            position_title: member.position_title,
          });
        }
      });
    }
    return (
      <div className="mt-auto">
        <div className="flex justify-between gap-1">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-300 rounded p-1 w-full">
                <div className="text-center">
                  <p className="font-bold text-[23px]">{user.person_title}</p>
                  <p className="text-[20px] text-gray-600">{user.position_title}</p>
                </div>
                <div className="pt-5  pb-5 border-dashed border border-gray-300 rounded flex items-center justify-center mt-1">
                  <p className="text-gray-400 text-[20px]">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // const handlePageChange = (pageNumber) => {
  //   if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  // const renderCurrentPage = () => {
  //   if (!agencyContract) return null;

  //   const CurrentPageComponent = PAGES[currentPage - 1];
  //   return <CurrentPageComponent agencyContract={agencyContract} />;
  // };
  const options = {
    filename: 'my-file.pdf',
    page: {
      format: 'A4', 
      orientation: 'portrait',
        margin: 0,
    },
  };

  return (
    <div>
      <button type="button" onClick={() => generatePDF(targetRef, options)}>
        چاپ
      </button>
      <div className="contract-container" ref={targetRef}>
        {/* <style>{printStyles}</style> */}

        {PAGES.map((PageComponent, index) => (
          <div key={`page-${index}`} className="mb-8">
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

export default Agency;
